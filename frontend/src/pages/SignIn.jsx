import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"

export const Signin = () => {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-3xl bg-white p-9 text-center h-max">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter You Credential to Login"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            label={"Email"}
            placeholder={"username@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            label={"password"}
            placeholder={"********"}
          />
          <div className="pt-8">
            <Button label={"Sign In"} />
          </div>
          <BottomWarning label={"Don't have an account? Sign Up"} />
        </div>
      </div>
    </div>
  )
}
