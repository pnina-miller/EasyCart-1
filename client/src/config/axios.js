import axios from 'axios';
import { getDataFromStorage } from '../application/localStorage'
import { getJwtFromCookie } from '../application/cookie'
import keys from './env/keys';


//prod call with not auth calls
let Http = axios.create({
	baseURL: keys.API_URL,
	headers: {
		'content-type': 'application/json',
	}
});



//dev auth calls 
if (getJwtFromCookie('jwt')) {
	const userName = window.location.pathname.split('/')[2];
	
	Http = axios.create({
		baseURL: `${keys.API_URL}/${userName}`,
		headers: {
			'content-type': 'application/json',
			'Authorization': getJwtFromCookie('jwt')
		}
	});



}

//view http with not auth calls
export const HttpView = axios.create({
	baseURL: keys.API_URL_PUBLIC,
	headers: {
		'content-type': 'application/json',
	}
});

const user = window.location.pathname.split('/')[2];

export const HttpFile = axios.create({
	baseURL: `https://files.codes/api/${user}`,
	headers: {
		'authorization': getJwtFromCookie('jwt')
	}
});

export default Http