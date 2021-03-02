import fs from 'fs'
import waveform from 'generate-sound-waveform'
import path from 'path'

/**
 * @interface GenerateAudioThumbnailOptions
 * @since 1.0.0
 */
export interface GenerateAudioThumbnailOptions {
	width?: number
	height?: number
	backgroundColor: string
	lineColor: string
	lineWidth: number
}

/**
 * @function generateAudioThumbnail
 * @since 1.0.0
 */
export async function generateAudioThumbnail(src: string, dst: string, options: GenerateAudioThumbnailOptions): Promise<null | [string, number, number]> {

	let {
		width,
		height,
		backgroundColor,
		lineColor,
		lineWidth,
	} = options

	let dir = path.dirname(src)
	let ext = path.extname(src)
	let lbl = path.basename(src, ext)

	let dw = width || 320
	let dh = height || 240

	lbl = [lbl, '@', dw, 'x', dh, '.jpg'].join('')

	dst = path.join(
		dst,
		lbl
	)

	try {

		let stream: any = await waveform.generateSoundImage(src, dw, dh, {
			stepMultiplier: 10,
			backgroundColor,
			lineColor,
			lineWidth,
			padding: 60,
		})

		await new Promise((finish, error) => {
			let writer = fs.createWriteStream(dst)
			writer.on('finish', finish)
			writer.on('error', error)
			stream.pipe(writer)
		})

	} catch (e) {
		return null
	}

	return [dst, dw, dh]
}
