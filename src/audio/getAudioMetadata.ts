import * as MusicMetadata from 'music-metadata'

/**
 * @interface AudioMetadata
 * @since 1.0.0
 */
export interface AudioMetadata {
	duration: number
}

/**
 * @function getAudioMetadata
 * @since 1.0.0
 */
export async function getAudioMetadata(src: string): Promise<AudioMetadata | null> {

	let meta = await MusicMetadata.parseFile(src, { duration: true })
	if (meta == null) {
		return null
	}

	return {
		duration: meta.format.duration || 0
	}
}