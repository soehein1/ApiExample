const sibsdk = require('sib-api-v3-sdk')
require('dotenv').config()


const sendEmail =async (from, to) => {
    let defaultClient = sibsdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key']
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY
    console.log(apiKey.apikey)
    let apiInstance = new sibsdk.TransactionalEmailsApi();
    let sendTemplateEmail = new sibsdk.SendTemplateEmail();
    //sendSmtpEmail.subject = "Confirm Email Example";
    //sendSmtpEmail.sender = { "name": from.name, "email": from.email };
    sendTemplateEmail.to = [{ "email": to.email, "name": to.name }];
    sendTemplateEmail.templateId = 1

    apiInstance.sendTransacEmail(sendTemplateEmail).then((data) => {
        console.log(JSON.stringify(data))
    }, (error) => {
        console.log(error)
    })
}
module.exports = sendEmail