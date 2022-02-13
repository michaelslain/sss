import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import isAdmin from '../../../isAdmin'
import __dirname from '../../../__dirname'
import path from 'path'

import Course from '../../../models/Course'
import User from '../../../models/User'

export default {
    Query: {
        courses: async (_, { limit = 10, index = 0, keyword }) => '',
        course: async (_, { id }) => await Product.findById(id),
        users: async (_, { limit = 10, index = 0, keyword }) => {
            try {
                const skipAmount = limit * index
                const options = {
                    skip: skipAmount,
                }
                if (keyword)
                    options = { ...options, $regex: keyword, $options: 'i' }

                const users = User.find(null, 'username courses', options)
                    .limit(limit)
                    .exec()

                return users
            } catch (err) {
                console.error(err)
                return 500
            }
        },
        user: async (_, { id }) => {
            try {
                
            }
        },
    },
    Mutation: {
        addCourse: async (_, { content }, { req }) => {
            if (!isAdmin(req.cookies)) return null

            const product = new Product({ name, price, type })
            await product.save()

            return product
        },
        removeCourse: async (_, { id }, { req }) => {
            if (!isAdmin(req.cookies)) return null

            return await Product.findByIdAndRemove(id)
        },
        updateCourse: async (_, { id, content }, { req }) => {
            if (!isAdmin(req.cookies)) return null

            await Product.updateOne(
                { _id: id },
                {
                    $set: {
                        name,
                        type,
                        price,
                    },
                }
            )

            return await await Product.findById(id)
        },
        signUp: async (_, { username, email, password }, { res, req }) => {},
        loginIn: async (_, { username, email, password }, { res, req }) => {
            if (isAdmin(req.cookies)) return true

            const valid = await bcrypt.compare(
                password,
                process.env.ADMIN_PASSWORD
            )

            if (!valid) return false

            const token = jwt.sign(
                { role: 'admin' },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '14d',
                }
            )

            res.cookie('token', token)

            return true
        },
        updateUser: async (
            _,
            { username, email, password },
            { res, req }
        ) => {},
        deleteUser: async (_, { id }, { res, req }) => {},
    },
}
