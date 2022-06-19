const newFormHandler = async (event) => {
    event.preventDefault();
  
    const post = document.querySelector('.new-post-item').value.trim();

    if (post) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ postTitle }),
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