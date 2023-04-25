import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.pm.kaaryar.ir',
});

export default axiosInstance;