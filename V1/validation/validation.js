const joi = require('joi');

const register_Validation = data =>{
    const schema = joi.object({
        name:joi.string().required(),
        email: joi.string().lowercase(true).required(),
        password: joi.string().min(6).required()
    })
    return schema.validate(data)
}

const login_Validation = data =>{
    const schema = joi.object({
        email:joi.string().lowercase(true).required(),
        password:joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.register_Validation = register_Validation;
module.exports.login_Validation = login_Validation;