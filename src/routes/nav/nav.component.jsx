import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./nav.styles";

const Nav = () => {
    const { currentUser } = useContext(UserContext);
    const { showDropdown } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to={'/'}>
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to={'/shop'}>
                        SHOP
                    </NavLink>
                    { 
                        !currentUser ? 
                        (<NavLink  to={'/auth'}>
                            SIGN IN
                        </NavLink>)
                        :
                        (<NavLink as={`span`} onClick={signOutHandler}>
                            SIGN OUT
                        </NavLink>)

                    }
                    <CartIcon /> 
                </NavLinksContainer>
                {showDropdown &&
                    <CartDropdown />
                }
            </NavigationContainer>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Nav;