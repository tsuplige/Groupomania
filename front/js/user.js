import {getUserData, postMessage} from "./dataManager.js";
showPage();

const sendBtn = document.getElementById("message__button");
sendBtn.onclick = sendMessage;

function getPageId() {
    var str = document.location.href;
    var url = new URL(str);
    var idPage = url.searchParams.get('id');
    console.log(idPage);
    const parsed = parseInt(idPage, 10);
  
    return parsed;
  }

/**
 * [showPage affiche les différent produit transmi par l'API]
 *
 * @return  {promise} ajoute les produit au html 
 */
async function showPage(){
    //aller chercher nos données
    const data = await getUserData({"user_id" : getPageId()});

    //afficher les données
    let html = "";
    data.forEach(message => {
        html+= `            <div class="post__container">
        <div class="post__container--header">
            <a class="user_link" href="user.html?id=${message.user_id}">
                <h3 class="username">${message.username}</h3>
            </a>            
        </div>
        <div class="post__container--content">
            <p class="postText">${message.content}</p>
        </div>
        <div class="post__container--footer">

            <div class="more">
                <i class="fas fa-ellipsis-h commentaire_logo comm_txt"></i>
            </div>

            <a href="./comment.html?id=${message.id}">
                <div class="comment">
                <i class="far fa-comment-dots commentaire_logo comm_txt"></i>
                <p class="comm_txt">Commenter</p>
                </div>
            </a>
        </div>
    </div>`
    document.getElementById("post").innerHTML = html;
    console.log(message);
    })
}

async function sendMessage(){
    await postMessage({
        //@ts-ignore
        "user_id": localStorage.getItem("user_id"),
        //@ts-ignore
        "message_content": document.getElementById("message").value
      });
}