// Required dependencies
const utils = require('../utilities/');
const baseController = {};

// Index controller
baseController.index = async function(req, res){
    res.render('index', { title: 'Home' });
};

// About controller
baseController.about = async function(req, res){
    res.render('about/index', { title: 'About' });
};

// Privacy policy controller
baseController.privacy = async function(req, res){
    res.render('about/privacy', { title: 'Privacy Policy' });
};

module.exports = baseController