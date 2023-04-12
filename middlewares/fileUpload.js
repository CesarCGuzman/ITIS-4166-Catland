const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + unique + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if(mimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        return cb(new Error('File type not supported, Only jpg, png, and jpeg are allowed'));
    }
}

const upload = multer({
    storage: storage,
    limits:{fieldSize: 4 * 1024 * 1024},
    fileFilter: fileFilter
}).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, err => {
        if(err) {
            err.status = 400;
            next(err);
        } else {
            next();
        }
    });
}