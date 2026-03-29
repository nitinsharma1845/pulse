import bcrypt from "bcryptjs";
import mongoose, { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  bio: string;
  avatar: string;
  postCount: number;
  savedPosts: mongoose.Types.ObjectId[];
  isVerified: boolean;
  isPrivate: boolean;
  verifyToken: string;
  verifyTokenExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      unique: true,
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    bio: {
      type: String,
      maxLength: 200,
    },

    avatar: {
      type: String,
    },

    postCount: {
      type: Number,
      default: 0,
    },

    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    isPrivate: {
      type: Boolean,
      default: true,
    },

    verifyToken : {
      type : String
    },

    verifyTokenExpiry : {
      type : Date
    }
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = models.User || model<IUser>("User", userSchema);

export default User;
