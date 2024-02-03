import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
// import {

//     REMOVE_FROM_CART,
//     UPDATE_CART_QUANTITY,
//     ADD_TO_CART,
//     UPDATE_PRODUCTS,

//} from '../utils/actions';
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

function Detail() {
    //const [state, dispatch] = useStoreContext();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.products);

    useEffect(() => {

        // already in global store
        if (products.length) {

            setCurrentProduct(products.find((product) => product._id === id));
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

    const addToCart = () => {

        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        
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

    const removeFromCart = () => {

        dispatch(removeFromCartAction(
            
            {
                _id: currentProduct._id,
            }
        ));

        idbPromise('cart', 'delete', { ...currentProduct });
    };

    return (
        
        <>
            {currentProduct && cart ? (
                <div className="container my-1">
                    <Link to="/">← Back to Products</Link>
                    <h2>{currentProduct.name}</h2>
                    <p>{currentProduct.description}</p>
                    <p>
                        <strong>Price:</strong>${currentProduct.price}{' '}
                        <button onClick={addToCart}>Add to Cart</button>
                        <button
                        disabled={!cart.find((p) => p._id === currentProduct._id)}
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
