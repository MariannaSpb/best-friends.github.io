export default class Api {
    constructor(url) {
      this.url = url;
  
    }
  
    getResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getSum() {
      fetch(`${this.url}`)
      .then(res => this.getResponse(res));
    }
  
  }