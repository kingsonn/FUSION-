from flask import Flask, redirect, request, jsonify
from flask_cors import cross_origin
import stripe
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pickle
import numpy as np
import cv2
from keras.models import load_model

stripe.api_key = 'sk_test_51MWG4bSIlus8ySuKQKbDh3nGdHjtqaW5zylFXa1fy8Y3jp2L86JBuzBJJTAprVBedgd0Z5IXzBIgOEVfyQCljDGK00lgq89Mje'
popular_df= pickle.load(open('server\popular.pkl','rb'))
pt= pickle.load(open('server\pt.pkl','rb'))
similarity_scores= pickle.load(open('server\similarity_scores.pkl','rb'))
items= pickle.load(open('server\items.pkl','rb'))
cf= pickle.load(open('server\cf.pkl','rb'))
similarity= pickle.load(open('server\similarity.pkl','rb'))
app = Flask(__name__)
app.config["DEBUG"] = True
endpoint_secret = 'whsec_BK84hvaiziq2x7l7IqaLStkppcGYsV3z'
cred = credentials.Certificate("C://Users//hanso//Projects//FUSION-//server//canteen.json")
fstore = firebase_admin.initialize_app(cred)
db = firestore.client()

# app = Flask(__name__)
YOUR_DOMAIN = 'http://quickteen-v1.vercel.app'
@app.route('/create-checkout-session', methods=['POST'])
@cross_origin()
def create_checkout_session():
    items=request.json['items']
    user= request.json['email']
    time= request.json['time']
    d = {
    u'email': user,
    u'items': items,
    u'time': time,
    u'timestamp': firestore.SERVER_TIMESTAMP,

}
    update_time, temp_ref = db.collection(u'temp').add(d)
    print(f'Added document with id {temp_ref.id}')
    transformed_items = [{    
    'price_data': {
        'currency': 'inr',
        'product_data': {
            'name': item["Item_name"],
            },
        'unit_amount': int(item["Price"]) * 100,
    },
    'quantity': item["qty"],
    } for item in items]
    try:
        checkout_session = stripe.checkout.Session.create(
        line_items=transformed_items,
            mode='payment',
            success_url=YOUR_DOMAIN + '/success',
            cancel_url=YOUR_DOMAIN + '/',
        metadata={
        "id": temp_ref.id,
    }
        )
    except Exception as e:
        return str(e)

    return (checkout_session)

@app.route('/webhook', methods=['POST'])
def webhook():

    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        raise e
    except stripe.error.SignatureVerificationError as e:
        raise e

    # Handle the event
    if event['type'] == 'checkout.session.completed':
      session = event['data']['object']
    #   print(session)
      doc_ref = db.collection(u'temp').document(session.metadata.id)
      doc = doc_ref.get()
      order_status={
        u'status': u'Order Placed',
        u'timestamp': firestore.SERVER_TIMESTAMP,
      }
      data={
        u'email': doc.to_dict()['email'],
        u'items': doc.to_dict()['items'],
        u'time': doc.to_dict()['time'],
        u'order_status': order_status,
        u'order_ID': session.id,
        u'total': session.amount_subtotal,
      }
      db.collection(u'orders').add(data)

    else:
      print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)


@app.route('/getpopular', methods=['POST'])
@cross_origin()
def get_popular():
    return list(popular_df['Item_name'].values)



def recommend(Items):
    # index fetch
    index = np.where(pt.index==Items)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:6]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = items[items['Items'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Items')['Items'].values))

        
        data.append(item[0])
    
    return data

def recommend1(food):
    l=[]
    index = cf[cf['Item_name'] == food].index[0]
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    for i in distances[1:6]:
        l.append(cf.iloc[i[0]].Item_name)
        
    return l
   
def hybrid(item):
    a=recommend1(item)
    b=list(map(recommend,a))
    return b

@app.route('/recommend', methods=['POST'])
@cross_origin()
def get_recommendations():
    data=request.json['yo']
    print(data)
    return list(np.unique(list(np.unique(hybrid(data)))+list(recommend1(data))))


@app.route('/after', methods=['GET', 'POST'])
def after():
    img = request.files['file1']

    img.save('static/file.jpg')

    ####################################
    img1 = cv2.imread('static/file.jpg')
    gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt2.xml')
    faces = cascade.detectMultiScale(gray, 1.1, 3)

    for x,y,w,h in faces:
        cv2.rectangle(img1, (x,y), (x+w, y+h), (0,255,0), 2)

        cropped = img1[y:y+h, x:x+w]

    cv2.imwrite('static/after.jpg', img1)

    try:
        cv2.imwrite('static/cropped.jpg', cropped)

    except:
        pass

    #####################################

    try:
        image = cv2.imread('static/cropped.jpg', 0)
    except:
        image = cv2.imread('static/file.jpg', 0)

    image = cv2.resize(image, (48,48))

    image = image/255.0

    image = np.reshape(image, (1,48,48,1))

    model = load_model('model_3.h5')

    prediction = model.predict(image)

    label_map =   ['Anger','Neutral' , 'Fear', 'Happy', 'Sad', 'Surprise']

    prediction = np.argmax(prediction)

    final_prediction = label_map[prediction]

    return final_prediction

if __name__ == '__main__':
    app.run(port=4242)