import { axios } from '../../core/index';

export default {
    login: (postData) => axios.post("/user/login", postData),
    getMe: () => axios.get("/user/me")
}