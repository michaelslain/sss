import mongoose from 'mongoose'

function randomUserName() {
    const userNameSize = 6
    let name = ''

    while (name.length != 6)
        name = Math.floor(Math.random() * Math.pow(10, userNameSize))

    return name
}

const schema = mongoose.Schema({
    username: {
        type: String,
        required: false,
        trim: true,
        default: randomUserName(),
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

export default mongoose.models.User ?? mongoose.Model('User', schema)
