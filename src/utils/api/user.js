import { axios } from '../../core/index';

export default {
    login: (postData) => axios.post("/user/signin", postData),
    register: (postData) => axios.post("/user/signup", postData),
    getMe: () => axios.get("/user/me"),
    verifyHash: (hash) => axios.get(`/user/verify?hash=${hash}`)
}