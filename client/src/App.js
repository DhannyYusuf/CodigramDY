import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "./component/Navbar";
import {Posts} from "./component/Posts";
import {DetailPosts} from "./component/DetailPost";
import {PostPosts} from "./component/PostPosts";
import {ContactUs} from "./component/ContactUs";
import {Login} from "./component/Login";
import {Register} from "./component/Register";
import {Profile} from "./component/Profile";
import {About} from "./component/About";
import {SearchPosts} from "./component/SearchPosts";
import {EditPosts} from "./component/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
            <Route index element={<Posts />}/>
            <Route path='/posts/:id' element={<DetailPosts />}/>
            <Route path='/post' element={<PostPosts />}/>
            <Route path='/edit/:id' element={<EditPosts />}/>
            <Route path='/search' element={<SearchPosts />}/>
            <Route path='/contact-us' element={<ContactUs />}/>
            <Route path='/about/:id' element={<About />}/>
            <Route path='/profile' element={<Profile />}/>
        </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
