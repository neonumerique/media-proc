/**
 * @interface AudioMetadata
 * @since 1.0.0
 */
export interface AudioMetadata {
    duration: number;
}
/**
 * @function getAudioMetadata
 * @since 1.0.0
 */
export declare function getAudioMetadata(src: string): Promise<AudioMetadata | null>;
