import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ProfileOutlined,
  LogoutOutlined,
  CopyOutlined,
  // UnorderedListOutlined,
  SettingOutlined,
  ShoppingOutlined,
  ShopOutlined,
  TagOutlined,
  AuditOutlined,

  
} from "@ant-design/icons";
import "../../styles/DefaultLayout.css";
import { Badge, IconButton } from "@mui/material";
const { Header, Sider, Content } = Layout;
const handleLogout = () => {
    localStorage.removeItem("token");
}
const menus = [
  {
      key: 'shop',
      icon: <ShopOutlined />,
      label: <Link to="/">Shop</Link>,
  },
  // {
  //     key: 'items',
  //     icon: <UnorderedListOutlined />,
  //     label: <Link to="/items">Items</Link>
  // },
  {
      key: 'setting',
      icon: <SettingOutlined />,
      label: 'Setting',
      children: [
          {
              key: 'product',
              icon: <ShoppingOutlined />,
              label: <Link to="/listproducts">Product</Link>,
          },
          {
              key: 'tag',
              icon: <TagOutlined />,
              label:<Link to="/listtag">Tag</Link>,
          },
          {
              key: 'category',
              icon: <CopyOutlined />,
              label: <Link to="/listcategory">Category</Link>
          },
          {
              key: 'address',
              icon: <AuditOutlined />,
              label: <Link to="/listaddress">Address</Link>,
          },    
      ]
    },
    {
      key: 'transaksi',
      icon: <ProfileOutlined />,
      label: <Link to="/report">Transaction</Link>
    },    
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <Link to="/login" onClick={handleLogout}>Logout</Link>
    },
]
  const DefaultLayout = ({children}) => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(
      !collapsed
    );
  };
  //to get localstorage data

  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h1 className="text-center text-2xl text-light font-bold mt-4">POS</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
            items={menus}
            className="my-12 text-white font-bold"
          >
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0}}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <IconButton color="inherit" 
            onClick={() => navigate('/cartpage')}
            >
                <ShoppingCartIcon className="text-white mx-3"/>
            </IconButton>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  
}

export default DefaultLayout;
