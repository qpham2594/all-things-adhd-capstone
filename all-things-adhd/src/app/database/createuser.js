import {User} from './models/user'
import connectMongoDB from "../../database/libs/mongodb";

export async function createAccount(username, password) {
    if (!username && !password) {
        throw new Error('Please create an account.')
    }

    await connectMongoDB()

    const userAccount = await User.create({username,password})

    if (!userAccount) {
        throw new Error('Unable to create account')
    }

    return userAccount.toJSON()
}