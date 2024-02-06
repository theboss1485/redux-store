import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store/index.js'

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

// Here, we use React to set up routes for the application.
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        error: <NoMatch />,
        children: [

            {
                index: true, 
                element: <Home />

            }, {

                path: '/login',
                element: <Login />

            }, {

                path: '/signup',
                element: <Signup />

            }, {

                path: '/success',
                element: <Success />

            }, {

                path: '/orderHistory',
                element: <OrderHistory />

            }, {

                path: '/products/:id',
                element: <Detail />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

    // Here we wrap the application in a provider so that it has access to the store.
    <Provider store={store}> 
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>,
)
