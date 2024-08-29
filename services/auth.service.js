import axios from "axios";
import BaseUrl from './BaseUrl';

const API_URL = BaseUrl() + "/api/building/v1/auth";

const login = (username, password, enteredCaptchaCode) => {
    const param = new URLSearchParams();
    param.append("username", username);
    param.append("password", password);
    param.append("captcha", enteredCaptchaCode);
    param.append("grant_type", "password");
    console.log('param', param.values);
    console.log('API_URL', API_URL);

    return axios
        .post(API_URL + "/oauth/token"
            , param
            , { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        .then((response) => {
            console.log('response', response);
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        })

}
const logout = () => {
    localStorage.removeItem("user");
    console.log('logout');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    login,
    logout,
    getCurrentUser
}
export default AuthService;
