import {ReactNode} from "react";
import {getToken} from "@/utils/token.ts";
import {Navigate} from "react-router-dom";

// 鉴权组件，校验是否存在token
const Appraisal = ({children}: { children: ReactNode }) => {
    const token = getToken()
    return token ? children : <Navigate to="/login" />
}

export default  Appraisal