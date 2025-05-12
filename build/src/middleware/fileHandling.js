"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = deleteImage;
const fs_1 = __importDefault(require("fs"));
function deleteImage(imageUrl) {
    const imageLocation = "./public/" + imageUrl.replace('\\', '/');
    console.log(imageLocation);
    fs_1.default.unlink(imageLocation, err => {
        // throw err;
        console.log('error', err);
    });
}
