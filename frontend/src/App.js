import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import BlogDetails from "./Pages/BlogDetails";
import LoginPage from "./Pages/LoginPage";
import AccountPage from "./Pages/AccountPage";
import SignupPage from "./Pages/SignupPage";
import CreatePost from "./Components/CreatePost/Create";
import Footer from "./Components/Footer/Footer";
import AddCategoryPage from "./Components/Category/AddCategory";
import Loader from "./Components/Loader/Loader";
import FavouriteBlogs from "./Components/Blogs/FavouriteBlogs"
import { useEffect } from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  useEffect(() => {
    
    window.onbeforeunload=function(){
      localStorage.clear();
    }

  }, [])

  return (
    <>
      <ToastContainer/>
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/details/:id" element={<BlogDetails />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/account" element={<AccountPage />} />
          <Route exact path="/createpost" element={<CreatePost />} />
          <Route exact path="/addcategory" element={<AddCategoryPage />} />
          <Route exact path="/favouriteblogs" element={<FavouriteBlogs />} />
        </Routes>
        <Footer />
        <Loader />
        
        

      </BrowserRouter>

    </>
  );
}

export default App;
