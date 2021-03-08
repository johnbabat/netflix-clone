import axios from 'axios';
import { keys } from './config';

const MY_API_KEY = keys["youtube"];

const instance = axios.create({
    baseURL: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${MY_API_KEY}&q=`
});

export default instance;