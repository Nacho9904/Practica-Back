const bcrypt = require('bcryptjs')
const UserModel = require('../models/user')


/* PUT */
const updateUsers = async(req , res)=> {
   try {
    
    const {id} =req.params
    const {password, email, ...restBody} = req.body
    console.log(restBody)
    const userUpdated = await UserModel.findByIdAndUpdate(id, restBody, {new: true})


    res.json({
        message:'User updated succesfully',
        user: userUpdated,
})} 
catch (error) {
    console.log(error.message)
}}

/* DELETE */
const deleteUsers = async (req , res)=> {
    const {id} = req.params
    try {
         const user = await UserModel.findById(id)

         if (!user) {
            throw new Error('User not found')
         }

         if (!user.isActive) {
            throw new Error('User is  inactive')
         }

        const deletedUser = await UserModel.findByIdAndUpdate(id, {isActive: false}, 
            {new: true})



        res.json({
            message:'User deleted succesfully',
            deletedUser,
    })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
    }




/* POST */
const createUsers  = async(req , res) => {
    try { const { body } = req;
 console.log(body)
 const salt = bcrypt.genSaltSync(10);
 const hash = bcrypt.hashSync(body.password, salt)

   const user = new UserModel(body) 

   
     user.password = hash
 
    await user.save()

   


    res.statusCode = 201
   
    res.json({
        message:'Usuario Creado Exitosamente',
        result: user,
    });
    }
 catch (error) {
    res.statusCode= 500;
    console.error(error)
    res.json({
   message: 'internal server error',
   error : error.message
    })
}}




/* GET */
    const getUsers =  async (req , res) => {
       const {limit, offset, role, } = req.query
        const query = {isActive:true}
       /* const AllUsers =  await UserModel.find(query).skip(offset).limit(limit);
       const total = await UserModel.countDocuments(query) */

       const [allUser, total ] = await Promise.all([
        UserModel.find(query).skip(offset).limit(limit),
        UserModel.countDocuments(query)
        
       ])
   
       if (role) {
        query.role = role;
       }
       
        res.json({
            message: 'GET All users',
            result: allUser,
            total,
        })



}


 module.exports = {
        createUsers,
        deleteUsers,
        updateUsers,
        getUsers,
    }