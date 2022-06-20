
module.exports = {
    format_date: (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear}`
    },
    check_user: (pageUser) => {
        let myPage = (pageUser === req.session.userId);
        return myPage
    }
}
