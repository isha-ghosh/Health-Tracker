import axios from "axios";
class AuthService { 
    async login( Email,PasswordHash) {
        const response = await axios.post("http://localhost:5057/api/Auth/login", { Email,PasswordHash });
        // alert(response.data.token)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
             alert("Lc " +localStorage.getItem("token"))
        }
        return response.data.token; 
    }
}
export default new AuthService();
