const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

var fs = require("fs");

const { userInfo } = require('os');

const {findMessagebyId, postMessage, postComment, findAllMessages, findUserMessages, findComment, changeMessage, supprMessage} = require("../models/message");


exports.createMessage = async (req, res, next) => {
    if (req.body.message_content == "") throw (res.status(401).json({message : "message vide"}));
    postMessage(req.body.user_id, req.body.message_content)
    .then (res.status(201).json({message : "message posté"}))
};

exports.createComment = async (req, res, next) => {
    if (req.body.message_content == "") throw (res.status(401).json({message : "message vide"}));
    console.log(req.body.user_id, req.body.message_content, req.body.message_id)
    postComment(req.body.user_id, req.body.message_content, req.body.message_id)
    .then ((infos)=>{
        console.log("...",infos);
        res.status(201).json({message : "commentaire posté"})
    })
};

exports.getComment = async (req, res, next) => {
    const message = await findMessagebyId(req.params.message_id);
    const comment = await findComment(req.params.message_id);
    // if (userInfo === undefined) throw {status:400, msg:"aucun message trouvé"};
    res.status(201).json({message, comment})
};
    

exports.modifyMessage = (req, res, next) => {
    if (req.body.message_content == "") throw (res.status(401).json({message : "message vide"}));
    changeMessage(req.body.message_content, req.body.message_id)
    .then (res.status(201).json({message : "message modifié"}))
};

exports.deleteMessage = (req, res, next) => {
    console.log(req.body);
    supprMessage(req.body.message_id)
    .then (res.status(201).json({message : "message supprimé"}))
};

exports.getUserMessage = async  (req, res, next) => {
    const Messages = await findUserMessages(req.params.user_id)
    if (userInfo === undefined) throw {status:400, msg:"aucun message trouvé"};
    res.status(201).json(Messages)
};

exports.getAllMessage = async (req, res, next) => {
    const Messages = await findAllMessages()
    if (userInfo === undefined) throw {status:400, msg:"aucun message trouvé"};
    res.status(201).json(Messages)
};