const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => await bcrypt.hash(password, 10);
exports.comparePassword = async (password, hash) => await bcrypt.compare(password, hash);
