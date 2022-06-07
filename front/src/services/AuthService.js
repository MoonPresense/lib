import axios from "axios";
import $api, { API_URL } from "../http";

export default class AuthService {
    static async login(login, password) {
        return $api.post('/login', {login, password})

    }

    static async registration(name, surname, email, login, password) {
        return $api.post('/registration', {name, surname, email, login, password})
        
    }

    static async logout() {
        return $api.post('/logout')
        
    }
    static async checkAuth () {
        const responce = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
        localStorage.setItem('token', responce.data.accessToken);
        console.log(responce)
    }

}