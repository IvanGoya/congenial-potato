// Modal stuff

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');
const submitBtn = document.querySelector('#submitBtn');
const deleteBtn = document.querySelector('#delete-button');
const commentBtn = document.querySelector('#comment-btn');
const commentBox = document.querySelector('#comment-box')
console.log("jnaskdjn");
openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

submitBtn.addEventListener('click', () => {
    signupFormHandler();
})

deleteBtn.addEventListener('click', () => {
    deletePostHandler();
})

commentBtn.addEventListener('click', () => {
    console.log("alsjkndlak");
    commentBox.style.display = "block"
})



// Format Date logic will go below