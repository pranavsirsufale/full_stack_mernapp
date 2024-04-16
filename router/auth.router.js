//*------------------------------------------------
//* express.Router
//*------------------------------------------------

//? In Express.js , expres.Router() is a mini Express application without all the server configuarations but with the ability to define routers, middleware , and even have its own set of route handlers. It allows you to modularize your routes and middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintianable.

//? Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reasons, it is often referred to as "mini-app"

import express from 'express'
import { home , register ,login,user } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { signupSchema , LoginSchema } from '../validators/auth.validator.js'
import { authMiddleware  } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/').post(home)

router.route('/register').post( validate(signupSchema)  , register)


router.route('/login').post(validate(LoginSchema), login)

router.route('/user').get( authMiddleware, user)


export default router





//*------------------------------------------------
//*------------------------------------------------
//*------------------------------------------------