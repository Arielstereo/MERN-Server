import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  date: {
    newDate: Date(),
    type: String,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Post = model("Post", postSchema);
