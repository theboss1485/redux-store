import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { updateProducts as updateProductsAction } from '../../../store/reducers/slices/productSlice';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { useSelector, useDispatch } from 'react-redux';

// This function renders the list of products.
function ProductList() {

    const dispatch = useDispatch();
    const currentCategory = useSelector((state) => state.categories.currentCategory);
    const products = useSelector((state) => state.products.products);
    

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {

        // If there is data, we update the state and store the data in indexedDB.
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

    // Here, we filter the list of products to only include the products in the selected category.
    function filterProducts() {

        if (!currentCategory) {

            return products;
        }

        return products.filter(

            (product) => product.category._id === currentCategory
        );
    }


    return (
        <div className="my-2">
            <h2>Our Products:</h2>
            
            {products.length ? (

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
