import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
        const uniqueName = Date.now() + "_" + file.originalname;
        callback(null, uniqueName);
    }
});

const fileFilter = (req, file, callback) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/webp"
    ) {
        callback(null, true);
    } else {
        callback(new Error("Invalid file type"), false);
    }
};

const uploads = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default uploads;
