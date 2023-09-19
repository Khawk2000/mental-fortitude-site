import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//Use the context to get user info
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}