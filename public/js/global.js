// Modal stuff

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');
const submitBtn = document.querySelector('#submitBtn');
const deleteBtn = document.querySelector('#delete-button');

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
    console.log('delete-button');
    deletePostHandler();
})
