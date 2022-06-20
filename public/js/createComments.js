const newComment = async(event) => {
    event.preventDefault();

    const comment_body = document.querySelector('#commentContent').value.trim()
    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1 ];

    if (comment_body) {
        const res = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({comment_body, postId}),
            headers: {'Content-Type': 'application/json'}
        })
        console.log(res)
        if(res.ok) {
            window.location.reload()
        } else {
            alert(response.statusText)
        }
    }
};

document.addEventListener('submit', newComment)