import axios from "axios";

axios.defaults.baseURL = "https://webelievelogistics.org/api";
axios.defaults.withCredentials = true; // Send cookies with requests

export default axios;
