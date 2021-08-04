// import action types
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';

// get post by particular id 
export const getPost = (id) => async (dispatch) => {
  try {
    // block of code to try 
    dispatch({ type: START_LOADING });
    // fetching post by specific id
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};
// get all posts
export const getPosts = (page) => async (dispatch) => {
  try {
    // block of code to try

    dispatch({ type: START_LOADING });

    // fetching all the posts according to page number
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });

  } catch (error) {
    //  block of code to handle errors
    console.log(error);
  }
};

// get posts by creator will return all the post created by specific user
export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    // block of code to try 
    dispatch({ type: START_LOADING });

    // fetching post by name
    const { data: { data } } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    // block of code to handle erros
    console.log(error);
  }
};

// get posts by search 
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    //  block of code to try 
    dispatch({ type: START_LOADING });

    // using search querry from users as a input to fetch all the posts
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    //  block of code to handle errors
    console.log(error);
  }
};

// create post 
export const createPost = (post, history) => async (dispatch) => {
  try {
    // block of code to run
    dispatch({ type: START_LOADING });
    // calling POST request to create post
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    history.push(`/posts/${data._id}`);
  } catch (error) {
    //  block of code to handle errors
    console.log(error);
  }
};

// update posts
export const updatePost = (id, post) => async (dispatch) => {
  try {
    // block of code to run 
    // calling Patch request to update 
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};

// like a post 
export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    // block of code to try 

    // one like per user so taking user id and checking auth token
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    // block of cocde to hanlde error
    console.log(error);
  }
};

// commnet on post
export const commentPost = (value, id) => async (dispatch) => {
  try {
    // block of code to try
    // calling api post method to post comments
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    // block of code to hanle errors
    console.log(error);
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    // block of code to try

    // callling delete method to delete post with id
    await await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    //  block of code to handle errors
    console.log(error);
  }
};
