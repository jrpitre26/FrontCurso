import axios from "axios";

const baseURL = 'http://api-curso.test/api';

const apiCurso = axios.create({baseURL});

export default apiCurso;