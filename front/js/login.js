import {login} from "./dataManager.js";

const User   = {};

const sendBtn = document.getElementById("login--button");
sendBtn.onclick = send;

/**
 * [send envoi les donné a l'API]
 *
 * 
 */
 async function send(evt){
  // evt.stopPropagation();
  // evt.preventDefault();
  await login({
    //@ts-ignore
    "email": document.getElementById("lg_email").value,
    //@ts-ignore
    "password": document.getElementById("lg_password").value
  });
} 