/**
 * @interface GenerateImageThumbnailOptions
 * @since 1.0.0
 */
export interface GenerateImageThumbnailOptions {
    width?: number;
    height?: number;
}
/**
 * @function generateImageThumbnail
 * @since 1.0.0
 */
export declare function generateImageThumbnail(src: string, dst: string, options: GenerateImageThumbnailOptions): Promise<null | [string, number, number]>;
