import { handleActions } from 'redux-actions';

import { createPost, deletePost, getAllPosts, getComments, getFilteredPosts, updatePost } from "../actions";
import {
  handleCreatePostRequest,
  handleDeletePostRequest, handleGetCommentsRequest,
  handleGetPostsRequest,
  handleUpdatePostRequest
} from "../api";

const defaultState = {
  posts: [],
  showFilteredPosts: false,
  postDetail: [],
};

export const getAllPostsThunk = () => dispatch => {
  return handleGetPostsRequest().then(response => {
    dispatch(getAllPosts(response));
  });
};

export const getCommentsThunk = id => dispatch => {
  return handleGetCommentsRequest(id).then(response => {
    dispatch(getComments(response));
  });
};

export const updatePostThunk = post => dispatch => {
  return handleUpdatePostRequest(post).then(response => {
    dispatch(updatePost(response));
  });
};

export const deletePostThunk = id => dispatch => {
  handleDeletePostRequest(id).then(
    dispatch(deletePost(id))
  );
};

export const createPostThunk = (title, body, userId) => dispatch => {
  handleCreatePostRequest(title, body, userId).then(response => {
    dispatch(createPost(response))
  });
};

export const PostsReducer = handleActions(
  {
    [getAllPosts]: (state, { payload: { post } }) => {
      let statecopy = {...state};
      statecopy.posts = [...state.posts];
      statecopy.posts = post;

      return statecopy;
    },
    [getFilteredPosts]: (state, { payload: { userId } }) => {
      let statecopy = {...state};
      statecopy.showFilteredPosts = userId;

      return statecopy;
    },
    [getComments]: (state, { payload: { comments } }) => {
      let statecopy = {...state};
      statecopy.postDetail = [...state.postDetail];
      statecopy.postDetail = comments;

      return statecopy;
    },
    [updatePost]: (state, { payload: { post } }) => {
      let statecopy = {...state};
      statecopy.posts = [...state.posts];
      const index = statecopy.posts.findIndex((element)=>element.id == post.id);
      statecopy.posts[index] = post;

      return statecopy;
    },
    [deletePost]: (state, { payload: { id } }) => {
      let statecopy = {...state};
      statecopy.posts = [...state.posts];
      const index = statecopy.posts.findIndex((element)=>element.id == id) ;
      statecopy.posts.splice(index, 1);

      return statecopy;
    },
    [createPost]: (state, { payload: { post } }) => {
      let statecopy = {...state};
      statecopy.posts = [...state.posts];
      statecopy.posts.push({
        id:post.id,
        title:post.title.title,
        body:post.title.body,
        userId:post.title.userId
      });

      return statecopy;
    },
  }, defaultState
);

