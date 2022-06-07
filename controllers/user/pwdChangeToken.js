


function generatePwdToken(number) {
    const digits = '0123456789'
    let pwdToken = ''
    for (let i = 0; i < number; i++) {
        pwdToken += digits[Math.floor(Math.random() * 10)];

    }
    return pwdToken;
}
module.exports = generatePwdToken