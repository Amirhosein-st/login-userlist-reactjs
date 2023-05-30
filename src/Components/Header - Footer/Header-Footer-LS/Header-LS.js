import { Link } from 'react-router-dom';

function HeaderLS() {
    const userName = JSON.parse(localStorage.getItem('User-Name'));

    return (
        <>
        <p>login / sign up</p>
        </>
    )
}

export default HeaderLS;