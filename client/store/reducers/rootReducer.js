import productReducer, {initialState as productInitialState} from './slices/productSlice'
import resetReducer from './slices/resetSlice'
import categoryReducer, {initialState as categoryInitialState} from './slices/categorySlice'
import cartReducer, {initialState as cartInitialState} from './slices/cartSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({

    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
})

// const initialState = {
//     products: [],
//     cart: [
//         {
//             _id: '1',
//             name: 'Soup',
//             purchaseQuantity: 1
//         },
//         {
//             _id: '2',
//             name: 'Bread',
//             purchaseQuantity: 2
//         }
//     ],

//     cartOpen: false,
//     categories: [{ name: 'Food' }],
//     currentCategory: '1',
// }


// export const resetState = (state = initialState, action) => {

    
//         return initialState;
// }


export default rootReducer;

