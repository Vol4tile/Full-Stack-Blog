import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  baslik: {
    type: String,
    required: true,
  },
  yazi: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: "Bir oluşturulma tarihi olmalı",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Bir paylaşan olmalı",
  },
});

export default mongoose.model("Post", postSchema);
