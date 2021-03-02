import sharp = require("sharp");

/**
 * @interface ImageMetadata
 * @since 1.0.0
 */
export interface ImageMetadata {
	format: string
	height: number
	width: number
}

/**
 * @function getImageMetadata
 * @since 1.0.0
 */
export async function getImageMetadata(src: string): Promise<ImageMetadata | null> {

	let meta = await sharp(src).metadata()
	if (meta == null) {
		return null
	}

	return {
		format: meta.format || '',
		height: meta.height || 0,
		width: meta.width || 0
	}
}