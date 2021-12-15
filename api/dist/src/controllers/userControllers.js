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
const carrito_1 = __importDefault(require("../models/carrito"));
class UserController {
    static setUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, phone, email, password, photo } = req.body;
                const users = yield user_1.default.find();
                if (users.length > 0) {
                    const user = new user_1.default({
                        phone,
                        email,
                        password,
                        name: { firstName, lastName },
                        photo,
                        type: "normal",
                    });
                    const userSave = yield user.save();
                    const carrito = new carrito_1.default({
                        publications: undefined,
                        userId: userSave._id,
                    });
                    yield carrito.save();
                    res.sendStatus(200);
                }
                else {
                    const user = new user_1.default({
                        phone,
                        email,
                        password,
                        name: { firstName, lastName },
                        photo,
                        type: "admin",
                    });
                    yield user.save();
                    res.sendStatus(200);
                }
            }
            catch (e) {
                console.log(e);
                res.sendStatus(404);
            }
        });
    }
    static setUserGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, phone, email, password, photo } = req.body;
                const users = yield user_1.default.find();
                if (users.length > 0) {
                    const usersGoo = yield user_1.default.findOne({ email: email });
                    if (!usersGoo) {
                        const user = new user_1.default({
                            phone,
                            email,
                            password,
                            name: { firstName, lastName },
                            photo,
                            type: "normal",
                        });
                        const userSave = yield user.save();
                        const carrito = new carrito_1.default({
                            publications: undefined,
                            userId: userSave._id,
                        });
                        yield carrito.save();
                        res.json(user);
                    }
                    else {
                        if (usersGoo && usersGoo.password === password)
                            res.json(usersGoo);
                        else
                            res.send("usuario o contraseña erronea");
                    }
                }
                else {
                    const user = new user_1.default({
                        phone,
                        email,
                        password,
                        name: { firstName, lastName },
                        photo,
                        type: "admin",
                    });
                    yield user.save();
                    res.sendStatus(200);
                }
            }
            catch (e) {
                console.log(e);
                res.sendStatus(404);
            }
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.query;
                const user = yield user_1.default.findOne({ email: email });
                if (user && user.password === password)
                    res.json(user);
                else
                    res.send("usuario o contraseña erronea");
            }
            catch (e) {
                console.log(e);
                res.sendStatus(404);
            }
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.find();
                res.json(user);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(404);
            }
        });
    }
    static getUserName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users;
                users = yield user_1.default.find();
                users = users.filter((e) => {
                    return e.active === true;
                });
                users = users
                    .map((e) => {
                        if (e.publications.length > 0)
                            return e.userName;
                    })
                    .filter((e) => e != undefined);
                console.log(users);
                res.json(users);
            }
            catch (e) {
                console.log(e);
                res.json([]);
            }
        });
    }
    static banUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, flag } = req.body;
                if (flag) {
                    yield user_1.default.updateOne({ _id: id }, { $set: { active: true } });
                    res.json("El usuario se marco como activo");
                }
                else {
                    yield user_1.default.updateOne({ _id: id }, { $set: { active: false } });
                    res.json("El usuario se marco como inactivo");
                }
            }
            catch (error) {
                console.log("error en banUser");
                res.sendStatus(404);
            }
        });
    }
    static getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(req.params);
                const user = yield user_1.default.findOne({ _id: id });
                res.json(user);
            }
            catch (error) {
                console.log("error en get one user");
                res.sendStatus(404);
            }
        });
    }
    static putStateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, flag } = req.body;
                const user = yield user_1.default.findOne({ _id: id });
                if (user) {
                    if (flag)
                        user.type = "employee";
                    else
                        user.type = "normal";
                    yield (user === null || user === void 0 ? void 0 : user.save());
                    return res.json(user);
                }
                else
                    return res.sendStatus(404);
            }
            catch (error) {
                console.log("error");
            }
        });
    }
    static getOneUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const user = yield user_1.default.findOne({ email: email });
                res.json(user);
            }
            catch (error) {
                console.log("error en get one user");
                res.sendStatus(404);
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, phone, firstName, lastName, dni, userName } = req.body;
                const user = yield user_1.default.findByIdAndUpdate({ _id: id }, {
                    $set: {
                        phone: phone,
                        name: { firstName: firstName, lastName: lastName },
                        dni: dni,
                        userName: userName,
                    },
                });
                console.log(user);
                res.json("usuario modificado");
            }
            catch (error) {
                console.log("error en updateUser");
                res.sendStatus(404);
            }
        });
    }
    static updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, street, cp, city, country, suite } = req.body;
                yield user_1.default.updateOne({ _id: id }, {
                    $addToSet: {
                        address: {
                            street: street,
                            suite: suite,
                            city: city,
                            country: country,
                            cp: cp,
                        },
                    },
                });
                res.json("Domicilio agregado correctamente");
            }
            catch (error) {
                console.log("error en updateaddres");
                res.sendStatus(404);
            }
        });
    }
}
exports.default = UserController;
