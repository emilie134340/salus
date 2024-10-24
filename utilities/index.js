const Util = {};


/*****************************************
* Middleware For Handling Errors
* Wrap other functions in this for
* General Error Handling
****************************************/
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util