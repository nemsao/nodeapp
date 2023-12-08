import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
/**im port all components */
import List from "./List";
import Update from "./update";

import Register from "./register";
import Login from "./login";
/** root router */
const router=createBrowserRouter([
    {
        path:'/',
        element:<List></List>,
        
    },
    {
        path:'update/:data',
        element:<Update></Update>
    },
    {
        path:'Register',
        element:<Register></Register>
    },
    {
        path:'login',
        element:<Login></Login>
    },
])

export default function App(){
    return(
        <main>
        
            <RouterProvider router={router}>
              
              
            </RouterProvider>
           
        </main>
    )
}