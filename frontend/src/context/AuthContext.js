import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const AuthContext = createContext({token: token});

export default AuthContext;
