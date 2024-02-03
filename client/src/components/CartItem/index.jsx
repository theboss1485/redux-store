import { useStoreContext } from "../../utils/GlobalState";
import { removeFromCart as removeFromCartAction,
         updateCartQuantity as updateCartQuantityAction} 
from "../../../store/slices/cartSlice";
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';

const CartItem = ({ item }) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const removeFromCart = (item) => {

        dispatch(removeFromCartAction(
            
            {
                _id: item._id
            }
        ));

        idbPromise('cart', 'delete', { ...item });
    };

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
