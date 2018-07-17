const router = require('express').Router();

module.exports = (wagner) => {
    
    const newsCtrl = wagner.invoke((News) => 
        require('../controllers/news.controller')(News));

    router.get('/', (req, res) =>
        newsCtrl.getAll(req, res));

    router.get('/:id', (req, res) =>
        newsCtrl.getById(req, res));

    router.delete('/:id', (req, res) =>
        newsCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
        newsCtrl.createNews(req, res));

    router.put('/:id', (req, res) =>
        newsCtrl.updateById(req, res));

    return router;
}