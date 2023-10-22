import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode
};

const Layout: React.FC<LayoutProps> = (props) => {
    return (<div>
        <NavMenu />
        <Container>{props.children}</Container>
    </div>);
};

export default Layout;