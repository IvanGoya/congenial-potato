const newFormHandler = async (event) => {
    // event.preventDefault();
  
    const title = document.querySelector('#modal-title').value.trim();
    const post_body = document.querySelector('#modal-desc').value.trim();
    const post_type = document.querySelector('.modal-type').value
    const completed = false;

    console.log(post_type)
    if (title && post_body && post_type) {
      console.log(post_type)
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, post_body, post_type, completed }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create project');
      }
    }
  };

  const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document.querySelector('.new-post-button').addEventListener('click', () => {
    newFormHandler();
  });