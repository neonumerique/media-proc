/**
 * @interface VideoMetadata
 * @since 1.0.0
 */
export interface VideoMetadata {
    duration: number;
    height: number;
    width: number;
}
/**
 * @function getVideoMetadata
 * @since 1.0.0
 */
export declare function getVideoMetadata(video: string): Promise<VideoMetadata | null>;
