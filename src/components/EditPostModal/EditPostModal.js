import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import React from 'react';

import "./editPostModal.css";
import postImage from "../../images/post-image.jpg";

const EditPostModal = props => {
  const { updatePostThunk, handleClose } = props;
  const { userId, id, title, body } = props.openedPost;

  const [changedBody, setChangedBody] = useState(body);
  const [changedTitle, setChangedTitle] = useState(title);

  const saveChanges = () => {
    updatePostThunk({
      userId,
      id,
      title: changedTitle,
      body: changedBody
    });
    handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <form>
          <Modal.Body>
            <img src={postImage} className="card-img-top" alt="..."/>
            <div className="form-group">
              <textarea onChange={event => setChangedTitle(event.target.value)} className="form-control title" rows="3">{changedTitle}</textarea>
              <textarea onChange={event => setChangedBody(event.target.value)} className="form-control" rows="15">{changedBody}</textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditPostModal;