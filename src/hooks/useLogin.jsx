import { useEffect } from "react"
import { getEmail } from "../services/auth.service"

export const useLogin = () => {
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            getEmail(token) 
        } else
        window.location.href = "/login"
    }, [])
}