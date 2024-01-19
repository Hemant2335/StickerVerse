"use client"

import { atom} from "recoil";

export const adminstatus = atom({
    key : "adminstatus",
    default : false
})

export const loadingstatus = atom({
  key : "Loading",
  default : false
})




