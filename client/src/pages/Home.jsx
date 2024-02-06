import ProductList from "../components/ProductList/index.jsx";
import CategoryMenu from "../components/CategoryMenu/index.jsx";
import Cart from "../components/Cart";

// This function renders the home page.
const Home = () => {

    return (
        
        <div className="container">
            <CategoryMenu />
            <ProductList />
            <Cart />
        </div>
    );
};

export default Home;
