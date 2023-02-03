import os
from flask import Flask, redirect, request
from flask_cors import cross_origin
import stripe

stripe.api_key = 'sk_test_51MWG4bSIlus8ySuKQKbDh3nGdHjtqaW5zylFXa1fy8Y3jp2L86JBuzBJJTAprVBedgd0Z5IXzBIgOEVfyQCljDGK00lgq89Mje'

app = Flask(__name__,
            static_url_path='',
            static_folder='public')
app.config["DEBUG"] = True

# app = Flask(__name__)
YOUR_DOMAIN = 'http://localhost:4242'
@app.route('/create-checkout-session', methods=['POST'])
@cross_origin()
def create_checkout_session():
    items=request.json['items']
    transformed_items = [{    
    # "description": item["description"],
    'price_data': {
        'currency': 'inr',
        'product_data': {
            'name': item["title"],
            },
        'unit_amount': int(item["price"]) * 100,
    },
    'quantity': item["qty"],
    } for item in items]
    try:
        checkout_session = stripe.checkout.Session.create(
        line_items=transformed_items,
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)
    # print(checkout_session)
    return (checkout_session)

if __name__ == '__main__':
    app.run(port=4242)