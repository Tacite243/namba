const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
    console.log('Mot de passe:', password); 
    const saltRounds = 10;
    console.log('Salt rounds:', saltRounds); 
    
    if (typeof password === 'undefined') {
        throw new Error('Le mot de passe ne peut pas être undefined');
    }

    return await bcrypt.hash(password, saltRounds);
}
exports.comparePassword = async (password, hash) => await bcrypt.compare(password, hash);
