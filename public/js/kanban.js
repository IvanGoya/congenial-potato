const kanbanBoard = async(event) => {
    event.preventDefault();

    const kanban_body = document.querySelector('#kanbanContent').value.trim()
    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1 ];

    if (kanban_body) {
        const res = await fetch('/api/kanban/', {
            method: 'POST',
            body: JSON.stringify({kanban_body, postId}),
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

document.addEventListener('submit', kanbanBoard)