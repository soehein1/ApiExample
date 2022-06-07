const sibsdk = require('sib-api-v3-sdk')
require('dotenv').config()


const sendEmail =async (from, to,data) => {
    let defaultClient = sibsdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key']
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY
    let apiInstance = new sibsdk.TransactionalEmailsApi();
    var sendSmtpEmail = new sibsdk.SendSmtpEmail();
    sendSmtpEmail.to = [{email:to.email}];
    sendSmtpEmail.sender = {email:from.email,name:from.name};
    sendSmtpEmail.textContent= data;
    sendSmtpEmail.subject = "Confirm Password";
    //let sendTemplateEmail = new sibsdk.SendTemplateEmail();
    //sendSmtpEmail.subject = "Confirm Email Example";
    //sendSmtpEmail.sender = { "name": from.name, "email": from.email };
    //sendTemplateEmail.to = [{ "email": to.email, "name": to.name }];
    //sendTemplateEmail.templateId = 1

    apiInstance.sendTransacEmail(sendSmtpEmail).then((data) => {
        console.log("Email sent successfully")
    }, (error) => {
        console.log(error)
    })
}
module.exports = sendEmail