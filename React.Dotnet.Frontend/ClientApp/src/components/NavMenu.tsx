import React, { useEffect, useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Alert20Regular, Settings20Regular, Question20Regular } from '@fluentui/react-icons';
import { Avatar } from "@fluentui/react-components";
import { Link } from 'react-router-dom';
import http from '../services/HttpBase'
import '../styles/NavMenu.css';
import TokenService from '../services/TokenService';
import { AuthenticationResult } from '@azure/msal-browser';
import type { AvatarProps } from "@fluentui/react-components";

type NavMenuProps = {
	tokenService: TokenService
}

function NavMenu ({ tokenService }: NavMenuProps) {
	const { instance } = useMsal();
	const activeAccount = instance.getActiveAccount();
	const [userAvatar, setUserAvatar] = useState(null);
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const toggleNavbar = () => setCollapsed(!collapsed);

	const handleLoginRedirect = () => {
		instance.loginRedirect(loginRequest).catch((error) => console.log(error));
	};

	const handleLogoutRedirect = () => {
		instance.logoutRedirect().catch((error) => console.log(error));
	};

	useEffect(() => {
		tokenService.GetToken()
            .then((response: AuthenticationResult) => {
                return http.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
                    headers: {
                        Authorization: `Bearer ${response.accessToken}`
                    }
                })
                .then((response: any) => {
					setUserAvatar(response);
                })
                .catch((error: any) => {
                    throw Error(`An error occured calling the api: ${error}`);
                });
            })
            .catch((error: any) => {
                throw Error(`An error occured: ${error}`);
            });
	}, [tokenService]);

	return (
		<header>
			<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
				<Container className='nav-container'>
					<NavbarBrand tag={Link} to="/">React Dotnet API Demo</NavbarBrand>
					<NavbarToggler onClick={toggleNavbar} className="mr-2" />
					<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
						<ul className="navbar-nav flex-grow">
							
							<NavItem>
								<NavLink tag={Link} className="text-light" to="/">Home</NavLink>
							</NavItem>
							<AuthenticatedTemplate>
								<NavItem>
									<NavLink tag={Link} className="text-light" to="/counter">Counter</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-light" to="/weather-forecast">Fetch data</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-light">
										<Alert20Regular aria-label='Alerts' primaryFill='#fff' className='iconClass' />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-light">
										<Settings20Regular aria-label='Settings' primaryFill='#fff' className='iconClass' />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-light">
										<Question20Regular aria-label='Feedback' primaryFill='#fff' className='iconClass' />
									</NavLink>
								</NavItem>
								{/* <NavItem>
									<NavLink tag={Link} className="text-light" onClick={handleLogoutRedirect}>Sign out</NavLink>
								</NavItem> */}
								<NavItem>
									<NavLink tag={Link} className="text-light" onClick={handleLogoutRedirect}>
										{userAvatar && 
											<Avatar
												name={activeAccount?.name}
												image={{
													src: userAvatar,
												}}
											/>
										}
										{!userAvatar &&
											<NavLink tag={Link} className="text-light" onClick={handleLogoutRedirect}>Sign out</NavLink>
										}
									</NavLink>
								</NavItem>
							</AuthenticatedTemplate>
							<UnauthenticatedTemplate>
								<NavItem>
									<NavLink tag={Link} className="text-light" onClick={handleLoginRedirect}>Sign In</NavLink>
								</NavItem>
							</UnauthenticatedTemplate>
						</ul>
					</Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export { NavMenu };