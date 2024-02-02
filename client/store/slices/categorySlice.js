import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({

    name: 'category',
    initialState: {

        categories: [],
        currentCategory: ''
    },
    
    reducers: {

        updateCategories: (state, action) => {

            state.categories = action.payload
        },

        updateCurrentCategory: (state, action) => {

            state.currentCategory = action.payload;
        }
    }
})