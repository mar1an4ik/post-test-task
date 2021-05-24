import { createActions } from "redux-actions";

export const { getAllPosts, getFilteredPosts, getComments, updatePost, deletePost, createPost } = createActions({
  GET_ALL_POSTS: (post) => ({ post }),
  GET_FILTERED_POSTS: (userId) => ({ userId }),
  GET_COMMENTS: (comments) => ({ comments }),
  UPDATE_POST: (post) => ({ post }),
  DELETE_POST: (id) => ({ id }),
  CREATE_POST: (post) => ({ post })
});