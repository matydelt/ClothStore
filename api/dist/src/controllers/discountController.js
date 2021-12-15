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
const publication_1 = __importDefault(require("../models/publication"));
const discount_1 = __importDefault(require("../models/discount"));
class DiscountController {
    static postDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicationId, authorId, percentage, amount, expirationDate } = req.body;
            console.log(expirationDate);
            try {
                const discountCreated = new discount_1.default({ publication: publicationId, author: authorId, percentage, amount });
                discountCreated.expireAt = expirationDate;
                yield discountCreated.save();
                const publication = yield publication_1.default.findById(publicationId);
                if (publication) {
                    yield discount_1.default.findByIdAndRemove(publication.discount);
                    publication.discount = discountCreated._id;
                    yield publication.save();
                }
                return res.json(discountCreated);
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(500);
            }
        });
    }
    static removeDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicationId } = req.body;
            try {
                const publication = yield publication_1.default.findById(publicationId);
                console.log(publication);
                if (publication) {
                    yield discount_1.default.findByIdAndDelete(publication.discount);
                    return res.sendStatus(200);
                }
                else {
                    return res.sendStatus(404);
                }
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(500);
            }
        });
    }
}
exports.default = DiscountController;
