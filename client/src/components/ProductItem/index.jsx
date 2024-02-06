import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"

import { idbPromise } from "../../utils/helpers";

import { useSelector, useDispatch } from 'react-redux';

import {

    addToCart as addToCartAction,
    updateCartQuantity as updateCartQuantityAction,

} from '../../../store/reducers/slices/cartSlice'

/* This function renders each item in the list of products that is defined
by the current category.*/
function ProductItem(item) {

    const dispatch = useDispatch();

    const {

        image,
        name,
        _id,
        price,
        quantity

    } = item;

    const cart = useSelector((state) => state.cart);
    const itemInCart = cart.cart.find((cartItem) => cartItem._id === _id)

    // This function adds a product to the cart.
    const addToCart = () => {

        if (itemInCart) {

            dispatch(updateCartQuantityAction(
                
                {
                    _id: _id,
                    purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
                }
            ));

            idbPromise('cart', 'put', {

                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });

        } else {


            dispatch(addToCartAction(

                {
                    product: { ...item, purchaseQuantity: 1 }
                }
            ));

            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    // Here, we render the ProductItems with HTML.
    return (
            <div className="card px-1 py-1">
                <Link to={`/products/${_id}`}>
                    <img
                        alt={name}
                        src={`/images/${image}`}
                    />
                    <p>{name}</p>
                </Link>
            <div>
                <div>{quantity} {pluralize("item", quantity)} in stock</div>
                <span>${price}</span>
            </div>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
}

export default ProductItem;
