import { createSlice } from '@reduxjs/toolkit'

/*I mutated the state in this file because the documentation for redux toolkit says that this is how 
it is supposed to work.  This documentation can be found here: https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today */
// This function creates the slice that holds the reducers that have to deal with the store's item categories.
const categorySlice = createSlice({

    name: 'category',
    initialState: {

        categories: [],
        currentCategory: ''
    },
    
    reducers: {

        // This reducer is called for updating the store's list of item categories.
        updateCategories: (state, action) => {

            state.categories = action.payload.categories;
            return state;
        },

        // This reducer is called for updating which category is currently selected in the store.
        updateCurrentCategory: (state, action) => {

            state.currentCategory = action.payload.currentCategory;
            return state;
        },
    }
})

export const { updateCategories, updateCurrentCategory } = categorySlice.actions
export default categorySlice.reducer;