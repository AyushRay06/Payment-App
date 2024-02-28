const express = require("express")
const router = express.Router()
const zod = require("zod")
const JWT_SECRET = require("../config")
const { User } = require("../db")

//FOR INPUT VALIDATION
const signUpbody = zod.object({
  username: zod.string().email(),
  firstName: zod.string().min(3),
  lastName: zod.string().min(3),
  password: zod.string().min(8),
})

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

//SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  //PARSING INPUT BODY TO VALIDATE
  const parsedInput = signUpbody.safeParse(req.body)
  //IF USER INPUTS ARE INCORRECT THIS WILL TERMINATE THE PROCESS ELSE CTN
  if (!parsedInput.success) {
    res.status(411).json({
      msg: "Invalid Input",
    })
    return
  }
  //USER INPUT IS CORRECT NOW CHECKING IF THE EMAIL GIVEN ALREADY EXIST IF NOT ADD THE USER TO DB
  const userExist = await User.findOne(username)

  if (userExist) {
    res.status(411).json({
      msg: "User exist",
    })
    return
  }
  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  })

  //JWT TOKEN CREATION

  const userId = user._id
  // JWT,SIGH taken 2 parameters First the user id an dthen the secret
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  )

  res.json({
    msg: "User Created Successfully",
    token: token,
  })
})

router.post("/signup", async (req, res) => {
  const parsedInput = signInBody.safeParse(req.body)
  if (!parsedInput.success) {
    res.status(411).json({
      msg: "Invalid Input",
    })
    return
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })

  if (user) {
    res.json({
      token: token,
    })
    return
  }

  res.status(411).json({
    msg: "User already Exist",
  })
})
module.exports = router