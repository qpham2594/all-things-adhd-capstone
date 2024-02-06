import {Schema, model, mongoose} from 'mongoose';
const bcrypt = require ('bcrypt')

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            maxlength: 10,
            minlength: 6
        },
        monthlyList: [
            {
            type: Schema.Types.ObjectId,
            ref: 'monthlyList'
            }
        ]
    }
)

userSchema.pre('save', async function (passwordCheck) {
    try {
        if (this.isModified('password') || this.isNew) {
            const hashingPassword = await bcrypt.hash(this.password,10);
            this.password = hashingPassword
        }
        passwordCheck()
    } catch (error) {
        passwordCheck(error)
    }
})

userSchema.methods.comparePassword = async function (passwordInput) {
    try {
        return await bcrypt.compare(passwordInput, this.password)
    } catch (error) {
        throw error
    }
}

module.exports = model('User', userSchema)