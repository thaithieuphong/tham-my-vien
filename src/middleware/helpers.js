const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const videoFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(avi|AVI|flv|FLV|wmv|WMV|mov|MOV|mp4|MP4|WebM|WEBM|jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


exports.imageFilter = imageFilter;
exports.videoFilter = videoFilter;