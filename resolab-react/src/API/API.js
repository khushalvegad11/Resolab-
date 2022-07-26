import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// instance.interceptors.request.use(async function (config) {
//     const accessToken = "";
//     config.headers.authorization = `Bearer ${token}`;

//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

export default instance;