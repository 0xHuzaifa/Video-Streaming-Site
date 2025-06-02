import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: [true, "video required"],
    },

    thumbnail: {
      type: String,
      required: [true, "video thumbnail required"],
    },

    title: {
      type: String,
      required: [true, "video title required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "video description required"],
    },

    duration: {
      type: Number,
      required: [true, "video duration required"],
    },

    views: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    tags: [
      {
        type: String,
        required: true,
      },
    ],
    validate: {
      validator: function (v) {
        return v.length > 3 && v.length <= 5;
      },
      message: (props) =>
        `Tags array must have between 3 and 5 tags. Currently has ${props.value.length}`,
    },
  },
  { timestamp: true }
);

videoSchema.plugin(mongooseAggregatePaginate);
const Video = mongoose.model("Video", videoSchema);
export default Video;
