import axios from 'axios';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/
const api = axios.create({
  // baseURL: 'http://10.0.2.2:3000/',
  // baseURL: 'http://192.168.0.101:3000/',
  // baseURL: 'http://10.14.0.54.:3000/',
  baseURL: 'http://35.238.236.11:3000/',

});


export default api;
