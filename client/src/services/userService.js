import axios from 'axios';
import jwtDecode from 'jwt-decode';

class UserService {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {}
    });
  }

  createUser(userData) {
    return this.request({method: 'POST', url: '/users/new', data: userData})
      .then((response) => response.data.user);
  }

  // JWT functions
  getCurrentUser() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.request.defaults.headers.common.token = token;
    return token;
  }

  clearToken() {
    localStorage.removeItem('token');
    delete this.request.defaults.headers.common.token;
  }
}

export default new UserService();