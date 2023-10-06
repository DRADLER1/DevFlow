import { Schema, models, model, Document } from "mongoose";

// Name
// Description
// Questions (We already have the question model, so you can reference them in your Tag model)
// Followers (To be referenced from a future Follower model)
// The date when the tag was created.

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Tag = models.User || model("Tag", TagSchema);

export default Tag;
