"use client"

import { atom} from "recoil";

export const adminstatus = atom({
    key : "adminstatus",
    default : false
})


export const isdark = atom({
  key : "isdark",
  default : false
})

export const Accountname = atom({
  key : "accountname" ,
  default : "Login"
})

export const loadingstatus = atom({
  key : "Loading",
  default : false
})




