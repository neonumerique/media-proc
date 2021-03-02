"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoThumbnail = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const getVideoMetadata_1 = require("./getVideoMetadata");
/**
 * @function generateVideoThumbnail
 * @since 1.0.0
 */
async function generateVideoThumbnail(src, dst, options) {
    let dir = path_1.default.dirname(src);
    let ext = path_1.default.extname(src);
    let lbl = path_1.default.basename(src, ext);
    let meta = await getVideoMetadata_1.getVideoMetadata(src);
    if (meta == null) {
        return null;
    }
    let w = meta.width;
    let h = meta.height;
    let rw = options.width;
    let rh = options.height;
    if (rw) {
        rw = Math.min(w, rw);
    }
    else if (rh) {
        rh = Math.min(h, rh);
    }
    let { dw, dh } = resize(w, h, rw, rh);
    lbl = [lbl, '@', dw, 'x', dh, '.jpg'].join('');
    dst = path_1.default.join(dst, lbl);
    await screenshot(src, {
        count: 1,
        folder: dir,
        filename: lbl,
        timemarks: [3]
    });
    return [dst, dw, dh];
}
exports.generateVideoThumbnail = generateVideoThumbnail;
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
/**
 * @function screenshot
 * @since 1.0.0
 * @hidden
 */
async function screenshot(source, options) {
    return new Promise((success, failure) => {
        fluent_ffmpeg_1.default(source).screenshot(options).on('error', failure).on('end', success);
    });
}
