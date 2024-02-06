const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SESSION_SECRET;
const expiration = '2h';

module.exports = {

    AuthenticationError: new GraphQLError('Could not authenticate user.', {

        extensions: {
        code: 'UNAUTHENTICATED',
        },
    }),

    //This function authenticates the user's authorization token.
    authMiddleware: function ({ req }) {

        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {

            token = token.split(' ').pop().trim();
        }

        if (!token) {

            return req;
        }

        // This function verifies the token and gets the user data out of it.
        try {

            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        
        } catch {

            console.log('Invalid token');
        }

        return req;
    },

    // This function adds new data to the user's authorization token.
    signToken: function ({ firstName, email, _id }) {

        const payload = { firstName, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
