import { configureStore } from '@reduxjs/toolkit';

import testReducer from '../slices/test/testSlice'
import userReducer from '../slices/user/userSlice'
import postReducer from '../slices/post/postSlice'
import postsReducer from '../slices/posts/postsSlice'

export default configureStore({
  reducer: {
    test: testReducer,
    user: userReducer,
    posts: postsReducer,
    post: postReducer
  },
});