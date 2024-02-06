import { createSlice } from '@reduxjs/toolkit'

/*I mutated the state in this file because the documentation for redux toolkit says that this is how 
it is supposed to work.  This documentation can be found here: https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today */
// This function creates the slice that holds the reducers that have to deal with the shopping cart.
const cartSlice = createSlice({

    name: 'cart',
    initialState: {

        cart: [],
        cartOpen: false
    },
    
    reducers: {

        // This reducer is called for adding an item to the shopping cart.
        addToCart: function(state, action) {

            if(state.cartOpen === false){

                state.cartOpen = true;
            }

            state.cart.push(action.payload.product)
            return state;
        },

        // This reducer is called for adding multiple items to the shopping cart at once.
        addMultipleToCart: function (state, action) {

            for(let counter = 0; counter < action.payload.products.length; counter++){

                state.cart.push(action.payload.products[counter])
                
                if(state.cartOpen === false){

                    state.cartOpen = true;
                }
            }

            return state;
        },

        // This reducer is called updating the quantity of an item within the cart.
        updateCartQuantity: function (state, action) {

            if(!state.cartOpen){

                state.cartOpen = true
            }

            state.cart.map((product) => {

                if (action.payload._id === product._id) {
                    product.purchaseQuantity = action.payload.purchaseQuantity;
                }
                return product;
            })

            return state
        },

        // This reducer is called for removing an item from the shopping cart.
        removeFromCart: (state, action) => {

            state.cart = state.cart.filter((product) => {
                
                return product._id !== action.payload._id;
            });

            if (state.cart.length === 0 ){

                state.cartOpen = false;
            }

            return state;
        },

        // This reducer is called to switch the cart between a displayed and not displayed state.
        toggleCart: function(state) {

            if(state.cartOpen === true){

                state.cartOpen = false;
                return state;
            
            } else {

                state.cartOpen = true;
                return state;
            }

            
        }
    }
})

export const { addToCart, 
               addMultipleToCart,
               updateCartQuantity, 
               removeFromCart, 
               clearCart, 
               toggleCart } = cartSlice.actions;

export default cartSlice.reducer;