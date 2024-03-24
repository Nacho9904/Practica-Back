require('dotenv').config
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { dbConnection } = require('../database/database')



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';
 
    // DB
    this.connection();

    // middlewares
    this.middlewares();

    // routes
    this.routes();
  }

  async connection() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('tiny'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'))
  }
    


  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is online on: http://localhost:${this.port}`);
    });
  }
}


module.exports = Server;
