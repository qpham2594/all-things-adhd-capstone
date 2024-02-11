import { compare} from "bcrypt";
import User from '@/database/models/user'
import connectMongoDB from "./libs/mongodbconnect";

export async function login(username, password) {
  if (!username && !password) {
      throw new Error("You don't have an account yet.")
  }
  await connectMongoDB()
  const accountLogin = await User.findOne({username}).lean()

  if (!accountLogin) {
    throw new Error('Unable to find this account')
  }
  const comparePassword = await compare(password, accountLogin.password)

  if (!comparePassword) {
    throw new Error('Your password is incorrect')
  }

  return accountLogin
};