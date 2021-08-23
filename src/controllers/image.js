const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/images');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + path.extname(file.originalname));
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /bmp|gif|ico|jpeg|jpg|png|svg|tif|tiff|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('The file is not in the correct format');
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

const uploadImage = async (req, res) => {
  upload(req, res, err => {
    if (err || req.file === undefined) {
      res.status(500).json({ data: 'File not found' });
    } else {
      return res.status(200).json({ imageURL: req.file.filename });
    }
  });
};

module.exports = {
  uploadImage,
};
