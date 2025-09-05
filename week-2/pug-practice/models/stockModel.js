// models/Stock.js
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productType: {
      type: String,
      enum: [
        "timber",
        "poles",
        "hardwood",
        "softwood",
        "furniture-home",
        "furniture-office",
      ],
      required: true,
    },
    furnitureType: {
      type: String,
      enum: [
        "bed",
        "sofa",
        "dining",
        "cupboard",
        "drawers",
        "desk",
        "chair",
        "shelf",
        "wardrobe",
        "tv-stand",
      ],
      required: function () {
        return (
          this.productType === "furniture-home" ||
          this.productType === "furniture-office"
        );
      },
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    quality: {
      type: String,
      enum: ["A", "B", "C"],
      required: true,
    },
    color: {
      type: String,
      trim: true,
    },
    measurements: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
