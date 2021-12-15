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
const denunciation_1 = __importDefault(require("../models/denunciation"));
const publication_1 = __importDefault(require("../models/publication"));
const user_1 = __importDefault(require("../models/user"));
class DenunciationController {
    static set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { publicationId, authorId, message } = req.body.denunciation;
                const denunciation = new denunciation_1.default({ author: authorId, publication: publicationId, message: message });
                yield denunciation.save();
                return res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                return res.sendStatus(404);
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const denunciations = yield denunciation_1.default.find();
                const response = [];
                for (let i = 0; i < denunciations.length; i++) {
                    const publication = yield publication_1.default.findById(denunciations[i].publication[0]);
                    response.push({
                        publication: publication,
                        author: yield user_1.default.findById(denunciations[i].author[0]),
                        denunciation: denunciations[i],
                        infractor: (yield user_1.default.findById(publication === null || publication === void 0 ? void 0 : publication.author))
                    });
                }
                console.log(response);
                return res.json(response);
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(404);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield denunciation_1.default.findByIdAndDelete(id);
                return res.sendStatus(200);
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(404);
            }
        });
    }
    static put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denunciationId } = req.body;
                console.log(denunciationId);
                const denunciation = yield denunciation_1.default.findById(denunciationId);
                if (denunciation) {
                    const publication = yield publication_1.default.findById(denunciation === null || denunciation === void 0 ? void 0 : denunciation.publication);
                    const infractor = yield user_1.default.findById(publication === null || publication === void 0 ? void 0 : publication.author);
                    denunciation.state = true;
                    if (infractor && denunciation && publication) {
                        console.log("asdasd");
                        infractor.denunciations.push(denunciation);
                        yield infractor.save();
                    }
                    yield denunciation.save();
                    return res.sendStatus(200);
                }
                else {
                    return res.sendStatus(404);
                }
            }
            catch (e) {
                console.log(e);
                return res.sendStatus(404);
            }
        });
    }
}
exports.default = DenunciationController;
