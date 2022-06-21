const commentBtn = document.querySelector('#comment-btn');
const commentBox = document.querySelector('#comment-box')

commentBtn.addEventListener('click', () => {
    commentBox.style.display = "block"
})

const cancelBtn = document.querySelector('#cancel-btn')

cancelBtn.addEventListener('click', () => {
    commentBox.style.display = "none"
})
