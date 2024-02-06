import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

// The navbar holds the links to login and sign up.
function Nav() {

    function showNavigation() {

        if (Auth.loggedIn()) {

            return (

                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/orderHistory">
                            Order History
                        </Link>
                    </li>
                    <li className="mx-1">
                        {/* this function call is logging the user out and then refreshing the application to the start */}
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );

        } else {

            // Here, we render the navbar with HTML.
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (

        <header className="flex-row px-1">
            <h1>
                <Link to="/">
                    <span role="img" aria-label="shopping bag">🛍️</span>
                    -Shop-Shop
                </Link>
            </h1>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default Nav;
