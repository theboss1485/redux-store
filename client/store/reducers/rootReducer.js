import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import cartReducer from './slices/cartSlice'
import { combineReducers } from '@reduxjs/toolkit'

// This function combines the reducers from the three slice files into one large reducer.
const rootReducer = combineReducers({

    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
})

export default rootReducer;

