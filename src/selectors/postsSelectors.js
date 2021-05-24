import { createSelector } from "reselect";

 const allPostsSelector = state => state.postsBranch.posts;
 const showFilteredPostsSelector = state => state.postsBranch.showFilteredPosts;

 const filteredPostsSelector = createSelector(
  allPostsSelector,
  showFilteredPostsSelector,
  (posts, showFilteredPosts) => posts.filter(post => post.userId == showFilteredPosts)
);

const postInfoSelector = (state, id) => state.postsBranch.posts.find(post => post.id == id);

export {
  allPostsSelector,
  showFilteredPostsSelector,
  filteredPostsSelector,
  postInfoSelector
};