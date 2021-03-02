/**
 * @interface GenerateAudioThumbnailOptions
 * @since 1.0.0
 */
export interface GenerateAudioThumbnailOptions {
    width?: number;
    height?: number;
    backgroundColor: string;
    lineColor: string;
    lineWidth: number;
}
/**
 * @function generateAudioThumbnail
 * @since 1.0.0
 */
export declare function generateAudioThumbnail(src: string, dst: string, options: GenerateAudioThumbnailOptions): Promise<null | [string, number, number]>;
