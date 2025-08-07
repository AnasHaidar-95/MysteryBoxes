import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }],
  status: {
    type: String,
    enum: ["Received", "In Transit", "Out for Delivery", "Delivered"],
    default: "Received"
  }
}, { timestamps: true });

export default mongoose.model("Delivery", deliverySchema);