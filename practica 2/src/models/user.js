
const {Schema, model} = require('mongoose')

const UserSchema = Schema ({
    name:{
        type:String,
        require:true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'USER',
    },
    edad: {
        type:Number
    },

    isActive: {
        type:Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function () {
 const {__v, password, _id, ...user } = this.toObject()
 user.uid = _id;
 return user
   }



module.exports = model('User', UserSchema)
