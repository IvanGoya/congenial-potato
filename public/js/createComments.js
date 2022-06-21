const submitComment = document.querySelector('#submit-comment')
const newComment = async(event) => {
    
    event.preventDefault();
    const comment_body = document.querySelector('#comment-contents').value.trim()
    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1 ];
    if (comment_body) {
        const res = await fetch('/api/comment-routes/', {
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

document.querySelector("#submit-comment").addEventListener('click', newComment)