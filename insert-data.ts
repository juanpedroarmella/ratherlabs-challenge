import sequelize from './src/db/db'
import { insertData } from './src/db/insertData'

const connectAndInsert = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true })
    await insertData()
  } catch (error) {
    console.error(error)
  }
  process.exit(0)
}

void connectAndInsert()
