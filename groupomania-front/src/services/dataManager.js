import axios from 'axios';

const sourceMessage = 'http://localhost:3000/api/messages';
const sourceUser = 'http://localhost:3000/api/auth';

export default class API {
  // fonction récupérant tout les message via l'API
  static async getAllData () {
    const answer = await axios.get(sourceMessage);
    // const data = await answer.json();
    return answer;
  }

  static async Login (data) {
    const requestDetails = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const result = await fetch(sourceUser + '/login', requestDetails);
    if (!result.ok) throw new Error(result.statusText);
    const extract = await result.json();
    localStorage.setItem('user', extract.username);
    localStorage.setItem('user_id', extract.user_id);
    localStorage.setItem('token', extract.token);
    return true;
  }
}
