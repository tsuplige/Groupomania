const {query, getOne} = require("./database");

async function createUser(username,hash,email,admin){
    if (admin){
        try {
            await query(`INSERT INTO users(username,password,email,admin) VALUES("${username}","${hash}","${email}","${admin}");`)
         } catch (error) {
             throw error;
         }
    }
    else{
        try {
            await query(`INSERT INTO users(username,password,email) VALUES("${username}","${hash}","${email}");`)
         } catch (error) {
             throw error;
         }
    }
    
}

async function findIDByUsername(username){
    try {
       return await getOne(`SELECT id FROM users WHERE username = "${username}";`)
    } catch (error) {
        throw error;
    }
}

async function findUsernameByID(user_id){
    try {
       return await getOne(`SELECT username FROM users WHERE id = "${user_id}";`)
    } catch (error) {
        throw error;
    }
}

async function findByEmail(email){
    try {
        console.log(email+"|")
       return await getOne(`SELECT * FROM users WHERE email = "${email}";`)
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findByEmail,
    createUser,
    findIDByUsername,
    findUsernameByID
}