const NavBar = ({adress}) => {

    return (
        <div className="navbar-container">
            <div className="navbar">
                <div>Home</div>
                <div>My Profile</div>
            </div>
            <div className="user-account">
                Welcome {adress}
            </div>
        </div>
    )
}


export default NavBar;