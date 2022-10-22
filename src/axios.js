import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-204c2-default-rtdb.firebaseio.com/'
    // baseURL:'https://parseapi.back4app.com/classes/BurgerData'
});
export default instance;