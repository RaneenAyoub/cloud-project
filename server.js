const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// إعداد التخزين
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send(`
    <h2>Upload Image</h2>
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="image"/>
      <button type="submit">Upload</button>
    </form>
  `);
});

// رفع الصورة
app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image uploaded successfully!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});