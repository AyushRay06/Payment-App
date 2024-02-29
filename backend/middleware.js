const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startswith("Bearer")) {
    res.status(403).json({
      Msg: "Error",
    })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const verify = jwt.verify(token, JWT_SECRET)

    req.userId = verify.userId
    next()
  } catch (err) {
    return res.status(403).json({})
  }
}

module.exports = {
  authMiddleware,
}
