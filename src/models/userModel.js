import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "seller"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // company: {
    //   companyName: { type: String, default: ""},
    //   address: { type: String, default: "" },
    //   phone: { type: Number, default: "", min: 11, max: 11 },
    //   website: { type: String, default: "" },
    //   bio: { type: String, default: "", max: 250 },
    //   licenseNumber: { type: Number, default: "", min: 8, max: 8 },
    //   taxId: { type: Number, default: "", min: 9, max: 9 },
    //   logo: {
    //     secure_url: { type: String, default: "logo.png" },
    //     public_id: { type: String, default: "logo.png" },
    //   },
    // },
    image: {
      secure_url: { type: String, default: "profile.png" },
      public_id: { type: String, default: "profile.png" },
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
