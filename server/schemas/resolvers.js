const { User, Product, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// This file contains the resolvers that are called when a particular query or mutation is used.
const resolvers = {

    Query: {

        // This query returns all categories
        categories: async () => {

            return await Category.find();
        },

        // This query returns all products.
        products: async (parent, { category, name }) => {

            const params = {};

            if (category) {

                params.category = category;
            }

            if (name) {

                params.name = {
                $regex: name
                };
            }

            return await Product.find(params).populate('category');
        },

        // This query returns a single product.
        product: async (parent, { _id }) => {

            return await Product.findById(_id).populate('category');
        },

        // This query returns a single user.
        user: async (parent, args, context) => {

            if (context.user) {
                
                const user = await User.findById(context.user._id).populate({

                    path: 'orders.products',
                    populate: 'category'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw AuthenticationError;
        },

        // This query returns a single order.
        order: async (parent, { _id }, context) => {

            if (context.user) {

                const user = await User.findById(context.user._id).populate({

                    path: 'orders.products',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw AuthenticationError;
        },

        // This query is called when the user goes to check out.
        checkout: async (parent, args, context) => {

            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i = 0; i < products.length; i++) {

                const product = await stripe.products.create({

                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({

                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({

                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({

                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },

    Mutation: {

        // This mutation adds a user to the database.
        addUser: async (parent, args) => {

            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        // This mutation adds an order to the database.
        addOrder: async (parent, { products }, context) => {

            if (context.user) {

                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw AuthenticationError;
        },

        // This mutation updates a user in the database.
        updateUser: async (parent, args, context) => {

            if (context.user) {
                
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw AuthenticationError;
        },

        // This mutation updates a product in the database.
        updateProduct: async (parent, { _id, quantity }) => {

            const decrement = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },

        //This mutation logs the user in to the application.
        login: async (parent, { email, password }) => {

            const user = await User.findOne({ email });

            if (!user) {

                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;
