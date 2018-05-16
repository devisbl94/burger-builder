import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-273b3.firebaseio.com/'
});

export default instance;