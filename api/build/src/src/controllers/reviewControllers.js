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
const review_1 = __importDefault(require("../models/review"));
const publication_1 = __importDefault(require("../models/publication"));
class ReviewControlllers {
    static setReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorId, publicationId, title, message, score } = req.body;
            try {
                const reviewExists = yield review_1.default.findOne({ author: authorId, publication: publicationId }).exec();
                //1 TODO: Validar que el producto haya sido comprado por el autor de la Review
                // ...
                //2 Limitar el número de reviews a 1
                // if (reviewExists) {
                //     return res.status(400).json({ msg: 'El usuario ya hizo una reseña sobre el producto' });
                // }
                const review = new review_1.default({ author: authorId, publication: publicationId, title, message, score });
                yield review.save();
                const publication = yield publication_1.default.findById(publicationId);
                publication === null || publication === void 0 ? void 0 : publication.reviews.push(review);
                yield (publication === null || publication === void 0 ? void 0 : publication.save());
                return res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                return res.sendStatus(500);
            }
        });
    }
    static getReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicationId } = req.params;
            const { filterCriteria, from = 1 } = req.query;
            let scoreAverage = 0;
            let reviews = [];
            let fromParsed = Number(from);
            let limit = 5;
            let offset = 0 + (fromParsed - 1) * limit;
            if (offset < 0)
                offset = 0;
            try {
                if (filterCriteria === 'all') {
                    reviews = yield review_1.default.find({ publication: publicationId }).skip(offset).limit(limit).exec();
                }
                if (filterCriteria === 'positive') {
                    reviews = yield review_1.default.find({ publication: publicationId, score: { $gt: 2 } }).skip(offset).limit(limit).exec();
                }
                if (filterCriteria === 'negative') {
                    reviews = yield review_1.default.find({ publication: publicationId, score: { $lt: 3 } }).skip(offset).limit(limit).exec();
                }
                let reviewsScores = yield review_1.default.find({ publication: publicationId }).exec();
                const sum = reviewsScores.reduce((partial_sum, r) => partial_sum + r.score, 0);
                scoreAverage = Math.round(sum / reviewsScores.length);
                console.log(reviews);
                return res.json({ reviews, scoreAverage, totalScores: reviewsScores.length });
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(500);
            }
        });
    }
}
exports.default = ReviewControlllers;
