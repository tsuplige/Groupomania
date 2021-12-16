import {signup} from "./dataManager.js";

const User   = {};

const regexs    = {
    "email" : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "username" : /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u,
    "password" : /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u
  }

const sendBtn = document.getElementById("login--button");
sendBtn.onclick = send;
const msgContainers = [];
  // @ts-ignore
window.changeQty = updateQty;

const inputs = document.querySelectorAll("input");
inputs.forEach(input=>{
  input.addEventListener('input', checkInput );
  const elm = input.parentNode.querySelector("p")
  if (elm !== null) msgContainers.push(elm)
})

/**
 * [a chaque saisie de l'utilisateur checkIntput utilise updateUserInfoStatus avec le vérificateur regex adéquat]  
 */
function checkInput(evt) {
  const input = evt.target;
  let regex = regexs[input.name];
  updateUserInfoStatus(regex.test(input.value) ? "" : " invalide", input);
}

/**
 * [verifie la saisie avec le regex passé en paramètre]
 *
 * @param   {string}  updateInfo  [message d'erreur du champ de saisie]
 * @param   {object}  field       [saisie utilisateur]
 *
 * @return  {void}
 */

function updateUserInfoStatus(updateInfo, field) {
  User[field.id] = field.value;
  const container = field.parentNode.querySelector("p");
  container.innerHTML = updateInfo;
  let errors = 0;
  msgContainers.forEach(msg=>{
    if (msg.innerText !=="") errors++
  })
  if (errors > 0) sendBtn.setAttribute("disabled", "disabled");
  else sendBtn.removeAttribute("disabled");

}


/**
 * [send envoi les donné a l'API]
 *
 * 
 */
 async function send(evt){
  evt.stopPropagation();
  evt.preventDefault();
  await signup({
    //@ts-ignore
    "email": document.getElementById("lg_email").value,
    //@ts-ignore
    "username": document.getElementById("lg_username").value,
    //@ts-ignore
    "password": document.getElementById("lg_password").value
  });
} 