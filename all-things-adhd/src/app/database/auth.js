import { compare} from "bcrypt";
import {User} from './models/user'
import connectMongoDB from "./libs/mongodb";

export async function login(username, password) {
  if (!username && !password) {
      throw new Error('Please create an account.')
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
