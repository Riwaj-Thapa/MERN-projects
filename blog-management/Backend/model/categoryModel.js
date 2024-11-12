import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    }
});

const categoryModel = mongoose.model("Categories",CategorySchema);

export default categoryModel;
