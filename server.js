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
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Upload Image</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          background: #ffffff;
          padding: 50px 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          width: 100%;
          max-width: 400px;
          transition: transform 0.3s ease;
        }

        .container:hover {
          transform: translateY(-5px);
        }

        h2 {
          margin-bottom: 30px;
          color: #333;
          font-weight: 600;
          letter-spacing: 1px;
        }

        input[type="file"] {
          margin-bottom: 25px;
          padding: 10px;
          border: 1px dashed #667eea;
          border-radius: 10px;
          width: 90%;
          cursor: pointer;
          background-color: #f8f9fa;
        }

        button {
          background: linear-gradient(to right, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px 35px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          width: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        button:hover {
          background: linear-gradient(to right, #5a67d8, #6b46c1);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
          transform: scale(1.02);
        }

        button:active {
          transform: scale(0.98);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Upload Image</h2>
        <form method="POST" action="/upload" enctype="multipart/form-data">
          <input type="file" name="image" required/><br/>
          <button type="submit">Upload Now</button>
        </form>
      </div>
    </body>
    </html>
  `); // تم إغلاق نص الـ HTML هنا
}); // تم إغلاق دالة app.get هنا بشكل صحيح

// رفع الصورة
// رفع الصورة وتحسين صفحة النجاح
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.send("Please upload a file");
  }

  // عرض صفحة نجاح منسقة بدلاً من نص بسيط
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Success!</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
        }
        .success-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          max-width: 400px;
        }
        .icon {
          font-size: 50px;
          color: #48bb78;
          margin-bottom: 20px;
        }
        h2 { margin-bottom: 10px; }
        p { color: #666; margin-bottom: 25px; }
        .back-btn {
          text-decoration: none;
          background: #667eea;
          color: white;
          padding: 10px 25px;
          border-radius: 8px;
          display: inline-block;
          transition: 0.3s;
        }
        .back-btn:hover { background: #5a67d8; }
      </style>
    </head>
    <body>
      <div class="success-card">
        <div class="icon">✓</div>
        <h2>Success!</h2>
        <p>Your image <b>${req.file.originalname}</b> has been uploaded to the server.</p>
        <a href="/" class="back-btn">Upload Another Image</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});