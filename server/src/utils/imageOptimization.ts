//src/utils/imageOptimization.ts
import sharp from 'sharp';

/**
 * Resize and optimize profile pictures to 300x300 square
 */
export async function resizeProfilePicture(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(300, 300, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 80 })
    .toBuffer();
}

/**
 * Resize and optimize student photos to max width of 600px (maintains aspect ratio)
 */
export async function resizeStudentPhoto(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 600 }) // height auto, keeps aspect ratio
    .webp({ quality: 85 })
    .toBuffer();
}
