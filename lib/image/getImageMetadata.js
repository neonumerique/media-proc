"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageMetadata = void 0;
const sharp = require("sharp");
/**
 * @function getImageMetadata
 * @since 1.0.0
 */
async function getImageMetadata(src) {
    let meta = await sharp(src).metadata();
    if (meta == null) {
        return null;
    }
    return {
        format: meta.format || '',
        height: meta.height || 0,
        width: meta.width || 0
    };
}
exports.getImageMetadata = getImageMetadata;
