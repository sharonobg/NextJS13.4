"use client";
import Link from "next/link";
import {Navbar,Container,Nav, NavDropdown} from "react-bootstrap";
import {usePathname} from "next/navigation";
export default function NavBar() {
    //const router = useRouter();
    const pathname = usePathname();
    return(
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    NextJS 13.4 Image Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/spending-plan" active={pathname === "/spending-plan"} >Spending Plan</Nav.Link>
                        <Nav.Link as={Link} href="/transactions" active={pathname === "/transactions"} >Transactions</Nav.Link>
                        <Nav.Link as={Link} href="/static" active={pathname === "/static"} >Images From Unsplash</Nav.Link>
                        <Nav.Link as={Link} href="/dynamic-fetch" active={pathname === "/dynamic-fetch"} >Dynamic Imageloading</Nav.Link>
                        <Nav.Link as={Link} href="/isr-incremental" active={pathname === "/isr-incremental"} >ISR</Nav.Link>
                        <NavDropdown title="Topics" id="topics-dropdown">
                            <NavDropdown.Item as={Link} href="/topics/health">Health</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/apples">Apples</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/fitness">Fitness</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} href="/search" active={pathname === "/search"} >Search</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

