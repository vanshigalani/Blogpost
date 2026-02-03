import { createBrowserRouter } from "react-router-dom";
import Homepage from "../Pages/Home";
import CreatePost from "../Pages/CreatePost";
import Signin from "./Signin";
// import RootLayout from "../Pages/RootLayout";
import PostDatail from "./PostDetailPage";
import AuthGuard from "../Guard/AuthGuard";
import NotFound from "./NotFound";
import ExplorePost from "../Pages/ExplorePost.";
import EditPostModel from "./EditPostModel";


const Router =createBrowserRouter([
    
      {
            path:"/SignUp",
            element:<Signin/>
        },
   
    {
        path:"/",
        element:<AuthGuard/>,
        children:[
            {
                path:"/",
                element:<Homepage/>
            },
            {
                path:"/Post",
                element:<CreatePost/>
            },
            {
                path:"/:postId",
                element:<PostDatail/>
            },
            {
                path:"/ExplorePost",
                element:<ExplorePost/>
            },
            {
                path:"/Edit",
                element:<EditPostModel/>
            },
            
            
            
        ],
    },
    {
       
        path:"*",
        element:<NotFound/> 
    }
    
])
export default Router;
