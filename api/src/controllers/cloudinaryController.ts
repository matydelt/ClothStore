// @ts-nocheck
import { Request, Response } from "express"
import cloudinary from 'cloudinary';


interface cloudinaryConfig{
     cloud_name: string,
     api_key: string,
     api_secret: string
};
const cloudinaryConfig :cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};
cloudinary.config(cloudinaryConfig);

export default class CloudinaryController {

    static async imageUpload(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {

        try {
            let result = await cloudinary.uploader.upload(req.body.image, {
                public_id: `${Date.now()}`,
                resource_type: "auto"
            });

            return res.json({
                public_id: result.public_id,
                url: result.secure_url,
            });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

    }

    static async removeImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        const { imageId } = req.body;

        try {
            cloudinary.uploader.destroy(imageId, () => {
                return res.sendStatus(200);
            });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

    }
}