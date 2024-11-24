import mongoose from 'mongoose';

const storySchema = mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    countryName: {
      type: String,
      required: true,
    },
    visitedYear: {
      type: Number,
      required: true,
    },
    photo:{
      type: String,
      required: false
    },
    description:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model('Story', storySchema);

export default Story;
