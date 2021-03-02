"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImageThumbnail = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
/**
 * @function generateImageThumbnail
 * @since 1.0.0
 */
async function generateImageThumbnail(src, dst, options) {
    let dir = path_1.default.dirname(src);
    let ext = path_1.default.extname(src);
    let lbl = path_1.default.basename(src, ext);
    let meta = await sharp_1.default(src).metadata();
    let w = meta.width;
    let h = meta.height;
    if (w == null ||
        h == null) {
        return null;
    }
    let rw = options.width;
    let rh = options.height;
    if (rw) {
        rw = Math.min(w, rw);
    }
    else if (rh) {
        rh = Math.min(h, rh);
    }
    let { dw, dh } = resize(w, h, rw, rh);
    lbl = [lbl, '@', dw, 'x', dh, '.png'].join('');
    dst = path_1.default.join(dst, lbl);
    try {
        await sharp_1.default(src).resize(options).toFile(dst);
    }
    catch (e) {
        return null;
    }
    return [dst, dw, dh];
}
exports.generateImageThumbnail = generateImageThumbnail;
/**
 * @function resize
 * @since 1.0.0
 * @hidden
 */
function resize(srcW, srcH, dstW, dstH) {
    if (dstW != null &&
        dstH != null) {
        dstW = Math.ceil(dstW);
        dstH = Math.ceil(dstH);
    }
    else if (dstW) {
        dstH = Math.ceil(dstW * (srcH / srcW));
    }
    else if (dstH) {
        dstW = Math.ceil(dstH * (srcW / srcH));
    }
    return {
        dw: dstW || 0,
        dh: dstH || 0
    };
}
