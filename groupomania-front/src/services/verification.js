import { getCart, removeFromCart, updateQty, sendOrder } from '../dataManager.js';

const contact = {};
const regexs = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  firstName: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u,
  lastName: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u,
  address: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-1234567890]+$/u,
  city: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-1234567890]+$/u
};

const sendBtn = document.getElementById('order');
sendBtn.onclick = send;
const msgContainers = [];
// @ts-ignore
window.removeProduct = function (idProduit) {
  removeFromCart(idProduit);
  const target = document.querySelector(`[data-id="${idProduit}"]`);
  target.parentNode.removeChild(target);
};
// @ts-ignore
window.changeQty = updateQty;

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('input', checkInput);
  const elm = input.parentNode.querySelector('p');
  if (elm !== null) msgContainers.push(elm);
});

/**
 * [a chaque saisie de l'utilisateur checkIntput utilise updateUserInfoStatus avec le vérificateur regex adéquat]
 */
function checkInput (evt) {
  const input = evt.target;
  const regex = regexs[input.name];
  updateUserInfoStatus(regex.test(input.value) ? '' : 'nom invalide', input);
}

/**
 * [verifie la saisie avec le regex passé en paramètre]
 *
 * @param   {string}  updateInfo  [message d'erreur du champ de saisie]
 * @param   {object}  field       [saisie utilisateur]
 *
 * @return  {void}
 */

function updateUserInfoStatus (updateInfo, field) {
  contact[field.id] = field.value;
  const container = field.parentNode.querySelector('p');
  container.innerHTML = updateInfo;
  let errors = 0;
  msgContainers.forEach(msg => {
    if (msg.innerText !== '') errors++;
  });
  if (errors > 0) sendBtn.setAttribute('disabled', 'disabled');
  else sendBtn.removeAttribute('disabled');
}
/**
 * [send envoi les donné a l'API]
 *
 *
 */
function send (evt) {
  evt.stopPropagation();
  evt.preventDefault();
  sendOrder({
    // @ts-ignore
    products: Object.keys(getCart()),
    contact
  });
}
