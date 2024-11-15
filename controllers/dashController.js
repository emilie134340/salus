const utils = require('../utilities/');
const dashController = {};

dashController.buildDashboard = async function (req, res) {
    let circle = await utils.buildCircle();
    let plan = await utils.buildPlan();
    res.render('dashboard/index', { title: 'Dashboard', circle, plan });
}

module.exports = dashController