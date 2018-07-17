const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _news;

const getAll = (req, res) => {
    _news.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'news', res));
};

const getById = (req, res) => {
    // const id = req.params.id;

    const {id} = req.params;

    if (id.toString().length != 24) {
        res.status(400);
        res.json({ err: "Identificador inválido" });
    }
    else {
        _news.find({ _id: id })
            .sort({})
            .exec(handler.handleOne.bind(null, 'news', res));
    }
};

const deleteById = (req, res) => {
    const id = req.params.id;

    _news.remove({_id:id}, (err,data)=> {
        if(err) {
            res.status(400);
            res.json({msg:"No se pudo realizar la operación, intente nuevamente"});
        } else {
            res.status(200);
            res.json({msg:"La noticia se eliminó correctamente"});
        }
    });
    //const {id} = req.params;
};

const createNews = (req, res) => {
    const news = req.body;

    _news.create(news)
        .then(
            (data) => {
                res.status(200);
                res.json({msg:"Usuario creado correctamente",data:data});
            }
        )
        .catch(
            (err)=> {
                res.status(400);
                res.json({msg:"Algo va mal!!!",data:err});
            }
        )
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = {_id:id};

    console.log(query+"algo");

    _news.findOneAndUpdate(query, newData,  (err,data)=> {
        if(err) {
            res.status(400);
            res.json({msg:"No se realizar la operación, intente nuevamente"});
        } else {
            res.status(200);
            res.json({msg:"La noticia se modificó correctamente"});
        }
    });
    //const {id} = req.params;
};

module.exports = (News) => {
    _news = News;
    return ({
        getAll,
        getById,
        deleteById,
        createNews,
        updateById
    });
}