"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileType = imageFileType;
function imageFileType(mimetype) {
    switch (mimetype) {
        case 'image/jpeg':
            return '.jpeg';
        case 'image/jpg':
            return '.jpg';
        case 'image/png':
            return '.png';
        default:
            return false;
    }
}
