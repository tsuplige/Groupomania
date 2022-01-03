const sourceMessage = 'http://localhost:3000/api/messages/';
const sourceUser = 'http://localhost:3000/api/auth';

async function getAllData () {
  const answer = await fetch(sourceMessage);
  const data = await answer.json();
  return data;
}

async function getUserData (data) {
  try {
    const requestDetails = {
      method: 'GET',
      body: JSON.stringify(data)
    };

    console.log(requestDetails);

    const result = await fetch(sourceMessage + 'user', requestDetails);
    const extract = await result.json();
    console.log(extract);
    if (extract.status)window.alert(extract.error);
    else {
      return extract;
    }
  } catch (err) {
    console.error(err);
  }
}

async function postMessage (data) {
  try {
    const requestDetails = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const result = await fetch(sourceMessage, requestDetails);
    const extract = await result.json();
    console.log(extract);
    if (extract.error)window.alert(extract.error);
    else {
      console.log(extract);
      location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}

async function login (data) {
  try {
    const requestDetails = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const result = await fetch(sourceUser + '/login', requestDetails);
    const extract = await result.json();
    console.log(extract);
    if (extract.error)window.alert(extract.error);
    else {
      console.log('connecté');
      console.log(extract.username);
      window.alert(extract.message);
      window.location.href = 'messages.html';
      localStorage.setItem('user', extract.username);
      localStorage.setItem('user_id', extract.user_id);
      localStorage.setItem('token', extract.token);
    }
  } catch (err) {
    console.error(err);
  }
}

async function signup (data) {
  try {
    const requestDetails = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const result = await fetch(sourceUser + '/signup', requestDetails);
    const extract = await result.json();
    console.log(extract);
    if (extract.error)window.alert(extract.error);
    else {
      window.alert('compte utilisateur créé !');
      window.location.href = 'login.html';
    }
  } catch (err) {
    console.error(err);
  }
}

export {
  getAllData,
  login,
  signup,
  postMessage,
  getUserData
};
