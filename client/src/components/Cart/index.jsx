import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import {

    addMultipleToCart as addMultipleToCartAction,
    toggleCart as toggleCartAction,

} from '../../../store/reducers/slices/cartSlice'
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// This function creates the cart and uses Stripe to prepare it for payment.
const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const cartOpen = useSelector((state) => state.cart.cartOpen);

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {

        if (data) {

            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }

    }, [data]);

    useEffect(() => {

        // This function gets the cart out of global state.
        async function getCart() {

            const cart = await idbPromise('cart', 'get');
            dispatch(addMultipleToCartAction(

                { 
                    products: [...cart] 
                }
            ));
        }

        if (!cart.cart.length) {

            getCart();
        }

    }, [cart.cart.length, dispatch]);

    // This function displays and hides the cart when the cart icon is clicked.
    function toggleCart() {

        dispatch(toggleCartAction());
    }

    /* This function calculates the total amount of money the shopper owes to the store.*/
    function calculateTotal() {

        let sum = 0;
        cart.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });

        return sum.toFixed(2);
    }

    /* This function sends the contents of the users cart over for use in the checkout process. 
    Then, it calls the function to display the checkout page.*/
    function submitCheckout() {

        const productIds = [];

        cart.cart.forEach((item) => {

            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            
            variables: { products: productIds },
        });
    }

    if (!cartOpen) {

        return (

            <div className="cart-closed" onClick={toggleCart}>
                <span role="img" aria-label="trash">
                🛒
                </span>
            </div>
        );
    }

    // Here, we generate the shopping cart with HTML.
    return (

        <div className="cart">
            <div className="close" onClick={toggleCart}>
                [close]
            </div>
            <h2>Shopping Cart</h2>
            {cart.cart.length ? (
                <div>
                    {cart.cart.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>

                        {Auth.loggedIn() ? (
                        <button onClick={submitCheckout}>Checkout</button>
                        ) : (
                        <span>(log in to check out)</span>
                        )}
                    </div>
                </div>
            ) : (
                <h3>
                    <span role="img" aria-label="shocked">
                        😱
                    </span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;
