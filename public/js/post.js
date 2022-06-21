// Comment box display logic

const commentBtn = document.querySelector('#comment-btn');
const commentBox = document.querySelector('#comment-box')

commentBtn.addEventListener('click', () => {
    commentBox.style.display = "block"
})

const cancelBtn = document.querySelector('#cancel-btn')

cancelBtn.addEventListener('click', () => {
    commentBox.style.display = "none"
})


// Mark Complete / Incomplete logic

const completeBtn = document.querySelector('#complete-button');

const changeCompleteVal = async(newStatus) => {
    
    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1 ];
    
    console.log(newStatus)
    console.log(postId)
    const res = await fetch('/api/post', {
        method: 'PUT',
        body: JSON.stringify({newStatus, postId}),
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok) {
        window.location.reload()
    } else {
        alert(response.statusText)
    }
}


// if setting to complete, new status is true, if setting to incomplete, new status false

completeBtn.addEventListener('click', () => {
    let newStatus = false;
    if(completeBtn.value == 'incomplete') {
        newStatus = true;
    }
    changeCompleteVal(newStatus)
})