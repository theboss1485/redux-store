import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    TOGGLE_CART,
} from './actions';

// This reducer executes different actions to update the application's state based on the action type.
export const reducer = (state, action) => {

    switch (action.type) {

        // This case allows for updating the displayed products.
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };

        // This case allows for adding an item to the cart.
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product],
            };

        // This case allows for adding multiple items to the cart.
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        
        // This case allows for updating the quantity of an item in the cart.
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((product) => {

                    if (action._id === product._id) {
                        
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                }),
            };

        // This case allows for removing an item from the cart.
        case REMOVE_FROM_CART:
            let newState = state.cart.filter((product) => {

                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState,
            };

        // This case allows for clearing all the items out of the cart.
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: [],
            };

        /* This case allows for toggling the cart between a 'displayed' and 'not displayed state.*/
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen,
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory,
            };

        /* This case keeps the application from crashing if the developers didn't include 
        the type of action that is passed down this switch statement.*/
        default:
            return state;
    }
};
