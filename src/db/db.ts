import { Sequelize } from 'sequelize-typescript'
import { config } from 'dotenv'

config()

const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [__dirname + '/../models']
})

export default sequelize
