const newFormHandler = async (event) => {
    // event.preventDefault();
  
    const title = document.querySelector('#modal-title').value.trim();
    const post_body = document.querySelector('#modal-desc').value.trim();

    if (title && post_body) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, post_body }),
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
  
  document.querySelector('.new-post-button').addEventListener('click', () => {
    newFormHandler();
  });