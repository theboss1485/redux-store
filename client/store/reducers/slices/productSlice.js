import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({

    name: 'product',
    initialState: {

        products: []
    },
    
    reducers: {

        updateProducts: function (state, action) {


            state.products = action.payload.products;
        

            return state;
        },
    }
})

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;