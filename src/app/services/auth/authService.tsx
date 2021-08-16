import axios from "axios";
const API_URL = "http://libapi.hisoft.vn"


class authService {
    login = (username:string,password:string) => {
        return axios
        .post(API_URL + "/users/authenticate", {Username : username,Password:password})
        .then((res) => {
            if(res.data.data) {
                localStorage.setItem("token",res.data.data)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data}`
            }

            return res.data
        })
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }
}

export default new authService()


