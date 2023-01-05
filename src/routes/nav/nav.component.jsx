import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./nav.styles.scss";

const Nav = () => {
    const { currentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

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
                    { 
                        !currentUser ? 
                        (<Link className="nav-link" to={'/auth'}>
                            SIGN IN
                        </Link>)
                        :
                        (<span className="nav-link" onClick={signOutHandler}>
                            SIGN OUT
                        </span>)

                    }
                </div>
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Nav;