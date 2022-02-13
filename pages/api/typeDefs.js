import { gql } from 'apollo-server-micro'

export default gql`
    type Query {
        courses: [Course!]!
        course(id: ID!): Course
        users: [PublicUser! | Status!]!
        user(id: ID!): User! | Status!
    }

    type Mutation {
        addCourse(content: String!): Number!
        removeCourse(id: ID!): Number!
        updateCourse(id: ID!, content: String!): Number!
        signUp(username: String!, email: String!, password: String!): Number!
        loginIn(username: String, email: String, password: String!): Number!
        updateUser(username: String, email: String, password: String): Number!
        deleteUser(id: ID!): Number!
    }

    type Course {
        id: ID!
        content: String!
    }

    type CourseStatus {
        id: ID!
        courseId: ID!
        isComplete: Boolean!
        currentPage: Int!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        courses: [CourseStatus!]!
    }

    type PublicUser {
        id: ID!
        username: String!
        courses: [CourseStatus!]!
    }

    type Status {
        status: Number!
        message: String
    }
`
