const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(avif|AVIF|jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const filter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(avi|AVI|avif|AVIF|flv|FLV|wmv|WMV|mov|MOV|mp4|MP4|webp|WEBP|webm|WEBM|jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only video files are allowed!';
        return cb(new Error('Only video files are allowed!'), false);
    }
    cb(null, true);
};


exports.imageFilter = imageFilter;
exports.filter = filter;