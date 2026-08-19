import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Bug title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "API", "Other"],
    },

    deadline: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;