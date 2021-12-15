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
const nodemailer = require('nodemailer');
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'no.reply.clothstore@gmail.com',
        pass: 'grupopg16'
    }
});
exports.send = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield readFile(`${__dirname}/plantillas/${options.htmlFile}`, 'utf8');
    let result;
    if (options.publicationPrice) {
        let mapObj = {
            mensaje: options === null || options === void 0 ? void 0 : options.mensaje,
            publicationName: options.publicationName,
            publicationPrice: options.publicationPrice,
            publicationImage: options.publicationImage,
        };
        result = file.replace(/mensaje|publicationName|publicationPrice|publicationImage/gi, function (matched) {
            return mapObj[matched];
        });
    }
    else if (options.htmlFile === 'purchaseReceived.html') {
        let mapObj = {
            purchaseTotal: options.purchaseTotal,
            purchaseCode: options.purchaseCode,
        };
        result = file.replace(/purchaseCode|purchaseTotal/gi, function (matched) {
            return mapObj[matched];
        });
    }
    else if (options.htmlFile === 'purchaseSuccess.html') {
        result = file.replace('purchaseTotal', options.purchaseTotal);
    }
    let mailOptions = {
        from: '',
        to: options.email,
        subject: options.subject,
        html: result
    };
    const sendMail = transport.sendMail;
    return sendMail.call(transport, mailOptions);
});
