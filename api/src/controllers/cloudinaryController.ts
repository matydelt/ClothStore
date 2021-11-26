// @ts-nocheck
import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import PublicationSchema, { Publication } from "../models/publication";
import cloudinary from 'cloudinary';


cloudinary.config({
    cloud_name: 'christiannordfors',
    api_key: '456175174758593',
    api_secret: 'AGIMGf3w7JcErube-sgqn6Tm-aw'
});

export default class CloudinaryController {

    static async imageUpload(req: Request, res: Response) {

        try {
            console.log(req.body.image);

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

    static async removeImage(req: Request, res: Response) {

        try {
            
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        
    }
}