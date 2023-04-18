import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  addDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await addDoc(collection(firestore, "foodItems"), data);
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("Item_id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getNeutralFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"),  where("Mood", "==", "Neutral"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getHappyFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"),  where("Mood", "==", "Happy"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getSadFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"),  where("Mood", "==", "Sad"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getSusFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"),  where("Mood", "==", "Sus"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getPopularFoodItems = async (name) => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"),  where("Item_name", "==", name))
  );

  return items.docs.map((doc) => doc.data());
};
export const getOrders = async (user) => {
  const items = await getDocs(
    query(collection(firestore, "orders"), where("email", "==", user),orderBy("order_status.timestamp", "desc") )
  );

  return items.docs.map((doc) => doc.data());
};
