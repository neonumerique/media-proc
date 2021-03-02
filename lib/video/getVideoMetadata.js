"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoMetadata = void 0;
const fluent_ffmpeg_1 = require("fluent-ffmpeg");
/**
 * @function getVideoMetadata
 * @since 1.0.0
 */
async function getVideoMetadata(video) {
    let meta = await probe(video);
    if (meta == null ||
        meta.format == null) {
        return null;
    }
    let length = meta.format.nb_streams;
    if (length == null ||
        length <= 0) {
        return null;
    }
    return {
        duration: meta.format.duration || 0,
        height: meta.streams[0].height || 0,
        width: meta.streams[0].width || 0
    };
}
exports.getVideoMetadata = getVideoMetadata;
/**
 * @function probe
 * @since 1.0.0
 * @hidden
 */
async function probe(source) {
    return new Promise((success, failure) => {
        fluent_ffmpeg_1.ffprobe(source, (err, res) => err ? failure(err) : success(res));
    });
}
