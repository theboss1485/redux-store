import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({

    name: 'cart',
    initialState: {

        cart: [],
        cartOpen: true
    },
    
    reducers: {

        addToCart: (state, action) => {

            state.cart.push(action.payload)

            if(!state.cartOpen){

                state.cartOpen = true;
            }
        },

        addMultipleToCart: (state, action) => {

            for(counter = 0; counter < action.payload.length; counter++){

                state.cart.push(action.payload[counter])
                
                if(!state.cartOpen){

                    state.cartOpen = true;
                }
            }
            
        },

        removeFromCart: (state, action) => {

            state.cart = state.cart.filter((product) => {
                
                product._id !== action.payload_id;
            });

            if (state.cart.length === 0 ){

                state.cartOpen = false;
            }
        },

        clearCart: (state) => {

            state.cart = [];
            state.cartOpen = false;
        },

        toggleCart: (state) => {

            state.cart = [];
            state.cartOpen = !state.cartOpen
        }
    }

})