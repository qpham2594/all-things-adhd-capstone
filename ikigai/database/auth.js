/*import { compare } from 'bcrypt'
import User from '@/database/models/user';
import connectMongoDB from '@/lib/mongodb';

export async function login(username, password) {
  if (!(username && password))
    throw new Error('Must include username and password')

  await connectMongoDB()
  const user = await User.findOne({username}).lean()

  if (!user)
    throw new Error('User not found')

  const isPasswordCorrect= await compare(password, user.password)

  if (!isPasswordCorrect)
    throw new Error('Password is incorrect')

  return user
}
*/