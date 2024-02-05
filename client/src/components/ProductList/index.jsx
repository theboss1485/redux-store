import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { updateProducts as updateProductsAction } from '../../../store/reducers/slices/productSlice';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { useSelector, useDispatch } from 'react-redux';

function ProductList() {

    // Allows us top GRAB refernece to the REDUCERS object
    const dispatch = useDispatch();   
    
    // this hook allows us to GRAB STATE (dataset from our STORE)
    const {currentCategory, products} = useSelector(state => state);  

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
