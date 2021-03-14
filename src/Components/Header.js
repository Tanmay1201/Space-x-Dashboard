import logo from "./spacexlogo2.jpg"
import "./Header.css"
const Header = () => {
    return (
        <>
            <div id="header">
                <img src={logo} width="17%;" height="100px" alt="logo"/>
            </div>
            <hr />
        </>
    );
}

export default Header;