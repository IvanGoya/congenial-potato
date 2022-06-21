// Modal stuff

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');

openModal.addEventListener('click', () => {
    modal.showModal();
});

closeModal.addEventListener('click', () => {
    modal.close();
});

function getRadio() {
  console.log('getting here')
  const radioOptions = document.getElementsByName('type');
  console.log(radioOptions)
  for(let i=0; radioOptions.length > i; i++) {
    if(radioOptions[i].checked) {
      return radioOptions[i].value;
    }
  }
  return;
}


const newFormHandler = async (event) => {
    // event.preventDefault();
    
    let post_type = getRadio() 
    console.log(post_type)
  
    const title = document.querySelector('#modal-title').value.trim();
    const post_body = document.querySelector('#modal-desc').value.trim();
    const completed = false;

    if (title && post_body && post_type) {
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

  document.querySelector(".new-post-button").addEventListener("click", () => {
    newFormHandler();
  });
  

