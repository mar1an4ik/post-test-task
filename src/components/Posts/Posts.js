import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Pagination from "../Pagination";
import "./posts.css"
import EditPostModal from "../EditPostModal/EditPostModal";
import CreatePostModal from "../CreatePostModal";
import postImage from "../../images/post-image.jpg";
import { createPostThunk, deletePostThunk, getAllPostsThunk, updatePostThunk } from "../../reducers/PostsReducer";
import { filteredPostsSelector } from "../../selectors";
import { getAllPosts, getFilteredPosts } from "../../actions";

const Posts = props => {
  //Paginator Info
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.allPosts?.slice(indexOfFirstPost, indexOfLastPost);
  //change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const [filterUserId, setId] = useState("");
  const [showFilteredPosts, setShowFilteredPosts] = useState(false);

  const isEditModalOpened = window.location.href.includes("edit");
  const [isOpenedEditModal, setOpenedEditModal] = useState(isEditModalOpened);

  const isCreateModalOpened = window.location.href.includes("create");
  const [isOpenedCreateModal, setOpenedCreateModal] = useState(isCreateModalOpened);

  const closeEditModal = () => {
    window.history.replaceState(null, null, "/")
    setOpenedEditModal(false);
  };
  const closeCreateModal = () => {
    window.history.replaceState(null, null, "/");
    setOpenedCreateModal(false);
  };

  const showEditModal = post => {
    setOpenedEditModal(true);
    props.history.push(`/edit/${post.id}`);
  };

  const showCreateModal = () => {
    setOpenedCreateModal(true);
    props.history.push(`/create`);
  };

  useEffect(() => {
    props.allPosts.length <= 2 && props.getAllPostsThunk();
  },[]);

  const renderEditModal = () => {
    const openedPost = props.allPosts.find(post => post.id == props.match.params.id);

    return (
      <EditPostModal
        updatePostThunk={props.updatePostThunk}
        openedPost={openedPost}
        show={isOpenedEditModal}
        handleClose={closeEditModal}
      />)
  };

  const renderCreateModal = () => {
    return (
      <CreatePostModal
        createPostThunk={props.createPostThunk}
        show={isOpenedCreateModal}
        handleClose={closeCreateModal}
      />)
  };

  const renderPost = post => {
    const { id, title, body } = post;

    return (
      <div className="card mb-3" key={title}>
        <img src={postImage} className="card-img-top" alt="Post image"/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
            <div className="card-buttons">
              <button onClick={()=>props.deletePostThunk(id)} type="button" className="btn btn-primary m-2">Delete</button>
              <button onClick={() => props.history.push(`/post/${id}`)} type="button" className="btn btn-primary m-2">Open</button>
              <button onClick={()=>showEditModal(post)} type="button" className="btn btn-primary m-2">Edit</button>
            </div>
            <p className="card-id"><small className="text-muted">#{id}</small></p>
          </div>
      </div>
    )
  };

  const filterPosts = event => {
    event.preventDefault();
    if (filterUserId === "") {
      setShowFilteredPosts(false);
      props.getFilteredPosts(null);
      return;
    }
    props.getFilteredPosts(filterUserId);
    setShowFilteredPosts(true);
  };

  const renderInputFilter = () => {
    return (
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          <input value={filterUserId} onChange={event => {setId(event.target.value)}} className="form-control mr-sm-2" type="search" placeholder="Enter User id" aria-label="Search"/>
          <button onClick={filterPosts} className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
          <button onClick={showCreateModal} type="button" className="btn btn-primary m-2">Create new post</button>
        </form>
      </nav>
    )
  };

  const renderFilteredPosts = () => {
    return (
      props.filteredPosts?.length ? props.filteredPosts.map(renderPost) : <div> No posts by user with this id </div>
    )
  };

  return (
    props.allPosts.length
    ?
      <div className="posts-page">
        {renderInputFilter()}
        {
          showFilteredPosts ? renderFilteredPosts() : currentPosts.map(renderPost)
        }
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={props.filteredPosts?.length || showFilteredPosts ?  props.filteredPosts.length : props.allPosts.length}
          paginate={paginate}
        />
        {isOpenedEditModal && renderEditModal()}
        {isOpenedCreateModal && renderCreateModal()}
      </div>
    :
      <div>Loading</div>
  )
};

let mapStateToProps = state => {

  return {
    allPosts: state.postsBranch.posts,
    filteredPosts: filteredPostsSelector(state)
  }
};

const mapDispatchToProps = {
  getAllPosts,
  getAllPostsThunk,
  getFilteredPosts,
  updatePostThunk,
  deletePostThunk,
  createPostThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
