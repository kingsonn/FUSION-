import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = [
          {
            "Item_id": 1,
            "Item_name": "Cheese Grill Sandwich",
            "Description": "A grilled sandwich with cheese filling",
            "Category": "Sandwiches",
            "Meal Type": "Appetizer ",
            "Main ingredients ": "Bread, cheese slices, butter, vegetables (optional)",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674842094964-%E2%80%94Pngtree%E2%80%94sandwich%20nutrition%20sandwich_6241054.png?alt=media&token=c913136f-9022-48ef-87ca-cf4dbf4ebf03"
          },
          {
            "Item_id": 2,
            "Item_name": "Cheese Sandwich",
            "Description": "A sandwich with cheese filling",
            "Category": "Sandwiches",
            "Meal Type": "Appetizer ",
            "Main ingredients ": "Bread, cheese slices, butter",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674842094964-%E2%80%94Pngtree%E2%80%94sandwich%20nutrition%20sandwich_6241054.png?alt=media&token=c913136f-9022-48ef-87ca-cf4dbf4ebf04"
          },
          {
            "Item_id": 3,
            "Item_name": "Veg Grill Sandwich ",
            "Description": "A grilled sandwich with vegetable and cheese filling",
            "Category": "Sandwiches",
            "Meal Type": "Appetizer ",
            "Main ingredients ": "Bread, cheese slices, butter, mixed vegetables",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674842094964-%E2%80%94Pngtree%E2%80%94sandwich%20nutrition%20sandwich_6241054.png?alt=media&token=c913136f-9022-48ef-87ca-cf4dbf4ebf05"
          },
          {
            "Item_id": 4,
            "Item_name": "Vegetable Sandwich",
            "Description": "A sandwich with vegetable filling",
            "Category": "Sandwiches",
            "Meal Type": "Appetizer ",
            "Main ingredients ": "Bread, butter, mixed vegetables",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674842094964-%E2%80%94Pngtree%E2%80%94sandwich%20nutrition%20sandwich_6241054.png?alt=media&token=c913136f-9022-48ef-87ca-cf4dbf4ebf06"
          },
          {
            "Item_id": 5,
            "Item_name": "Toast Butter Jam",
            "Description": "Toasted bread with butter and jam spread",
            "Category": "Sandwiches",
            "Meal Type": "Appetizer ",
            "Main ingredients ": "Bread, butter, jam",
            "Availability": "Available",
            "Price": 31,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674842094964-%E2%80%94Pngtree%E2%80%94sandwich%20nutrition%20sandwich_6241054.png?alt=media&token=c913136f-9022-48ef-87ca-cf4dbf4ebf07"
          },
          {
            "Item_id": 6,
            "Item_name": "Bread Butter Jam",
            "Description": "Bread with butter and jam spread",
            "Category": "Sandwiches",
            "Meal Type": "Appetizer ",
            "Main ingredients ": "Bread, butter, jam",
            "Availability": "Available",
            "Price": 31,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674842094964-%E2%80%94Pngtree%E2%80%94sandwich%20nutrition%20sandwich_6241054.png?alt=media&token=c913136f-9022-48ef-87ca-cf4dbf4ebf08"
          },
          {
            "Item_id": 7,
            "Item_name": "Veg & Cheese grill Sandwich",
            "Description": "A grilled sandwich with vegetable and cheese filling",
            "Category": "Sandwiches",
            "Meal Type": "Appetizer ",
            "Main ingredients ": "Bread, cheese slices, butter, mixed vegetables",
            "Availability": "Available",
            "Price": 51,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674842094964-%E2%80%94Pngtree%E2%80%94sandwich%20nutrition%20sandwich_6241054.png?alt=media&token=c913136f-9022-48ef-87ca-cf4dbf4ebf09"
          },
          {
            "Item_id": 8,
            "Item_name": "Poha ",
            "Description": "A popular Indian breakfast dish made of flattened rice flakes",
            "Category": "All Day Snacks",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Flattened rice, onion, potato, peanuts, curry leaves, mustard seeds",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 9,
            "Item_name": "Upma",
            "Description": "A South Indian breakfast dish made of semolina",
            "Category": "All Day Snacks",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Semolina, onion, ginger, green chilies, mustard seeds, curry leaves",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 10,
            "Item_name": "Wada Pav",
            "Description": "A popular Indian fast food dish consisting of a deep-fried potato dumpling (wada) served inside a bread roll (pav)",
            "Category": "All Day Snacks",
            "Meal Type": "Small Eats",
            "Main ingredients ": "Potato, gram flour, bread roll, chutney",
            "Availability": "Available",
            "Price": 17,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 11,
            "Item_name": "Samosa Pav",
            "Description": "A popular Indian street food snack consisting of a deep-fried pastry filled with spiced potatoes, peas, and sometimes meat, served inside a bread roll (pav)",
            "Category": "All Day Snacks",
            "Meal Type": "Small Eats",
            "Main ingredients ": "Potato, peas, flour, bread roll, chutney",
            "Availability": "Available",
            "Price": 17,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 12,
            "Item_name": "Bread Pakoda",
            "Description": "A deep-fried Indian snack made of spiced bread slices coated in a chickpea flour batter",
            "Category": "All Day Snacks",
            "Meal Type": "Small Eats",
            "Main ingredients ": "Bread, chickpea flour, spices",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 13,
            "Item_name": "Misal Pav",
            "Description": "A spicy Maharashtrian breakfast dish made with sprouted moth beans and served with bread roll (pav)",
            "Category": "All Day Snacks",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Sprouted moth beans, onion, tomato, potato, spices",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 14,
            "Item_name": "Dahi Misal Pav",
            "Description": "A variation of misal pav with the addition of yogurt on top",
            "Category": "All Day Snacks",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Sprouted moth beans, yogurt, onion, tomato, potato, spices",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 15,
            "Item_name": "Plain Maggi",
            "Description": "A quick and easy Indian noodle dish made with Maggi noodles",
            "Category": "All Day Snacks",
            "Meal Type": "Small Eats",
            "Main ingredients ": "Maggi noodles, water, salt",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 16,
            "Item_name": "Cheese Maggi",
            "Description": "A variation of plain Maggi with the addition of cheese",
            "Category": "All Day Snacks",
            "Meal Type": "Small Eats",
            "Main ingredients ": "Maggi noodles, water, salt, cheese",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 17,
            "Item_name": "Pav Bhaji",
            "Description": "A popular Indian street food dish consisting of a spicy vegetable curry (bhaji) served with a bread roll (pav)",
            "Category": "All Day Snacks",
            "Meal Type": "Lunch",
            "Main ingredients ": "Mixed vegetables, spices, bread roll",
            "Availability": "Available",
            "Price": 51,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 18,
            "Item_name": "Chole Bature",
            "Description": "A North Indian breakfast dish made with spiced chickpeas (chole) served with deep-fried bread (bature)",
            "Category": "All Day Snacks",
            "Meal Type": "Lunch",
            "Main ingredients ": "Chickpeas, flour, spices, oil",
            "Availability": "Available",
            "Price": 51,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 19,
            "Item_name": "Fruit Platter",
            "Description": "A platter of assorted fresh fruits served as a healthy snack or dessert",
            "Category": "All Day Snacks",
            "Meal Type": "Small Eats",
            "Main ingredients ": "Assorted fresh fruits such as watermelon, mango, grapes, apple, banana",
            "Availability": "Available",
            "Price": 60,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94indian%20street%20food%20vada%20pav_8999992.png?alt=media&token=ca321aef-8d82-45ef-a007-12798402b52c"
          },
          {
            "Item_id": 20,
            "Item_name": "Idli Sambar",
            "Description": "Steamed rice cakes served with a lentil-based vegetable stew",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Idli (fermented rice and black gram batter), sambar (lentil-based vegetable stew with tamarind and spices)",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e351"
          },
          {
            "Item_id": 21,
            "Item_name": "Medhu Wada Sambar",
            "Description": "Deep-fried lentil doughnuts served with a lentil-based vegetable stew",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Medhu wada (deep-fried lentil doughnuts), sambar (lentil-based vegetable stew with tamarind and spices)",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e352"
          },
          {
            "Item_id": 22,
            "Item_name": "Sada Dosa",
            "Description": "Thin crispy pancake made from fermented rice and lentil batter served with coconut chutney",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Dosa (fermented rice and black gram batter), coconut chutney (made with grated coconut, green chilies, and coriander leaves)",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e353"
          },
          {
            "Item_id": 23,
            "Item_name": "Masala Dosa",
            "Description": "Sada dosa filled with spiced potato filling and served with coconut chutney and sambar",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Dosa (fermented rice and black gram batter), spiced potato filling (potatoes, onions, and spices), coconut chutney, sambar",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e354"
          },
          {
            "Item_id": 24,
            "Item_name": "Mysore Dosa",
            "Description": "Sada dosa coated with a spicy red chutney made from red chili, garlic, and spices served with chutney",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Dosa (fermented rice and black gram batter), Mysore chutney (spicy red chutney made from red chili, garlic, and spices)",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e355"
          },
          {
            "Item_id": 25,
            "Item_name": "Mysore Masala Dosa",
            "Description": "Masala dosa filled with spiced potato filling and coated with spicy Mysore chutney served with chutney",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Dosa (fermented rice and black gram batter), spiced potato filling (potatoes, onions, and spices), Mysore chutney, chutney",
            "Availability": "Available",
            "Price": 51,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e356"
          },
          {
            "Item_id": 26,
            "Item_name": "Schezwan Dosa",
            "Description": "Dosa filled with stir-fried vegetables in Schezwan sauce and served with chutney",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Dosa (fermented rice and black gram batter), stir-fried vegetables in Schezwan sauce, chutney",
            "Availability": "Available",
            "Price": 51,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e357"
          },
          {
            "Item_id": 27,
            "Item_name": "Cheese Dosa",
            "Description": "Dosa filled with grated cheese and served with tomato chutney",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Dosa (fermented rice and black gram batter), grated cheese, tomato chutney",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e358"
          },
          {
            "Item_id": 28,
            "Item_name": "Cheese Masala Dosa",
            "Description": "Masala dosa filled with grated cheese and served with tomato chutney",
            "Category": "South Indian",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Dosa (fermented rice and black gram batter), spiced potato filling (potatoes, onions, and spices), grated cheese, chutney",
            "Availability": "Available",
            "Price": 51,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F1674848758109-Powder-Dosa.png?alt=media&token=e59edbc9-ab13-44f6-8677-66553a97e359"
          },
          {
            "Item_id": 29,
            "Item_name": "Full Meal",
            "Description": "A complete meal consisting of multiple dishes",
            "Category": "Meals",
            "Meal Type": "Lunch",
            "Main ingredients ": "Rice, bread, vegetables, lentils, salads, pickles, chutneys, and desserts.",
            "Availability": "Available",
            "Price": 98,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94mussels_5614252.png?alt=media&token=4750c88e-fcd7-4a7e-a409-4e3ed01e76f0"
          },
          {
            "Item_id": 30,
            "Item_name": "Dal Khichdi",
            "Description": "A one-pot dish made with rice and lentils",
            "Category": "Meals",
            "Meal Type": "Lunch",
            "Main ingredients ": "Rice, lentils (usually moong dal), ghee or oil, cumin seeds, turmeric powder, salt, and water.",
            "Availability": "Available",
            "Price": 57,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94mussels_5614252.png?alt=media&token=4750c88e-fcd7-4a7e-a409-4e3ed01e76f1"
          },
          {
            "Item_id": 31,
            "Item_name": "Sabudana Khichdi",
            "Description": "A gluten-free dish made with tapioca pearls and potatoes",
            "Category": "Meals",
            "Meal Type": "Lunch",
            "Main ingredients ": "Sabudana (tapioca pearls), potatoes, peanuts, ghee or oil, cumin seeds, green chilies, curry leaves, lemon juice, salt, and sugar.",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94mussels_5614252.png?alt=media&token=4750c88e-fcd7-4a7e-a409-4e3ed01e76f2"
          },
          {
            "Item_id": 32,
            "Item_name": "Aloo Paratha",
            "Description": "A stuffed flatbread made with spiced potato filling",
            "Category": "Meals",
            "Meal Type": "Lunch",
            "Main ingredients ": "Wheat flour, potatoes, green chilies, cumin seeds, coriander leaves, ginger, ghee or oil, salt, and water.",
            "Availability": "Available",
            "Price": 48,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94mussels_5614252.png?alt=media&token=4750c88e-fcd7-4a7e-a409-4e3ed01e76f3"
          },
          {
            "Item_id": 33,
            "Item_name": "Paneer Paratha",
            "Description": "A stuffed flatbread made with spiced paneer filling",
            "Category": "Meals",
            "Meal Type": "Lunch",
            "Main ingredients ": "Wheat flour, paneer, green chilies, coriander leaves, ginger, ghee or oil, salt, and water. ",
            "Availability": "Available",
            "Price": 67,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2F%E2%80%94Pngtree%E2%80%94mussels_5614252.png?alt=media&token=4750c88e-fcd7-4a7e-a409-4e3ed01e76f4"
          },
          {
            "Item_id": 34,
            "Item_name": "Boiled Egg",
            "Description": "Hard-boiled egg dish",
            "Category": "Egg Counter",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Eggs, water",
            "Availability": "Available",
            "Price": 23,
            "Image": "https://purepng.com/public/uploads/large/purepng.com-eggfood-egg-half-cooking-eating-breakfast-fried-white-yolk-protein-boiled-941524618343dvhbf.png"
          },
          {
            "Item_id": 35,
            "Item_name": "Omlette Pav",
            "Description": "Indian-style omelette sandwich",
            "Category": "Egg Counter",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Eggs, onion, tomato, green chili, bread, butter",
            "Availability": "Available",
            "Price": 57,
            "Image": "https://purepng.com/public/uploads/large/purepng.com-eggfood-egg-half-cooking-eating-breakfast-fried-white-yolk-protein-boiled-941524618343dvhbf.png"
          },
          {
            "Item_id": 36,
            "Item_name": "Bhurji Pav",
            "Description": "Scrambled egg dish served with bread",
            "Category": "Egg Counter",
            "Meal Type": "Breakfast",
            "Main ingredients ": "Eggs, onion, tomato, green chili, bread, butter, spices (cumin, turmeric, red chili powder)",
            "Availability": "Available",
            "Price": 57,
            "Image": "https://purepng.com/public/uploads/large/purepng.com-eggfood-egg-half-cooking-eating-breakfast-fried-white-yolk-protein-boiled-941524618343dvhbf.png"
          },
          {
            "Item_id": 37,
            "Item_name": "Sev Puri",
            "Description": "A popular Indian street food snack",
            "Category": "Chaat Counter",
            "Meal Type": "Appetizer",
            "Main ingredients ": "Small crispy puris topped with boiled potatoes, onions, chutneys, sev (crispy chickpea flour noodles)",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://wowjohn.com/wp-content/uploads/2022/05/chaat-png-6-Transparent-Images-Free.png"
          },
          {
            "Item_id": 38,
            "Item_name": "Papdi Chaat",
            "Description": "A tangy and savory Indian snack made with flat crisp bread",
            "Category": "Chaat Counter",
            "Meal Type": "Appetizer",
            "Main ingredients ": "Crisp papdis, boiled potatoes, chickpeas, yogurt, tamarind chutney, green chutney, sev, chaat masala",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://wowjohn.com/wp-content/uploads/2022/05/chaat-png-6-Transparent-Images-Free.png"
          },
          {
            "Item_id": 39,
            "Item_name": "Samosa Chaat",
            "Description": "A delicious blend of samosas and chaat",
            "Category": "Chaat Counter",
            "Meal Type": "Appetizer",
            "Main ingredients ": "Samosas (deep-fried triangular pastry filled with spiced potatoes and peas), yogurt, chutneys, sev",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://wowjohn.com/wp-content/uploads/2022/05/chaat-png-6-Transparent-Images-Free.png"
          },
          {
            "Item_id": 40,
            "Item_name": "Kachori Chaat",
            "Description": "A spicy and crispy street food made with kachoris",
            "Category": "Chaat Counter",
            "Meal Type": "Appetizer",
            "Main ingredients ": "Kachoris (deep-fried spicy flattened pastry balls), boiled potatoes, chickpeas, yogurt, chutneys, sev",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://wowjohn.com/wp-content/uploads/2022/05/chaat-png-6-Transparent-Images-Free.png"
          },
          {
            "Item_id": 41,
            "Item_name": "Margherita Pizza",
            "Description": "A classic pizza originating from Italy with a simple tomato sauce base, topped with mozzarella cheese and fresh basil leaves.",
            "Category": "Pizza & Pastas",
            "Meal Type": "Lunch",
            "Main ingredients ": "Pizza dough, tomato sauce, mozzarella cheese, fresh basil leaves.",
            "Availability": "Available",
            "Price": 98,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2FPizza-PNG-Image.png?alt=media&token=58f83dc1-1065-400a-a60c-9626654d9586"
          },
          {
            "Item_id": 42,
            "Item_name": "Pasta ",
            "Description": "A dish made from cooked noodles, typically made from wheat flour or rice flour, often served with a sauce or seasoning.",
            "Category": "Pizza & Pastas",
            "Meal Type": "Lunch",
            "Main ingredients ": "Noodles (spaghetti, fettuccine, penne), sauce , toppings (vegetables, cheese).",
            "Availability": "Available",
            "Price": 115,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2FPizza-PNG-Image.png?alt=media&token=58f83dc1-1065-400a-a60c-9626654d9587"
          },
          {
            "Item_id": 43,
            "Item_name": "Veg Pizza",
            "Description": "A pizza made with various vegetables as toppings, instead of meat.",
            "Category": "Pizza & Pastas",
            "Meal Type": "Lunch",
            "Main ingredients ": "Pizza dough, tomato sauce, cheese, vegetables (bell peppers, mushrooms, onions, olives, tomatoes).",
            "Availability": "Available",
            "Price": 115,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2FPizza-PNG-Image.png?alt=media&token=58f83dc1-1065-400a-a60c-9626654d9588"
          },
          {
            "Item_id": 44,
            "Item_name": "Garlic Bread",
            "Description": "A bread dish made with garlic, butter, and herbs, often served as a side dish or appetizer.",
            "Category": "Pizza & Pastas",
            "Meal Type": "Lunch",
            "Main ingredients ": "Bread, garlic, butter, herbs (parsley, oregano).",
            "Availability": "Available",
            "Price": 57,
            "Image": "https://firebasestorage.googleapis.com/v0/b/canteen-195a4.appspot.com/o/Images%2FPizza-PNG-Image.png?alt=media&token=58f83dc1-1065-400a-a60c-9626654d9589"
          },
          {
            "Item_id": 45,
            "Item_name": "Lassi ",
            "Description": "A popular Indian yogurt-based drink",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Yogurt, water, sugar, and spices (optional)",
            "Availability": "Available",
            "Price": 34,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          },
          {
            "Item_id": 46,
            "Item_name": "Coffee",
            "Description": "A popular hot beverage made from roasted coffee beans",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Coffee beans, water, milk/sugar (optional)",
            "Availability": "Available",
            "Price": 23,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          },
          {
            "Item_id": 47,
            "Item_name": "Tea",
            "Description": "A popular hot beverage made from tea leaves",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Tea leaves, water, milk/sugar (optional)",
            "Availability": "Available",
            "Price": 17,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          },
          {
            "Item_id": 48,
            "Item_name": "Cold Coffee",
            "Description": "A chilled version of coffee, often with added milk and ice",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Coffee, milk, sugar, ice",
            "Availability": "Available",
            "Price": 57,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          },
          {
            "Item_id": 49,
            "Item_name": "Buttermilk",
            "Description": "A refreshing drink made from cultured milk",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Cultured milk, water, salt, spices (optional)",
            "Availability": "Available",
            "Price": 23,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          },
          {
            "Item_id": 50,
            "Item_name": "Watermelon Juice",
            "Description": "A refreshing juice made from fresh watermelon",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Watermelon, sugar, water, lemon juice",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          },
          {
            "Item_id": 51,
            "Item_name": "Lemonade",
            "Description": "A refreshing drink made from lemon juice and water",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Lemon juice, water, sugar, ice (optional)",
            "Availability": "Available",
            "Price": 46,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          },
          {
            "Item_id": 52,
            "Item_name": "Pineaaple Juice",
            "Description": "A sweet and tangy juice made from fresh pineapple",
            "Category": "Beverages",
            "Meal Type": "Drinks",
            "Main ingredients ": "Pineapple, water, sugar, lime juice (optional)",
            "Availability": "Available",
            "Price": 69,
            "Image": "https://freepngimg.com/thumb/tea/5-2-tea-png-image.png"
          }
      ];
      for (let i = 0; i <= 51; i++) {
        console.log(i); // prints 1, 2, 3, 4, 5
        saveItem(data[i]);
      }
      fetchData()
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
