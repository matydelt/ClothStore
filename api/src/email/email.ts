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

exports.send = async (options: any) => {

    const file = await readFile(`${__dirname}/plantillas/${options.htmlFile}`, 'utf8');

    let result;

    if(options.publicationPrice) {
        let mapObj: any = {
            mensaje: options?.mensaje,
            publicationName: options.publicationName,
            publicationPrice: options.publicationPrice,
            publicationImage: options.publicationImage,
        }
        result = file.replace(/mensaje|publicationName|publicationPrice|publicationImage/gi,function(matched: any ){
            return mapObj[matched];
        });
    }
    else if (options.htmlFile === 'purchaseReceived.html') {
        let mapObj: any = {
            purchaseTotal: options.purchaseTotal,
            purchaseCode: options.purchaseCode,
        }
        result = file.replace(/purchaseCode|purchaseTotal/gi,function(matched: any ){
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
    const sendMail = transport.sendMail
    return sendMail.call(transport, mailOptions);
}
