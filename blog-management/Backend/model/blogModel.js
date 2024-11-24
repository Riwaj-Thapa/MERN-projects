import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories" // corrected "refer" to "ref"
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users" // corrected "refer" to "ref"
    }
});

const blogModel = mongoose.model("Blogs", BlogSchema);

export default blogModel;
