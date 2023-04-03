const imageFilter = function(req, file, cb) {
    // Accept images only
    const checkImg = /(^image)(\/)[a-zA-Z0-9_]*/;
    if (!file.mimetype.match(checkImg)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const videoFilter = function(req, file, cb) {
    // Accept images only
    console.log(file.originalname);
    if (!file.originalname.match(/\.(avi|AVI|avif|AVIF|flv|FLV|wmv|WMV|mov|MOV|mp4|MP4|webp|WEBP|webm|WEBM|jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only video files are allowed!';
        return cb(new Error('Only video files are allowed!'), false);
    }
    cb(null, true);
};


exports.imageFilter = imageFilter;
exports.videoFilter = videoFilter;