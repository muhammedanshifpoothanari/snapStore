// actions/user/snapStore.js
'use server'

import clientPromise from "../user/mongodb";


import { ObjectId } from "mongodb";

// Fetch product by ID
export const getsnapStoreFromDatabaseById = async (id) => {
  try {
    console.log("Product ID:", id);
    const client = await clientPromise;
    const db = client.db("snapStores");

    const snapStore = await db.collection("snapStore").findOne({ _id: new ObjectId(id) });
    console.log("Fetched Product:", snapStore);

    return { success: true, data: snapStore };
  } catch (error) {
    console.error("Error fetching snapStore from database:", error);
    return { success: false, error: error.message };
  }
};


// Create a new snapStore
export const addsnapStoreToDatabase = async (snapStoreData) => {
  try {
    const client = await clientPromise;
    const db = client.db("snapStores");

    const result = await db.collection("snapStore").insertOne(snapStoreData);
    console.log(result);
    
    return { success: true };  // Return the created snapStore
  } catch (error) {
    console.error("Error adding snapStore to database:", error);
    return { success: false, error: error.message };
  }
};



// Get all snapStore
export const getsnapStoreFromDatabase = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("snapStores");

    const snapStore = await db.collection("snapStore").find().toArray();
    return { success: true, data: snapStore };  // Return all snapStore with subsnapStore
  } catch (error) {
    console.error("Error fetching snapStore from database:", error);
    return { success: false, error: error.message };
  }
};



// Update a snapStore by ID
export const updatesnapStoreInDatabase = async (id, updatedData) => {
  try {
    console.log('*****',id,updatedData,'*****');
    
    const client = await clientPromise;
    const db = client.db("snapStores");

    const result = await db.collection("snapStore").updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating snapStore in database:", error);
    return { success: false, error: error.message };
  }
};

// Delete a snapStore by ID
export const deletesnapStoreFromDatabase = async (id) => {
  try {
    const client = await clientPromise;
    const db = client.db("snapStores");

    const result = await db.collection("snapStore").deleteOne({ _id: new ObjectId(id) });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error deleting snapStore from database:", error);
    return { success: false, error: error.message };
  }
};
