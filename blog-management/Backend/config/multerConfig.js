import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());
    if (mimetype && extname) cb(null, true);
    else cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  },
});

export { upload };
