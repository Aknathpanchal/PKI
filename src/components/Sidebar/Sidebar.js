/*eslint-disable*/
import { useState } from "react";
import {
  NavLink as NavLinkRRD,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { toastify } from "common/helpers/toast";

import { ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toastify({ msg: "Logged Out Successfully!", type: "sucess" });
    navigate("/auth/login");
  };

  const toggleCollapse = () => setCollapseOpen((data) => !data);
  const closeCollapse = () => setCollapseOpen(false);

  const isActiveRoute = (routePath) => pathname === routePath;
  //sidebar dropdown
  

  // const createLinks = (routes) =>
  //   routes
  //     .filter((item) => item.layout.includes(pathname.split("/")[1]))
  //     .map((prop, key) => {
  //       const fullPath = prop.layout + prop.path;
  //       const isActive = isActiveRoute(fullPath);

  //       return (
  //         <NavItem key={key} className="sidebar-nav">
  //           <NavLink
  //             to={fullPath}
  //             tag={NavLinkRRD}
  //             onClick={closeCollapse}
  //             className={isActive ? "active" : ""}
  //             style={{
  //               display: "flex",
  //               alignItems: "center", 
  //               gap: "8px",
  //               whiteSpace: "nowrap", 
  //               ...(isActive
  //                 ? {
  //                     background:
  //                       "linear-gradient(130.7deg, #E21B23 0%, #6D0002 100%)",
  //                     color: "white",
  //                     borderRadius: "0.375rem",
  //                     margin: "0.25rem 0",
  //                   }
  //                 : {}),
  //             }}
  //           >
  //             {prop.icon}
  //             {prop.name}
  //           </NavLink>
  //         </NavItem>
  //       );
  //     });


  // const createLinks = (routes) => {
  //   const filteredRoutes = routes.filter((item) => item.layout.includes(pathname.split("/")[1]));
  
  //   return filteredRoutes.map((prop, key) => {
  //     const fullPath = prop.layout + prop.path;
  //     const isActive = isActiveRoute(fullPath);
  
  //     return (
  //       <div key={key}>
  //         {/* Divider after Logo (only before first route) */}
  //         {key === 0 && (
  //           <hr style={{ borderTop: "1px solid white", margin: "1rem 0" }} />
  //         )}
  
  //         {/* Render NavItem */}
  //         <NavItem className="sidebar-nav">
  //           <NavLink
  //             to={fullPath}
  //             tag={NavLinkRRD}
  //             onClick={closeCollapse}
  //             className={isActive ? "active" : ""}
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               gap: "8px",
  //               whiteSpace: "nowrap",
  //               ...(isActive
  //                 ? {
  //                     background:
  //                       "linear-gradient(130.7deg, #E21B23 0%, #6D0002 100%)",
  //                     color: "white",
  //                     borderRadius: "0.375rem",
  //                     margin: "0.25rem 0",
  //                   }
  //                 : {}),
  //             }}
  //           >
  //             {prop.icon}
  //             {prop.name}
  //           </NavLink>
  //         </NavItem>
  
  //         {/* Divider after 4th route */}
  //         {key === 3 && (
  //           <hr style={{ borderTop: "1px solid white", margin: "1rem 0" }} />
  //         )}
  //       </div>
  //     );
  //   });
  // };

  const [reportsOpen, setReportsOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);

 

  const toggleReports = () => {
    setReportsOpen((prev) => !prev);
  };

  const toggleBilling = () => {
    setBillingOpen((prev) => !prev);
  };

  const toggleDeveloper = () => {
    setDeveloperOpen((prev) => !prev);
  };

  const createLinks = (routes) => {
    const filteredRoutes = routes.filter((item) =>
      item.layout?.includes(pathname.split("/")[1])
    );

    return filteredRoutes.map((route, index) => {
      const fullPath = route.layout + route.path;
      const isActive = isActiveRoute(fullPath);

      // Render collapsible dropdown if route has children
      if (route.children) {
        let toggleFn;
        if (route.name === "Reports") toggleFn = toggleReports;
        else if (route.name === "Billing") toggleFn = toggleBilling;
        else if (route.name === "Developer Section") toggleFn = toggleDeveloper;
      

        return (
          <div key={index}>
            <NavItem onClick={toggleFn} style={{ cursor: "pointer" }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                  padding: "0.5rem 1rem",
                 
                }}
              >
                {route.icon}
                {route.name}
                <span style={{ marginLeft: "auto" }}>
  {(route.name === "Reports" && reportsOpen) ||
  (route.name === "Billing" && billingOpen) ||
  (route.name === "Developer Section" && developerOpen) ? (
    <ChevronDown size={16} />
  ) : (
    <ChevronRight size={16} />
  )}
</span>

              </span>
            </NavItem>

            {/* Dropdown children - render only if open */}
            {
            (reportsOpen && route.name === "Reports") ||
            (billingOpen && route.name === "Billing") ||
            (developerOpen && route.name === "Developer Section")
              ? route.children.map((child, idx) => {
                  const childPath = route.layout + child.path;
                  const isChildActive = isActiveRoute(childPath);

                  return (
                    <NavItem key={`${index}-${idx}`} className="sidebar-sub-nav">
                      <NavLink
                        to={childPath}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        className={isChildActive ? "active" : ""}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "0.5rem 1rem", // ✅ Consistent padding
                          paddingLeft: "2.5rem", // ✅ Indent for sub-menu
                          whiteSpace: "nowrap",
                          ...(isChildActive
                            ? {
                                background:
                                  "linear-gradient(130.7deg, #E21B23 0%, #6D0002 100%)",
                                color: "white",
                                borderRadius: "0.375rem",
                                margin: "0.25rem 0",
                              }
                            : {}),
                        }}
                      >
                        {child.name}
                      </NavLink>
                    </NavItem>
                  );
                })
              : null}
          </div>
        );
      }

      // Standard non-dropdown route
      return (
        <NavItem key={index} className="sidebar-nav">
          <NavLink
            to={fullPath}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            className={isActive ? "active" : ""}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
              padding: "0.5rem 1rem",
              
              ...(isActive
                ? {
                    background:
                      "linear-gradient(130.7deg, #E21B23 0%, #6D0002 100%)",
                    color: "white",
                    borderRadius: "0.375rem",
                    margin: "0.25rem 0",
                    
                    
                  }
                : {}),
            }}
          >
            {route.icon}
            {route.name}
          </NavLink>
        </NavItem>
      );
    });
  };
  
  

  const { routes, logo } = props;
  let navbarBrandProps;

  if (logo?.innerLink) {
    navbarBrandProps = { to: logo.innerLink, tag: Link };
  } else if (logo?.outterLink) {
    navbarBrandProps = { href: logo.outterLink, target: "_blank" };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-dark"
      expand="lg"
      id="sidenav-main"
      style={{
        background:
          "linear-gradient(170.56deg, #626262 0%, #292929 22.61%, #474747 54.08%, #000000 100%)",
      }}
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {logo && (
          <NavbarBrand className="" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        )}

        <Nav className="align-items-center d-lg-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav> 
              <Media className="border rounded border-white p-2">
                <span className="mb-0 text-sm text-white font-weight-bold">
                  {props?.user?.username || "User"}
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <Collapse navbar isOpen={collapseOpen} style={{}}>
          <div className="navbar-collapse-header d-lg-none align-start">
            <Row>
              {logo && (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              )}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
