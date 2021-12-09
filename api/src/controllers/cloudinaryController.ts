// @ts-nocheck
import { Request, Response } from "express";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const { CLOUDINARY_PROD_CLOUD_NAME } = process.env;
const { CLOUDINARY_PROD_API_KEY } = process.env;
const { CLOUDINARY_PROD_API_SECRET } = process.env;

declare namespace process.env {
  const CLOUDINARY_PROD_CLOUD_NAME: string;
  const CLOUDINARY_PROD_API_KEY: number;
  const CLOUDINARY_PROD_API_SECRET: string;
}

cloudinary.config({
  cloud_name: CLOUDINARY_PROD_CLOUD_NAME,
  api_key: CLOUDINARY_PROD_API_KEY,
  api_secret: CLOUDINARY_PROD_API_SECRET,
});

export default class CloudinaryController {
  static async imageUpload(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
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

  static async removeImage(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
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
