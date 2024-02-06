import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import {

    addToCart as addToCartAction,
    removeFromCart as removeFromCartAction,
    updateCartQuantity as updateCartQuantityAction,


} from '../../store/reducers/slices/cartSlice'

import { updateProducts as updateProductsAction } from '../../store/reducers/slices/productSlice'

import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import { useDispatch, useSelector } from 'react-redux';

/* This function brings up a page that has a picture of the specific store item the user clicked on,
a placeholder description, and options to add and remove the item to and from the cart.*/
function Detail() {
    
    const dispatch = useDispatch();
    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.products);

    

    useEffect(() => {

        // already in global store
        if (products.products.length) {

            setCurrentProduct(products.products.find((product) => product._id === id));
        }
        
        // retrieved from server
        else if (data) {

            dispatch(updateProductsAction(
                
                {
                    products: data.products,
                }
            ));

            data.products.forEach((product) => {

                idbPromise('products', 'put', product);
            });
        }

        // get cache from idb
        else if (!loading) {

            idbPromise('products', 'get').then((indexedProducts) => {

                dispatch(updateProductsAction(
                    
                    {
                        products: indexedProducts,
                    }
                ));
            });
        }

    }, [products, data, loading, dispatch, id]);

    // This function adds an item to the cart from the item's detail page.
    const addToCart = () => {

        const itemInCart = cart.cart.find((cartItem) => cartItem._id === id);
        
        if (itemInCart) {

            dispatch(updateCartQuantityAction(
                
                {
                    _id: id,
                    purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
                }
            ));

            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });

        } else {

        dispatch(addToCartAction(
            
            {
                product: { ...currentProduct, purchaseQuantity: 1 },
            }
        ));

            idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
        }
    };

    // This function removes an item from the cart from the item's detail page.
    const removeFromCart = () => {

        dispatch(removeFromCartAction(
            
            {
                _id: currentProduct._id,
            }
        ));

        idbPromise('cart', 'delete', { ...currentProduct });
    };

    // Here, we render the detail page for an object.
    return (

        <>
            {currentProduct && cart.cart ? (
                <div className="container my-1">
                    <Link to="/">← Back to Products</Link>
                    <h2>{currentProduct.name}</h2>
                    <p>{currentProduct.description}</p>
                    <p>
                        <strong>Price:</strong>${currentProduct.price}{' '}
                        <button onClick={addToCart}>Add to Cart</button>
                        <button
                        disabled={!cart.cart.find((p) => p._id === currentProduct._id)}
                        onClick={removeFromCart}
                        >
                        Remove from Cart
                        </button>
                    </p>
                    <img
                        src={`/images/${currentProduct.image}`}
                        alt={currentProduct.name}
                    />
                </div>
            ) : null}
            {loading ? <img src={spinner} alt="loading" /> : null}
            <Cart />
        </>
    );
}

export default Detail;
