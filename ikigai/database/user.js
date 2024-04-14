/* import User from '@/database/models/user';
import connectMongoDB from '@/lib/mongodb';

export async function create(username, password) {
  if (!(username && password))
    throw new Error('Must include username and password')

  await connectMongoDB()

  const user = await User.create({username, password})

  if (!user)
    throw new Error('Error inserting User')

  return user.toJSON()
}
*/