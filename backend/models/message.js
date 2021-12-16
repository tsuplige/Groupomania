const {query} = require("./database");

async function postMessage(user_id, message){
    try {
       await query(`INSERT INTO messages(user_id, content) VALUES("${user_id}","${message}");`)
    } catch (error) {
        throw error;
    }
}

async function postComment(user_id, message, message_id){
  try {
     await query(`INSERT INTO messages(user_id, content, parent_id) VALUES("${user_id}","${message}","${message_id}");`)
  } catch (error) {
      throw error;
  }
}

async function findAllMessages(){
    try {
       return await query(`SELECT content,messages.id,messages.datetime,parent_id,user_id,username FROM messages INNER JOIN users ON messages.user_id = users.id WHERE parent_id = 0 ORDER BY id DESC;`)
    } catch (error) {
        throw error;
    }
}

async function findUserMessages(user_id){
  try {
     return await query(`SELECT * FROM messages WHERE user_id = "${user_id}" AND parent_id = 0;`)
  } catch (error) {
      throw error;
  }
}

async function findComment(message_id){
  try {
     return await query(`SELECT * FROM messages WHERE id = "${message_id}" OR parent_id = "${message_id}";`)
  } catch (error) {
      throw error;
  }
}

async function changeMessage(message, message_id){
  try {
     await query(`UPDATE messages SET content="${message}" WHERE id="${message_id}";`)
  } catch (error) {
      throw error;
  }
}

async function findParentId(message_id){
  try {
     return await query(`SELECT parent_id FROM messages WHERE id = "${message_id}";`)
  } catch (error) {
      throw error;
  }
}

async function supprMessage(message_id){
  const id = await findParentId(message_id);
  try {
    if (id[0].parent_id == 0 ){
      //si le message supprimer est un message principal et non un commentaire il supprime le message et ses commentaire
      query(`DELETE FROM messages WHERE id = "${message_id}" OR parent_id = "${message_id}";`)
    }
    //si le message supprimer est un  commentaire on seulement le commentaire
    else{
        query(`DELETE FROM messages WHERE id = "${message_id}";`)
    }
  } catch (error) {
    throw error;
  }
}

async function checkAdmin(user_id){
  try {
    return await query(`SELECT admin FROM users WHERE id = "${user_id}" ;`)
 } catch (error) {
     throw error;
 }
}

module.exports = {
  postMessage,
  findAllMessages,
  findUserMessages,
  findComment,
  changeMessage,
  supprMessage,
  postComment
}