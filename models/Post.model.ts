import mongoose, { Document, model, models, Schema } from "mongoose";

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  caption?: string;
  media: {
    url: string;
    type: "image" | "video";
  }[];
  likes: mongoose.Types.ObjectId[];
  commentsCount: number;
  saves: mongoose.Types.ObjectId;
  location?: string;
  tags: mongoose.Types.ObjectId[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caption: {
      type: String,
      maxLength: 2200,
      trim: true,
    },

    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
      },
    ],

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    saves: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    commentsCount: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isArchived: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

const Post = models.Post || model<IPost>("Post", postSchema);

export default Post;
