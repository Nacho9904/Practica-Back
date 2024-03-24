const { Router } = require('express')
const  { check } = require('express-validator')
const {validateFields} = require('../helpers/validateField.js')
const router = Router()
const {emailExists, isRoleValid} = require('../helpers/dbValidators.js')

const {getUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/user.controllers.js')



router.get('/' ,getUsers )
router.post('/',
[
    check('name').notEmpty(),
    check('password').isLength({min: 6}),
    check('email', 'Please enter a valid email').isEmail(),
    check('email').custom(emailExists),
    /* check('role').custom(isRoleValid), */
    validateFields
], createUsers)
router.put('/:id',[
  check('id', 'is not a valid id').isMongoId()],validateFields , updateUsers)
router.delete('/:id',[
    check('id', 'is not a valid id').isMongoId()],validateFields , deleteUsers )

module.exports = router;