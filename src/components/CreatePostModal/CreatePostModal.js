import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import React from 'react';

import postImage from "../../images/post-image.jpg";

const CreatePostModal = props => {
  const { createPostThunk, handleClose, show } = props;

  const [changedBody, setChangedBody] = useState("");
  const [changedTitle, setChangedTitle] = useState("");

  const createPost = () => {
    createPostThunk({
      title: changedTitle,
      body: changedBody,
      userId: 1
    });
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form>
          <Modal.Body>
            <img src={postImage} className="card-img-top" alt="Post image"/>
            <div className="form-group">
              <label>Title</label>
              <textarea onChange={event => setChangedTitle(event.target.value)} className="form-control title" rows="3">{changedTitle}</textarea>
              <label>Body</label>
              <textarea onChange={event => setChangedBody(event.target.value)} className="form-control" rows="15">{changedBody}</textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={createPost}>
              Create Post
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CreatePostModal;