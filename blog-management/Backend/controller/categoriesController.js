import categoryModel from '../model/categoryModel.js';

const addNewCategory = async (req, res) => {
    const { title } = req.body;

    try {
        if (title) {
            const findTitle = await categoryModel.findOne({ title });

            if (findTitle) {
                return res.status(400).json({ message: "Category already exists in the system :( " });
            }

            const newCategory = new categoryModel({ title });
            const savedCategory = await newCategory.save();

            if (savedCategory) {
                return res.status(200).json({ message: "Category added successfully :)" });
            }
        } else {
            return res.status(400).json({ message: "Category fields required" });
        }

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const fetchAllCategories = await categoryModel.find({});
        return res.status(200).json(fetchAllCategories);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export { addNewCategory, getCategory };
