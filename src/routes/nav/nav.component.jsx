import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import "./nav.styles.scss";

const Nav = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link to={'/'} className="logo-container">
                    <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to={'/shop'}>
                        SHOP
                    </Link>
                    <Link className="nav-link" to={'/sign-in'}>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Nav;