import { createSlice } from '@reduxjs/toolkit'

/*I mutated the state in this file because the documentation for redux toolkit says that this is how 
it is supposed to work.  This documentation can be found here: https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today */
// This function creates the slice that holds the reducers that have to deal with the store's list of products.
const productSlice = createSlice({

    name: 'product',
    initialState: {

        products: []
    },
    
    reducers: {

        // This reducer is called to update the list of products that is displayed on the page.
        updateProducts: function (state, action) {


            state.products = action.payload.products;
        

            return state;
        },
    }
})

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;