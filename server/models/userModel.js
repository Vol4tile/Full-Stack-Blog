import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "defaultUserProfilePhoto.svg",
    required: true,
  },

  createDate: {
    type: Date,
    default: Date.now,
    required: "Bir oluşturulma tarihi olmalı",
  },
});

export default mongoose.model("User", userSchema);
