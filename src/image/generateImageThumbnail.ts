import path from 'path'
import sharp from 'sharp'

/**
 * @interface GenerateImageThumbnailOptions
 * @since 1.0.0
 */
export interface GenerateImageThumbnailOptions {
	width?: number
	height?: number
}

/**
 * @function generateImageThumbnail
 * @since 1.0.0
 */
export async function generateImageThumbnail(src: string, dst: string, options: GenerateImageThumbnailOptions): Promise<null | [string, number, number]> {

	let dir = path.dirname(src)
	let ext = path.extname(src)
	let lbl = path.basename(src, ext)

	let meta = await sharp(src).metadata()

	let w = meta.width
	let h = meta.height

	if (w == null ||
		h == null) {
		return null
	}

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

	lbl = [lbl, '@', dw, 'x', dh, '.png'].join('')

	dst = path.join(
		dst,
		lbl
	)

	try {

		await sharp(src).resize(options).toFile(dst)

	} catch (e) {
		return null
	}

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