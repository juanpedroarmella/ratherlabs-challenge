import sequelize from './src/db/db'
import { insertData } from './src/db/insertData'

const sync = async () => {
  try {
    await sequelize.sync({ force: true })
    await insertData()
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

sync()
