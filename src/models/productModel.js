import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // 🟢 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true, // SEO friendly URL
    },
    description: {
      type: String,
      required: true,
    },

    // 🟢 Pricing & Stock
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    stock: {
      type: Number,
      default: 0,
    },

    // 🟢 Category & Brand
    category: {
      type: String,
      required: true,
    },
    
    brand: {
      type: String,
    },

    // 🟢 Media
    images: [
      {
        secure_url: { type: String, default: "profile.png" },
        public_id: { type: String, default: "profile.png" },
      },
    ],
    thumbnail: {
      secure_url: { type: String, default: "profile.png" },
      public_id: { type: String, default: "profile.png" },
    },

    // 🟢 Variants (size, color ইত্যাদি)
    variants: [
      {
        color: String,
        size: String,
        price: Number,
        stock: Number,
      },
    ],

    // 🟢 Ratings & Reviews
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },

    // 🟢 Meta Data (SEO + Tags)
    tags: [String],
    metaTitle: String,
    metaDescription: String,

    // 🟢 Sales & Tracking
    sold: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },

    // 🟢 Shipping & Return
    weight: {
      type: Number, // in kg
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    shippingInfo: String,
    returnPolicy: String,

    // 🟢 Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
