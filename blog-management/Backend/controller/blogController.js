import blogModel from '../model/blogModel.js'

const getAllBlogs = async(req,res)=>{
    try{
        const fetchAllBlogs = await blogModel.find({user:req.user._id});
        return res.status(200).json(fetchAllBlogs)
    }catch(error){
        return res.status(400).json({message:error.message})
    }

}

const addNewBlog = async(req,res)=>{
    const {title,category,description} = req.body;
    const photoPath = req.file ? req.file.path : null;
    try{ 
        if(title,category,description){
            const addBlog = new blogModel({
                title:title,
                description:description,
                category:category,
                thumbnail:photoPath,
                user: req.user._id,
            });

            const savedBlog = await addBlog.save();
            if(savedBlog){
                return res.status(200).json({message:"Blog added successfully :) "})
            }
            return res.status(400).json({message:"All feilds are required :( "})
            
        }else{
            return res.status(400).json({message:"All feilds are required :( "})

        }

    }catch(error){
        return res.status(400).json({message:error.message})
    }


}


const getSingleBlog = async(req,res)=>{
    const {id} = req.params

    try{
        if(id){
            const fetchBlogById = await blogModel.findById(id);
            return res.status(200).json(fetchBlogById)


        }else{
            return res.status(400).json({message:"Invalid Url"})
        }
        
    }catch(error){
        return res.status(400).json({message:error.message})
    }


}

export {getAllBlogs,addNewBlog,getSingleBlog};