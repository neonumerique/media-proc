/**
 * @interface GenerateVideoThumbnailOptions
 * @since 1.0.0
 */
export interface GenerateVideoThumbnailOptions {
    width?: number;
    height?: number;
}
/**
 * @function generateVideoThumbnail
 * @since 1.0.0
 */
export declare function generateVideoThumbnail(src: string, dst: string, options: GenerateVideoThumbnailOptions): Promise<null | [string, number, number]>;
