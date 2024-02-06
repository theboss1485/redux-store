import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';

import { updateCategories as updateCategoriesAction, 
         updateCurrentCategory as updateCurrentCategoryAction} from '../../../store/reducers/slices/categorySlice';

// This function deals with generating the menu of categories in the store.
function CategoryMenu() {

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    const categories = useSelector((state) => state.categories);

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

    // This function is called whenever the use clicks on a category.
    const handleClick = (id) => {

        dispatch(updateCurrentCategoryAction(
            
            {
                currentCategory: id,
            }
        ));
    };

    // Here, we actually generate the category menu.
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
