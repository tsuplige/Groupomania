const backend = 'http://localhost:3000/api/';
const sourceMessage = 'http://localhost:3000/api/messages';
const sourceUser = 'http://localhost:3000/api/auth';

let { token, user_id, user } = localStorage.app
  ? JSON.parse(localStorage.app)
  : {};

export default class API {
  // fonction récupérant tout les message via l'API
  static async getAllData () {
    const answer = await fetch(backend + 'messages', {
      headers: makeHeaders()
    });
    const data = await answer.json();
    return data;
  }

  static async DeleteMessage (data) {
    const requestDetails = {
      method: 'DELETE',
      headers: makeHeaders(),
      body: JSON.stringify(data)
    };
    console.log(data);
    const result = await fetch(sourceMessage, requestDetails);
    const extract = await result.json();
    console.log(extract);
    if (!result.ok) throw new Error(result.statusText);
    location.reload();
    // location.reload();
  }

  static async getComment (id) {
    const requestDetails = {
      headers: makeHeaders()
    };
    const message_id = id.message_id;
    console.log('id:', message_id);

    const answer = await fetch(sourceMessage + '/' + id.message_id, requestDetails);
    const data = await answer.json();
    console.log(answer);
    console.log(data);
    return data;
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
    token = extract.token;
    user_id = extract.user_id;
    user = extract.username;
    updateLocalStorage();
    return true;
  }

  static async postMessage (data) {
    const requestDetails = {
      method: 'POST',
      headers: makeHeaders(),
      body: JSON.stringify(data)
    };
    console.log(data);
    const result = await fetch(sourceMessage, requestDetails);
    const extract = await result.json();
    console.log(extract);
    if (!result.ok) throw new Error(result.statusText);
    console.log(extract);
    this.getAllData();
  }

  static async PostComment (data) {
    const requestDetails = {
      method: 'POST',
      headers: makeHeaders(),
      body: JSON.stringify(data)
    };
    console.log(data);
    console.log(data.message_id);
    const result = await fetch(sourceMessage + '/' + data.message_id, requestDetails);
    const extract = await result.json();
    console.log(extract);
    if (!result.ok) throw new Error(result.statusText);
    console.log(extract);
    this.getComment();
  }

  static async signup (data) {
    const requestDetails = {
      method: 'POST',
      headers: makeHeaders(),
      body: JSON.stringify(data)
    };

    console.log(requestDetails);
    const result = await fetch(sourceUser + '/signup', requestDetails);
    const extract = await result.json();
    console.log(extract);
    console.log(extract);
    if (!result.ok) throw new Error(result.statusText);
    window.alert('compte utilisateur créé !');
  }
}

function updateLocalStorage () {
  localStorage.setItem('app', JSON.stringify({ token, user_id, user }));
}

function makeHeaders () {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  console.log('token', token);
  return {
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
}
