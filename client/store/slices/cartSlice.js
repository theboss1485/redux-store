import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({

    name: 'cart',
    initialState: {

        cart: [],
        cartOpen: true
    },
    
    reducers: {

        addToCart: (state, action) => {

            state.cart.push(action.product)

            if(!state.cartOpen){

                state.cartOpen = true;
            }

            return state;
        },

        addMultipleToCart: (state, action) => {

            for(counter = 0; counter < action.products.length; counter++){

                state.cart.push(action.products[counter])
                
                if(!state.cartOpen){

                    state.cartOpen = true;
                }
            }

            return state;
        },

        updateCartQuantity: (state, action) => {

            if(!state.cartOpen){

                state.cartOpen = true
            }

            state.cart.map((product) => {

                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
            })
        },

        removeFromCart: (state, action) => {

            state.cart = state.cart.filter((product) => {
                
                product._id !== action._id;
            });

            if (state.cart.length === 0 ){

                state.cartOpen = false;
            }

            return state;
        },

        clearCart: (state) => {

            state.cart = [];
            state.cartOpen = false;
            return state;
        },

        toggleCart: (state) => {

            state.cart = [];
            state.cartOpen = !state.cartOpen;
            return state;
        }
    }
})

export const { addToCart, 
               addMultipleToCart, 
               removeFromCart, 
               clearCart, 
               toggleCart } = cartSlice.actions;

export default cartSlice.reducer;