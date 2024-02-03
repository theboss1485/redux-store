
const { updateProducts: updateProductsAction} = require('../../store/reducers/slices/productSlice.js');
const { updateCategories: updateCategoriesAction,
         updateCurrentCategory: updateCurrentCategoryAction} = require('../../store/reducers/slices/categorySlice.js');

const { addToCart: addToCartAction, 
        updateCartQuantity: updateCartQuantityAction,
        removeFromCart: removeFromCartAction,
        addMultipleToCart: addMultipleToCartAction,
        clearCart: clearCartAction,
        toggleCart: toggleCartAction } = require('../../store/reducers/slices/cartSlice.js');
const store = require('../../store/index.js');

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

describe('redux store tests', function ()  {

        test('UPDATE_PRODUCTS', () => {

        let newState = store.dispatch(updateProductsAction(
            
            initialState, 
            
            {
                products: [{}, {}]
            }
        ));

        expect(newState.products.length).toBe(2);
        expect(initialState.products.length).toBe(0);
    });

    test('ADD_TO_CART', () => {

        let newState = store.dispatch(addToCartAction(
            
            initialState, 
            
            {
                product: { purchaseQuantity: 1 }
            }
        ));

        expect(newState.cart.length).toBe(3);
        expect(initialState.cart.length).toBe(2);
    });

    test('UPDATE_CART_QUANTITY', () => {

        let newState = store.dispatch(updateCartQuantityAction(
            
            initialState, 
            
            {

                _id: '1',
                purchaseQuantity: 3
            }
        ));

        expect(newState.cartOpen).toBe(true);
        expect(newState.cart[0].purchaseQuantity).toBe(3);
        expect(newState.cart[1].purchaseQuantity).toBe(2);
        expect(initialState.cartOpen).toBe(false);
    });

    test('REMOVE_FROM_CART', () => {

        let newState1 = dispatch(removeFromCartAction(
            
            initialState, 
            
            {
                _id: '1'
            }
        ));

        expect(newState1.cartOpen).toBe(true);
        expect(newState1.cart.length).toBe(1);
        expect(newState1.cart[0]._id).toBe('2');

        let newState2 = dispatch(removeFromCartAction(
            
            newState1, 
            
            {
                _id: '2'
            }
        ));

        expect(newState2.cartOpen).toBe(false);
        expect(newState2.cart.length).toBe(0);
        expect(initialState.cart.length).toBe(2);
    });

    test('ADD_MULTIPLE_TO_CART', () => {

        let newState = dispatch(addMultipleToCartAction(
            
            initialState, 
            
            {
                products: [{}, {}]
            }
        ));

        expect(newState.cart.length).toBe(4);
        expect(initialState.cart.length).toBe(2);
    });

    test('UPDATE_CATEGORIES', () => {

        let newState = dispatch(updateCategoriesAction(
            
            initialState, 
            
            {
                categories: [{}, {}]
            }
        ));

        expect(newState.categories.length).toBe(2);
        expect(initialState.categories.length).toBe(1);
    });

    test('UPDATE_CURRENT_CATEGORY', () => {

        let newState = dispatch(updateCurrentCategoryAction(
            
            initialState, 
            
            {
                currentCategory: '2'
            }
        ));

        expect(newState.currentCategory).toBe('2');
        expect(initialState.currentCategory).toBe('1');
    });

    test('CLEAR_CART', () => {

        let newState = dispatch(clearCartAction(initialState));

        expect(newState.cartOpen).toBe(false);
        expect(newState.cart.length).toBe(0);
        expect(initialState.cart.length).toBe(2);
    });

    test('TOGGLE_CART', () => {

        let newState = dispatch(toggleCartAction(initialState));

        expect(newState.cartOpen).toBe(true);
        expect(initialState.cartOpen).toBe(false);
        
        let newState2 = dispatch(toggleCartAction(newState));

        expect(newState2.cartOpen).toBe(false);
    });
})


