import Header from './header';
import NotFound404 from './Error';
import ProductSpring from './Product';
import CreateJava from './Create';
import LoginForm from './login';
import CreateCat from './CreateCategory';
import OneProduct from './OneProduct';
import RegisterForm from './Register';
import Admin from './Admin';
import Edit from './Update';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
export default function App(){
    const router = createBrowserRouter([
        {
            path: '/',
            element:<Header/>,
            errorElement:<NotFound404/>,
            children:[
                // {
                //     path: '/product',
                //     element:<ProductSpring/>,
                //     children:[
                        // {
                        //     path: ':prodId',
                        //     element:<Item/>,
                           
                        // }
                //     ]
                // },
                // {
                //     path:'/product/:prodId/update',
                //     element:<Edit/>
                // },
                {
                    path: '/login',
                    element:<LoginForm/>
                },
                {
                    path: '/register',
                    element:<RegisterForm/>
                },
                  {
                    path: '/addproduct',
                    element:<CreateJava/>
                },
                {
                    path: '/category',
                    element:<CreateCat/>
                },
                {
                    path: '/product',
                    element:<ProductSpring/>
                },
                {
                    path: '/oneproduct/:prodId',
                    element:<OneProduct/>
                },
                {
                    path: '/update/:prodId',
                    element:<Edit/>
                },
                {
                    path: '/users',
                    element:<Admin/>
                }
            ]
        },
    ]);
    return(
        <RouterProvider router={router} />
    )
}