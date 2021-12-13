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
const user_1 = __importDefault(require("../models/user"));
const publication_1 = __importDefault(require("../models/publication"));
const sendEMail = require("../email/email");
class PublicationController {
    static setPublication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicationId } = req.query;
            try {
                const { name, images, id, stock, mark, detail, price, category, gender } = req.body;
                function numOrder() {
                    const value = (Math.random() * 0xffffff * 1000000).toString(16);
                    return `${value.slice(0, 6)}`;
                }
                const order = numOrder();
                if (publicationId) {
                    yield publication_1.default.findByIdAndUpdate(publicationId, { name, images, stock, mark, detail, price, category, gender, isRejected: false }, { new: true });
                    res.json(publicationId);
                }
                else {
                    const publication = new publication_1.default({
                        name,
                        images,
                        stock,
                        stockInicial: stock,
                        mark,
                        detail,
                        price,
                        category,
                        gender,
                        order,
                        author: id,
                    });
                    yield publication.save();
                    const user = yield user_1.default.findById(id);
                    user === null || user === void 0 ? void 0 : user.publications.push(publication);
                    yield (user === null || user === void 0 ? void 0 : user.save());
                    res.json(publication._id);
                }
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    static putPublications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, order, name } = req.query;
                const { mark, category, gender, price, author } = req.body;
                let pag = page ? Number(page) : 1;
                const charXPage = 12;
                let allPublications;
                allPublications = yield publication_1.default.find();
                // allPublications = allPublications.filter((e) => {
                //   return e.state === true;
                // });
                if (name && name !== "") {
                    allPublications = allPublications.filter((e) => {
                        return e.name.toLowerCase().search(name.toLowerCase()) > -1;
                    });
                }
                switch (order) {
                    case "Menor Precio":
                        allPublications = allPublications.sort((a, b) => {
                            if (a.price > b.price)
                                return 1;
                            else if (a.price < b.price)
                                return -1;
                            else
                                return 0;
                        });
                        break;
                    case "Mayor Precio":
                        allPublications = allPublications.sort((a, b) => {
                            if (a.price < b.price)
                                return 1;
                            else if (a.price > b.price)
                                return -1;
                            else
                                return 0;
                        });
                        break;
                    case "Desendente":
                        allPublications = allPublications.sort((a, b) => {
                            if (a.order < b.order)
                                return 1;
                            else if (a.order > b.order)
                                return -1;
                            else
                                return 0;
                        });
                        break;
                    case "Asendente":
                    default:
                        allPublications = allPublications.sort((a, b) => {
                            if (a.order > b.order)
                                return 1;
                            else if (a.order < b.order)
                                return -1;
                            else
                                return 0;
                        });
                        break;
                }
                // filtros { mark, category, gender, price, author }
                if (mark && mark !== "") {
                    allPublications = allPublications.filter((e) => {
                        return e.mark == mark;
                    });
                }
                if (category && category !== "") {
                    allPublications = allPublications.filter((e) => {
                        return e.category == category;
                    });
                }
                if (gender && gender !== "") {
                    allPublications = allPublications.filter((e) => {
                        return e.gender == gender;
                    });
                }
                if (author && author !== "") {
                    const autor = yield user_1.default.findOne({ userName: `${author}` });
                    console.log(autor === null || autor === void 0 ? void 0 : autor._id);
                    allPublications = allPublications
                        .map((e) => {
                        if (e.author.equals(autor === null || autor === void 0 ? void 0 : autor._id))
                            return e;
                    })
                        .filter((e) => e != null);
                }
                if (price && price !== "") {
                    allPublications = allPublications.filter((e) => {
                        if (price.search("< ") > -1) {
                            return price.split("< ")[1] <= e.price;
                        }
                        if (price.search(" >") > -1) {
                            return (e.price >= price.split(" > ")[0] &&
                                e.price <= price.split(" > ")[1]);
                        }
                        if (price.search("> ") > -1) {
                            return price.split("> ")[1] >= e.price;
                        }
                        if (price.search("=") > -1) {
                            return e.price == price.split("= ")[1];
                        }
                    });
                }
                const ttal = allPublications.length;
                allPublications = allPublications.slice(charXPage * (pag - 1), charXPage * (pag - 1) + charXPage);
                res.json({
                    result: allPublications,
                    count: ttal,
                });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    static deletePublications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                yield publication_1.default.deleteOne({ _id });
                res.json("Elemento Borrado");
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
    static putStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, stock } = req.body; //stockInicial
                yield publication_1.default.findById(id).updateOne({ stock: stock });
                yield publication_1.default.findById(id).updateOne({ stockInicial: stock });
                res.send("stock modificado");
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static getPublication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { publicationId } = req.query;
                const publication = yield publication_1.default.findById(publicationId);
                if (publication) {
                    res.json(publication);
                }
                else {
                    res.json({ msg: "La publicación no existe" });
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
    static getPublicationsMarks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allMarks;
                allMarks = yield publication_1.default.find();
                allMarks = allMarks.map((e) => e.mark);
                allMarks = allMarks.filter((item, index) => {
                    return allMarks.indexOf(item) === index;
                });
                res.json(allMarks);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    static putPublicationState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, flag } = req.body;
                console.log(id);
                const publication = yield publication_1.default.findById(id);
                const seller = yield user_1.default.findById(publication === null || publication === void 0 ? void 0 : publication.author);
                if (flag) {
                    if (publication) {
                        publication.state = true;
                        publication.stock = 1;
                        yield publication.save();
                        sendEMail.send({
                            publicationPrice: publication === null || publication === void 0 ? void 0 : publication.price,
                            email: seller === null || seller === void 0 ? void 0 : seller.email,
                            mensaje: "Su publicacion a sido APROBADA!",
                            subject: "Tu publicacion fue aprobada",
                            htmlFile: "publicationApproved.html",
                        });
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }
                else {
                    if (publication) {
                        publication.state = false;
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
    static getRelatedPublications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { publicationId } = req.query;
                const publication = yield publication_1.default.findById(publicationId);
                const publications = yield publication_1.default.find({ category: publication === null || publication === void 0 ? void 0 : publication.category, name: { $ne: publication === null || publication === void 0 ? void 0 : publication.name } }).limit(12);
                if (publication) {
                    res.json(publications);
                }
                else {
                    res.json({ msg: "La publicación no existe" });
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
    static postPublicationMessageADM(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, message } = req.body;
                const publication = yield publication_1.default.findByIdAndUpdate(id, { message: message, isRejected: true });
                const seller = yield user_1.default.findById(publication === null || publication === void 0 ? void 0 : publication.author);
                console.log(publication);
                sendEMail.send({
                    email: seller === null || seller === void 0 ? void 0 : seller.email,
                    mensaje: message,
                    subject: "Tu publicacion fue rechazada",
                    htmlFile: "publicationRejected.html",
                });
                res.sendStatus(200);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = PublicationController;
