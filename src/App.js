import {Routes, Route} from "react-router-dom"
import { Box, Container } from "@mui/material";

import { theme } from './theme';
import { ThemeProvider } from '@emotion/react';

import Nav from './components/Nav/Nav'
import Home from './pages/Home/Home'
import TestRedux from './redux/slices/test/TestRedux'
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import PostDetail from "./pages/Post/PostDetail/PostDetail";
import CreatePost from "./pages/Post/CreatePost/CreatePost";
import Profile from "./pages/Profile/Profile";
import ResetPssw from "./pages/Profile/ResetPssw";
import MyBlogs from "./pages/Post/MyBlogs/MyBlogs";
import EditPost from './pages/Post/EditPost/EditPost'
import MyLikeBlogs from "./pages/Post/MyLikeBlogs/MyLikeBlogs";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Nav />
        <Routes>
          <Route path="/test-redux" element={<TestRedux></TestRedux>}/>

          <Route path="/" element={<Home />}/>
          {/* auth */}
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />}/>
          {/* profile */}
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/reset-password/:id" element={<ResetPssw/>}/>

          {/* blogs */}
          <Route path="/blog/:id" element={<PostDetail/>}/>
          <Route path="/create-blog" element={<CreatePost />} />
          <Route path="/my-blogs/:id" element={<MyBlogs />} />
          <Route path="/edit-blog/:id" element={<EditPost />}/>
          <Route path="/my-favorite-blogs/:id" element={<MyLikeBlogs/>}/>

        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
