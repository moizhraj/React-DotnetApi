import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import TokenService from '../services/TokenService';

interface Props {
    children?: React.ReactNode;
    tokenService: TokenService
};

const Layout = ({ children, tokenService }: Props) => {
    return (
        <div>
            <NavMenu tokenService={tokenService} />
            <Container>
                {children}
            </Container>
        </div>
    );
}

export { Layout };