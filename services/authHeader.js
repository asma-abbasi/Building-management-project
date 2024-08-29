
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken, 'Content-type': 'application/json' };
    } else {
        return {};
    }
}
export default authHeader;