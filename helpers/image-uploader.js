const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (rew, file, callBack) => {
        callBack(null, './uploads')
    },

    filename: (req, file, callBack) => {
        callBack(null, new Date().getTime() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, callBack) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callBack(null, true);
    } else {
        callBack(new Error('Unsuported files'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
});

module.exports = {
    uploads: upload
}