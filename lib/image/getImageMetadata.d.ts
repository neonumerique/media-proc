/**
 * @interface ImageMetadata
 * @since 1.0.0
 */
export interface ImageMetadata {
    format: string;
    height: number;
    width: number;
}
/**
 * @function getImageMetadata
 * @since 1.0.0
 */
export declare function getImageMetadata(src: string): Promise<ImageMetadata | null>;
