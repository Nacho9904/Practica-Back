const UserModel = require('../models/user')
const {ROLES} = require('../constants.js')

const isRoleValid = (role) => {
   if (!ROLES.includes(role)) {
throw new Error ('the role is not valid')
    
   }
}


const emailExists = async (email) => {
    
    const user = await UserModel.findOne({  email })
   if (user) {
    console.log(user.email)
    throw new Error('The email is already in use')
   }
}




module.exports = {
    isRoleValid,
    emailExists 
}