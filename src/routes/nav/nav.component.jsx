import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectIsCartOpen } from "../../redux/cart/cart.selector";
import { userSelector } from "../../redux/user/user.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./nav.styles";

const Nav = () => {
    const currentUser = useSelector(userSelector);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to={'/'}>
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to={'/shop'}>
                        SHOP
                    </NavLink>
                    {
                        !currentUser ?
                            (<NavLink to={'/auth'}>
                                SIGN IN
                            </NavLink>)
                            :
                            (<NavLink as={`span`} onClick={signOutHandler}>
                                SIGN OUT
                            </NavLink>)

                    }
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen &&
                    <CartDropdown />
                }
            </NavigationContainer>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Nav;