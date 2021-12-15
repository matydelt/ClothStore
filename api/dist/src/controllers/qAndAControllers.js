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
const user_1 = __importDefault(require("../models/user"));
const qAndA_1 = __importDefault(require("../models/qAndA"));
const sendEMail = require('../email/email');
class QAndAControllers {
    static setQuestion(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { authorId, publicationId, message } = req.body;
            try {
                const question = new qAndA_1.default({ author: authorId, publication: publicationId, message, isQuestion: true });
                const publication = yield publication_1.default.findById(publicationId).populate('author');
                const seller = yield user_1.default.findById(publication === null || publication === void 0 ? void 0 : publication.author);
                yield question.save();
                sendEMail.send({
                    publicationImage: (_a = publication === null || publication === void 0 ? void 0 : publication.images[0]) === null || _a === void 0 ? void 0 : _a.url,
                    publicationName: publication === null || publication === void 0 ? void 0 : publication.name,
                    publicationPrice: publication === null || publication === void 0 ? void 0 : publication.price,
                    email: seller === null || seller === void 0 ? void 0 : seller.email,
                    mensaje: message,
                    subject: "Pregunta recibida",
                    htmlFile: "question.html",
                });
                // const publication: Publication | null = await PublicationSchema.findById(publicationId);
                // publication?.qAndAs.push(question);
                // await publication?.save();
                return res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                return res.sendStatus(404);
            }
        });
    }
    static setAnswer(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { message, questionId, authorId } = req.body;
            try {
                const question = yield qAndA_1.default.findById(questionId);
                // Validar que el vendedor pueda responder
                const publication = yield publication_1.default.findOne({ _id: question === null || question === void 0 ? void 0 : question.publication.toString() });
                if ((publication === null || publication === void 0 ? void 0 : publication.author.toString()) !== authorId)
                    return res.sendStatus(403);
                if (question) {
                    const answer = new qAndA_1.default({ author: authorId, publication: question === null || question === void 0 ? void 0 : question.publication, message });
                    const savedAnswer = yield (answer === null || answer === void 0 ? void 0 : answer.save());
                    question.answer = savedAnswer === null || savedAnswer === void 0 ? void 0 : savedAnswer._id;
                    yield (question === null || question === void 0 ? void 0 : question.save());
                    const buyer = yield user_1.default.findById(question === null || question === void 0 ? void 0 : question.author);
                    console.log(buyer);
                    sendEMail.send({
                        publicationImage: (_a = publication === null || publication === void 0 ? void 0 : publication.images[0]) === null || _a === void 0 ? void 0 : _a.url,
                        publicationName: publication === null || publication === void 0 ? void 0 : publication.name,
                        publicationPrice: publication === null || publication === void 0 ? void 0 : publication.price,
                        email: buyer === null || buyer === void 0 ? void 0 : buyer.email,
                        mensaje: message,
                        subject: "Pregunta Respondida",
                        htmlFile: "answer.html",
                    });
                }
                return res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                return res.sendStatus(404);
            }
        });
    }
    static getQAndAs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicationId } = req.params;
            try {
                const qandas = yield qAndA_1.default.find({ publication: publicationId, isQuestion: true }).sort({ createdAt: -1 }).populate('answer').exec();
                return res.json(qandas);
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(404);
            }
        });
    }
}
exports.default = QAndAControllers;
