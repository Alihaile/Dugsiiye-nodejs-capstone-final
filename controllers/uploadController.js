import cloudinary from '../util/cloudinary.js';
import streamifier from 'streamifier';

export const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a file' });
        }

        // Cloudinary options. "resource_type: 'auto'" is critical to support both images and PDFs.
        const cloudinaryOptions = {
            folder: 'my_uploads',
            resource_type: 'auto',
        };

        // Convert Multer's buffer into a readable stream and pipe it to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            cloudinaryOptions,
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: 'Cloudinary upload failed', details: error });
                }

                // Success! Return the Cloudinary response metadata (secure_url, public_id, etc.)
                res.status(200).json({
                    message: 'Upload successful',
                    url: result.secure_url,
                });
            }
        );

        // Stream the buffer data directly to the Cloudinary API pipeline
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    } catch (err) {
        next(err);
    }
}