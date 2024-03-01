const express = require("express")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const router = express.Router()

//END POINT FOR USERS TO  CHECK THEIR BALANCE
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  })
  res.json({
    balance: account.balance,
  })
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body

  const account = await Account.findOne({
    userId: req.body,
  })

  if (account.balance < amount) {
    res.status(403).json({
      msg: "Insufficient balance",
    })
    return
  }

  const toAccount = await Account.findOne({
    userId: to,
  })

  if (!toAccount) {
    res.status(400).json({
      msg: "Invalid account",
    })
    return
  }
  await Account.updateOne(
    {
      userId: userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  )

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  )
  req,
    json({
      msg: "Transfer Successful",
    })
})

module.exports = router
