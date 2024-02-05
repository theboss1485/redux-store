import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({

    name: 'category',
    initialState: {

        categories: [],
        currentCategory: ''
    },
    
    reducers: {

        updateCategories: (state, action) => {

            state.categories = action.payload.categories;
            return state;
        },

        updateCurrentCategory: (state, action) => {

            state.currentCategory = action.payload.currentCategory;
            return state;
        },
    }
})

export const { updateCategories, updateCurrentCategory } = categorySlice.actions
export default categorySlice.reducer;