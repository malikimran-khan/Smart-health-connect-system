const express = require('express')
const multer = require('multer')
const Blog =require('../models/Blog');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const UPLOADS_DIR = path.resolve(__dirname, "../uploads/blogs");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// POST: Insert blog
router.post('/insert-blog', upload.fields([
  { name: 'blogImage', maxCount: 1 },
  { name: 'descriptionImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, subheading, description } = req.body;
    const blogImage = req.files['blogImage'][0].filename;
    const descriptionImage = req.files['descriptionImage'][0].filename;

    const newBlog = new Blog({
      title,
      subheading,
      description,
      blogImage,
      descriptionImage
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create blog' });
  }
});
router.get('/all', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
}); 
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});


module.exports=router;
