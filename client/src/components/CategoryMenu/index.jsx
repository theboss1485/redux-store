import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';

import { updateCategories as updateCategoriesAction, 
         updateCurrentCategory as updateCurrentCategoryAction} from '../../../store/reducers/slices/categorySlice';

function CategoryMenu() {

    // const [state, dispatch] = useStoreContext();

    // const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    const categories = useSelector((state) => state.categories);
    const currentCategory = useSelector((state) => state.categories.currentCategory);

    categories.categories.map((category) => category)

    const dispatch = useDispatch();

    useEffect(() => {

        if (categoryData) {

            dispatch(updateCategoriesAction(
                
                {
                    categories: categoryData.categories,
                }
            ));

            categoryData.categories.forEach((category) => {

                idbPromise('categories', 'put', category);
            });

            } else if (!loading) {

            idbPromise('categories', 'get').then((categories) => {
                
                dispatch(updateCategoriesAction(
                    
                    {
                        categories: categories,
                    }
                ));
            });
        }

    }, [categoryData, loading, dispatch]);

    const handleClick = (id) => {

        dispatch(updateCurrentCategoryAction(
            
            {
                currentCategory: id,
            }
        ));
    };

    return (

        <div>
            <h2>Choose a Category:</h2>
            {categories.categories.map((item) => (
                <button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}
                    >
                    {item.name}
                </button>
            ))}
            <button
                onClick={() => {
                handleClick('');
                }}
            >
                All
            </button>
        </div>
    );
}

export default CategoryMenu;
