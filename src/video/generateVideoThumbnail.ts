import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { ffprobe } from 'fluent-ffmpeg'
import { FfmpegCommand as FFMpegCommand } from 'fluent-ffmpeg'
import { FfprobeData as FFProbeData } from 'fluent-ffmpeg'
import { ScreenshotsConfig } from 'fluent-ffmpeg'
import { getVideoMetadata } from './getVideoMetadata'

/**
 * @interface GenerateVideoThumbnailOptions
 * @since 1.0.0
 */
export interface GenerateVideoThumbnailOptions {
	width?: number
	height?: number
}

/**
 * @function generateVideoThumbnail
 * @since 1.0.0
 */
export async function generateVideoThumbnail(src: string, dst: string, options: GenerateVideoThumbnailOptions): Promise<null | [string, number, number]> {

	let dir = path.dirname(src)
	let ext = path.extname(src)
	let lbl = path.basename(src, ext)

	let meta = await getVideoMetadata(src)
	if (meta == null) {
		return null
	}

	let w = meta.width
	let h = meta.height

	let rw = options.width
	let rh = options.height

	if (rw) {
		rw = Math.min(w, rw)
	} else if (rh) {
		rh = Math.min(h, rh)
	}

	let {
		dw,
		dh
	} = resize(
		w, h,
		rw, rh
	)

	lbl = [lbl, '@', dw, 'x', dh, '.jpg'].join('')

	dst = path.join(
		dst,
		lbl
	)

	await screenshot(src, {
		count: 1,
		folder: dir,
		filename: lbl,
		timemarks: [3]
	})

	return [dst, dw, dh]
}

/**
 * @function resize
 * @since 1.0.0
 * @hidden
 */
function resize(srcW: number, srcH: number, dstW?: number, dstH?: number) {

	if (dstW != null &&
		dstH != null) {

		dstW = Math.ceil(dstW)
		dstH = Math.ceil(dstH)

	} else if (dstW) {

		dstH = Math.ceil(dstW * (srcH / srcW))

	} else if (dstH) {

		dstW = Math.ceil(dstH * (srcW / srcH))

	}

	return {
		dw: dstW || 0,
		dh: dstH || 0
	}
}

/**
 * @function screenshot
 * @since 1.0.0
 * @hidden
 */
async function screenshot(source: string, options: ScreenshotsConfig) {
	return new Promise<FFMpegCommand>((success, failure) => {
		ffmpeg(source).screenshot(options).on('error', failure).on('end', success)
	})
}