import mongoose, { Document, model, models, Schema } from "mongoose";

export interface IComments extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
  parentComment: mongoose.Types.ObjectId | null;
  post: mongoose.Types.ObjectId;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComments>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },

    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

commentSchema.index({ post: 1, parentComment: 1 });

const Comment = models.Comment || model<IComments>("Comment", commentSchema);

export default Comment;
