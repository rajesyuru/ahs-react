import React, { Fragment, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { setMenuState } from '../../redux/actions/menu';
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap';
import { MobileMenuIcon, MenuIcon } from '../../components/svg';

function NavBar({
    user,
    logout,
    history,
    menu,
    setMenuState
}) {
    const logoutHandler = (e) => {
        e.preventDefault();

        logout();
        history.push('/'); // redirect to home
    };

    const menuButtonClick = (e) => {
        e.preventDefault();

        if (menu) {
            setMenuState(false)
        } else {
            setMenuState(true)
        }
    };

    return (
        <Fragment>
            {user ? (
                <nav className="navbar fixed-top custom-navbar shadow-sm">
                    <div className="d-flex align-items-center navbar-left">
                        <NavLink
                            to="#"
                            location={{}}
                            className="menu-button d-none d-md-block"
                            onClick={menuButtonClick} >
                            <MenuIcon />
                        </NavLink>
                        <NavLink
                            to="#"
                            location={{}}
                            className="menu-button-mobile d-xs-block d-sm-block d-md-none ml-4"
                            onClick={menuButtonClick} >
                            <MobileMenuIcon />
                        </NavLink>
                    </div>
                    <NavLink className="navbar-logo" to="/">
                        <span className="logo-mobile d-block" />
                    </NavLink>

                    <div className="navbar-right">
                        <div className="user d-inline-block">
                            <UncontrolledDropdown className="dropdown-menu-right">
                                <DropdownToggle
                                    className="nav-profile-picture"
                                    color="empty">
                                    <span className="name mr-2 d-none d-md-inline">
                                        {user.name}
                                    </span>
                                    <span className="default-profile-picture">
                                        <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu className="" right>
                                    <DropdownItem onClick={logoutHandler}>
                                        Log out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </nav>
            ) : null}
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    menu: state.menu,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    setMenuState: (menu) => dispatch(setMenuState(menu)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
