module.exports = {
    format_date: date => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear}`
    }
}

function checkLoggedUser(pageId) {
    let myPage = (pageId === req.session.userId);
    return myPage
}