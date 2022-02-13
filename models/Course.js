import mongoose from 'mongoose'

const schema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
})

export default mongoose.models.Course ?? mongoose.Model('Course', schema)
