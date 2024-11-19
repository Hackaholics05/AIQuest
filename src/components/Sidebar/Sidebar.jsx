import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaTags, FaBriefcase, FaStar, FaQuestion, FaBars } from "react-icons/fa";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(true); 
  const [isMobile, setIsMobile] = useState(false); 

  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full">
      {isMobile && (
        <button
          className="absolute top-4 left-4 text-gray-800 bg-gray-200 p-2 rounded-md z-50"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>
      )}

      <Sidebar
        collapsed={isMobile ? collapsed : false}
        backgroundColor="#f8f9fa"
        className={`h-full transition-transform duration-300 ${isMobile && collapsed ? "-translate-x-full" : "translate-x-0"}`}
        style={{
          borderRight: "1px solid #ddd",
          zIndex: 40,
          position: isMobile ? "fixed" : "relative",
        }}
      >
        <Menu>
          <MenuItem icon={<FaHome />} component={<Link to="/" />}>
            Home
          </MenuItem>

          <SubMenu label="PUBLIC" icon={<FaQuestion />}>
            <MenuItem component={<Link to="/questions" />}>Questions</MenuItem>
            <MenuItem component={<Link to="/tags" />}>Tags</MenuItem>
            <MenuItem component={<Link to="/users" />}>Users</MenuItem>
          </SubMenu>

          <MenuItem icon={<FaStar />} component={<Link to="/collectives" />}>
            Explore Collectives
          </MenuItem>

          <SubMenu label="FIND A JOB" icon={<FaBriefcase />}>
            <MenuItem component={<Link to="/jobs" />}>Jobs</MenuItem>
            <MenuItem component={<Link to="/companies" />}>Companies</MenuItem>
          </SubMenu>

          <MenuItem icon={<FaUsers />} component={<Link to="/teams" />}>
            Teams
          </MenuItem>
        </Menu>
      </Sidebar>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </div>
  );
};

export default SidebarComponent;
