import connectMongoDB from "./libs/mongodbconnect";
import User from '@/app/database/models/user'

async function createUser(username, password) {
    try {
      if (!(username && password))
        throw new Error('Please create an account')

      await connectMongoDB()

      const user = await User.create({username, password})
      if (!user)
        throw new Error('Something went wrong when creating the account')
    } catch (error) {
      throw new Error('Unable to create user account');
    }
  }
  export {createUser};