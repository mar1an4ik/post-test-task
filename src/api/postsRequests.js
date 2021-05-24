  const handleGetPostsRequest = () => {
    try {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
      } catch (error) {
        alert("error" + error)
        return null;
      }
    };

  const handleGetCommentsRequest = id => {
    try {
      return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((response) => response.json())
      } catch (error) {
        alert("error" + error)
        return null;
      }
    };

  const handleUpdatePostRequest = post => {
    try {
      return fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
      } catch (error) {
        alert("error" + error)
        return null;
      }
    };

  const handleDeletePostRequest = id => {
    try {
      return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      alert("error" + error)
      return null;
    }
  };

  const handleCreatePostRequest = (title, body, userId) => {
    try {
      return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json());
      } catch (error) {
        alert("error" + error)
        return null;
      }
    };

  export {
    handleDeletePostRequest,
    handleGetCommentsRequest,
    handleUpdatePostRequest,
    handleGetPostsRequest,
    handleCreatePostRequest
  };
