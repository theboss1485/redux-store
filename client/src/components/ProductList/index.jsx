import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { updateProducts as updateProductsAction } from '../../../store/slices/productSlice';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { useSelector, useDispatch } from 'react-redux';

function ProductList() {
        const dispatch = useDispatch();
        const currentCategory = useSelector((state) => state.categories.currentCategory);
        const products = useSelector((state) => state.products);
    // const [state, dispatch] = useStoreContext();

    // const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        

        if (data) {

            dispatch(updateProductsAction(
                
                {
                    products: data.products,
                }
            ));

            data.products.forEach((product) => {

                idbPromise('products', 'put', product);
            });

        } else if (!loading) {

            idbPromise('products', 'get').then((products) => {

                dispatch(updateProductsAction(
                    
                    {
                        products: products,
                    }
                ));
            });
        }

    }, [data, loading, dispatch]);

    function filterProducts() {

        console.log("test")

        if (!currentCategory) {

            

            return products.products;
        }

        return products.products.filter(

            (product) => product.category._id === currentCategory
        );
    }

    return (
        <div className="my-2">
            <h2>Our Products:</h2>
            
            {products.products.length ? (

                <div className="flex-row">
                    {filterProducts().map((product) => (

                        <ProductItem
                            key={product._id}
                            _id={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any products yet!</h3>
            )}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
}

export default ProductList;
