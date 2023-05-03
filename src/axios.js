import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kaaryar.hossein.codes',
});

export default axiosInstance;