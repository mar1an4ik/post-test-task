import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./postInfo.css"
import postImage from "../../images/post-image.jpg";
import { postInfoSelector } from "../../selectors";
import { getAllPostsThunk, getCommentsThunk } from "../../reducers/PostsReducer";

const PostInfo = props => {
  const { allPosts, comments, postInfo } = props;
  const { getAllPostsThunk, getCommentsThunk } = props;

  useEffect(() => {
    !allPosts.length  && getAllPostsThunk();
    getCommentsThunk(props.match.params.id);
  },[]);

  const renderComment = item => {
    const { name, email, body } = item;

    return (

      <div className="card mb-3" id="comment">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{body}</p>
          <h6>{email}</h6>
        </div>
      </div>
    )
  };

  return (
    <div>
      {allPosts.length && <div className="card mb-3">
        <img src={postImage} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{postInfo.title}</h5>
          <p className="card-text">{postInfo.body}</p>
          <p className="card-id"><small className="text-muted">#{postInfo.id}</small></p>
        </div>
        <div className="row">
          {comments.map(renderComment)}
        </div>
      </div>}

    </div>
  )
};

let mapStateToProps = (state, props) => {
  return {
    allPosts: state.postsBranch.posts,
    comments: state.postsBranch.postDetail,
    postInfo: postInfoSelector(state, props.match.params.id)
  }
};

const mapDispatchToProps = {
  getCommentsThunk,
  getAllPostsThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
