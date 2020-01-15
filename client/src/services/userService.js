import axios from 'axios';
import jwtDecode from 'jwt-decode';

class UserService {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {}
    });
  }

  signupUser(userData) {
    return this.request({method: 'POST', url: '/users/signup', data: userData})
      .then((response) => response.data.user);
  }

  signinUser(signinCredentials) {
    return this.request({method: 'POST', url: '/users/signin', data: signinCredentials})
      .then((response) => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token);
        } else {
          return response.data
        }
      });
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