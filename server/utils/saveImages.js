import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, uuidv4() + "." + extension);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 megabytes in bytes
  },
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // Only send a generic message without revealing server details
      cb(new Error("File type is not allowed."));
    }
  },
  // Define custom error handling to send a 500 status code
  // without revealing detailed error information
  onError: function (err, next) {
    console.error(err.message); // Log the error for server-side debugging if needed
    next(new Error("Internal server error."));
  },
});

export { upload };
