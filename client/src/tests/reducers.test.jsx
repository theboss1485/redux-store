/* This file contains tests that can be run to make sure the original Context API store works.
I didn't migrate these to the redux store because a tutor said that wasn't necessary.*/
import { reducer } from '../utils/reducers';
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/actions';

const initialState = {

    products: [],

    cart: [

        {
            _id: '1',
            name: 'Soup',
            purchaseQuantity: 1
        },
        {
            _id: '2',
            name: 'Bread',
            purchaseQuantity: 2
        }
    ],

    cartOpen: false,
    categories: [{ name: 'Food' }],
    currentCategory: '1',
};

// This test checks the UPDATE_PRODUCTS action to make sure it works.
test('UPDATE_PRODUCTS', () => {

    let newState = reducer(initialState, {

        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

// This test checks the ADD_TO_CART action to make sure it works.
test('ADD_TO_CART', () => {

    let newState = reducer(initialState, {
        
        type: ADD_TO_CART,
        product: { purchaseQuantity: 1 }
    });

    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
});

// This test checks the UPDATE_CART_QUANTITY action to make sure it works.
test('UPDATE_CART_QUANTITY', () => {

    let newState = reducer(initialState, {

        type: UPDATE_CART_QUANTITY,
        _id: '1',
        purchaseQuantity: 3
    });

    expect(newState.cartOpen).toBe(true);
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    expect(newState.cart[1].purchaseQuantity).toBe(2);
    expect(initialState.cartOpen).toBe(false);
});

// This test checks the REMOVE_FROM_CART action to make sure it works.
test('REMOVE_FROM_CART', () => {

    let newState1 = reducer(initialState, {

        type: REMOVE_FROM_CART,
        _id: '1'
    });

    expect(newState1.cartOpen).toBe(true);
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');

    let newState2 = reducer(newState1, {

        type: REMOVE_FROM_CART,
        _id: '2'
    });

    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
});

// This test checks the ADD_MULTIPLE_TO_CART action to make sure it works.
// That action adds multiple items to the cart at the same time.
test('ADD_MULTIPLE_TO_CART', () => {

    let newState = reducer(initialState, {

        type: ADD_MULTIPLE_TO_CART,
        products: [{}, {}]
    });

    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
});

// This test checks the UPDATE_CATEGORIES action to make sure it works.
test('UPDATE_CATEGORIES', () => {

    let newState = reducer(initialState, {

        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

// This test checks the UPDATE_CURRENT_CATEGORY action to make sure it works.
test('UPDATE_CURRENT_CATEGORY', () => {

    let newState = reducer(initialState, {

        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});

// This test checks the CLEAR_CART action to make sure it works.
test('CLEAR_CART', () => {
    let newState = reducer(initialState, {

        type: CLEAR_CART
    });

    expect(newState.cartOpen).toBe(false);
    expect(newState.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
});

// This test checks the TOGGLE_CART action to make sure it works.
test('TOGGLE_CART', () => {

    let newState = reducer(initialState, {

        type: TOGGLE_CART
    });

    expect(newState.cartOpen).toBe(true);
    expect(initialState.cartOpen).toBe(false);
    
    let newState2 = reducer(newState, {
        
        type: TOGGLE_CART
    });

    expect(newState2.cartOpen).toBe(false);
});

