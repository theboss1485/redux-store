import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({

    name: 'cart',
    initialState: {

        cart: [],
        cartOpen: false
    },
    
    reducers: {

        addToCart: function(state, action) {

            if(state.cartOpen === false){

                state.cartOpen = true;
            }

            state.cart.push(action.payload.product)
            return state;

            // return {
            //     ...state,
            //     cart: [...state.cart, action.payload.product]
            //   };
        },

        addMultipleToCart: function (state, action) {

            for(let counter = 0; counter < action.payload.products.length; counter++){

                state.cart.push(action.payload.products[counter])
                
                if(state.cartOpen === false){

                    state.cartOpen = true;
                }
            }

            return state;
        },

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

        removeFromCart: (state, action) => {

            state.cart = state.cart.filter((product) => {
                
                return product._id !== action.payload._id;
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