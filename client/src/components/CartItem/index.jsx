import { removeFromCart as removeFromCartAction,
         updateCartQuantity as updateCartQuantityAction} 
from "../../../store/reducers/slices/cartSlice";
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';

// This function performs various actions on the items in the shopping cart.
const CartItem = ({ item }) => {

    const dispatch = useDispatch();

    // This function removes an item from the shopping cart.
    const removeFromCart = (item) => {

        dispatch(removeFromCartAction(
            
            {
                _id: item._id
            }
        ));

        idbPromise('cart', 'delete', { ...item });
    };

    /* This function is called when the contents of the cart change.
    It calls the function to remove an item from the cart and also
    update the quantity of the cart.*/
    const onChange = (e) => {

        const value = e.target.value;

        if (value === '0') {

            dispatch(removeFromCartAction(
                
                {
                    _id: item._id
                }
            ));

            idbPromise('cart', 'delete', { ...item });

        } else {

            dispatch(updateCartQuantityAction(
                
                {
                    _id: item._id,
                    purchaseQuantity: parseInt(value)
                }
            ));

            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

        }
    }

    // Here, we generate each cart item with HTML.
    return (
        
        <div className="flex-row">
            <div>
                <img
                src={`/images/${item.image}`}
                alt=""
                />
            </div>
            <div>
                <div>{item.name}, ${item.price}</div>
                <div>
                <span>Qty:</span>
                <input
                    type="number"
                    placeholder="1"
                    value={item.purchaseQuantity}
                    onChange={onChange}
                />
                <span
                    role="img"
                    aria-label="trash"
                    onClick={() => removeFromCart(item)}
                >
                    🗑️
                </span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
