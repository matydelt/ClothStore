"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { CLOUDINARY_PROD_CLOUD_NAME } = process.env;
const { CLOUDINARY_PROD_API_KEY } = process.env;
const { CLOUDINARY_PROD_API_SECRET } = process.env;
cloudinary_1.default.config({
    cloud_name: CLOUDINARY_PROD_CLOUD_NAME,
    api_key: CLOUDINARY_PROD_API_KEY,
    api_secret: CLOUDINARY_PROD_API_SECRET,
});
class CloudinaryController {
    static imageUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield cloudinary_1.default.uploader.upload(req.body.image, {
                    public_id: `${Date.now()}`,
                    resource_type: "auto",
                });
                return res.json({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(404);
            }
        });
    }
    static removeImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { imageId } = req.body;
            try {
                cloudinary_1.default.uploader.destroy(imageId, () => {
                    return res.sendStatus(200);
                });
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(404);
            }
        });
    }
}
exports.default = CloudinaryController;
