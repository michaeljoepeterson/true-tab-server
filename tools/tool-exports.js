
const {checkAdmin} = require('./check-admin');
const {checkEmail} = require('./check-email');
const {checkSecret} = require('./check-secret');
const {checkAdminEmail} = require('./check-admin-email');

module.exports = {checkSecret,checkAdmin,checkEmail,checkAdminEmail};