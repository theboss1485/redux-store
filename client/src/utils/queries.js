import { gql } from '@apollo/client';

// This is the definition of the query to pull a product from the database.
export const QUERY_PRODUCTS = gql`
    query getProducts($category: ID) {
        products(category: $category) {
            _id
            name
            description
            price
            quantity
            image
            category {
                _id
            }
        }
    }
`;

// This is the definition of the query to get the session for checkout purposes.
export const QUERY_CHECKOUT = gql`
    query getCheckout($products: [ID]!) {
        checkout(products: $products) {
            session
        }
    }
`;
// This is the definition of the query to pull all the products from the database.
export const QUERY_ALL_PRODUCTS = gql`
    {
        products {
            _id
            name
            description
            price
            quantity
            category {
                name
            }
        }
    }
`;

// This is the definition of the query to get all categories from the database.
export const QUERY_CATEGORIES = gql`
    {
        categories {
            _id
            name
        }
    }
`;

// This is the definition of the query to get a user from the database.
export const QUERY_USER = gql`
    {
        user {
            firstName
            lastName
            orders {
                _id
                purchaseDate
                products {
                    _id
                    name
                    description
                    price
                    quantity
                    image
                }
            }
        }
    }
`;
