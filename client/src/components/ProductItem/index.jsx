import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
//import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { useSelector, useDispatch } from 'react-redux';

import {

    addToCart as addToCartAction,
    updateCartQuantity as updateCartQuantityAction,

} from '../../../store/reducers/slices/cartSlice'

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

            console.log("cart", cart);

            dispatch(addToCartAction(

                {
                    product: { ...item, purchaseQuantity: 1 }
                }
            ));

            console.log("cart2", cart);

            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

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
