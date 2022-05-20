
const isPasswordValid = (req, res, next) => {
  const { password, confirmPassword } = req.body
  if ((password && confirmPassword)
    && (password === confirmPassword)
    && password.length >= 8
    && password.length < 16) {
    return next()
  }
  return res.status(400).json({ message: "check your password carefully" })
}

module.exports = isPasswordValid
