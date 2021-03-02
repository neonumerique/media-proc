import { ffprobe } from 'fluent-ffmpeg'
import { FfprobeData as FFProbeData } from 'fluent-ffmpeg'

/**
 * @interface VideoMetadata
 * @since 1.0.0
 */
export interface VideoMetadata {
	duration: number
	height: number
	width: number
}

/**
 * @function getVideoMetadata
 * @since 1.0.0
 */
export async function getVideoMetadata(video: string): Promise<VideoMetadata | null> {

	let meta = await probe(video)

	if (meta == null ||
		meta.format == null) {
		return null
	}

	let length = meta.format.nb_streams
	if (length == null ||
		length <= 0) {
		return null
	}

	return {
		duration: meta.format.duration || 0,
		height: meta.streams[0].height || 0,
		width: meta.streams[0].width || 0
	}
}

/**
 * @function probe
 * @since 1.0.0
 * @hidden
 */
async function probe(source: string) {
	return new Promise<FFProbeData>((success, failure) => {
		ffprobe(source, (err, res) => err ? failure(err) : success(res))
	})
}