// models/item.js
import mongoose from 'mongoose'

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Create and export the Item model


const searchModel = mongoose.models.search || mongoose.model("search",itemSchema)

export default searchModel;
