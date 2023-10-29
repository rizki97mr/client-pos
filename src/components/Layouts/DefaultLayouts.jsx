import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ProfileOutlined,
  LogoutOutlined,
  CopyOutlined,
  SettingOutlined,
  ShoppingOutlined,
  ShopOutlined,
  TagOutlined,
  AuditOutlined,

  
} from "@ant-design/icons";
import "../../styles/DefaultLayout.css";
import { Badge, IconButton } from "@mui/material";
import { getCart } from "../../redux/feature/card/actions";
import axiosDriver from "../../config/axios";
const { Header, Sider, Content } = Layout;

const handleLogout = async (event) => {
  event.preventDefault();
  localStorage.removeItem("token");
  try {
    const response = await axiosDriver.post("http://localhost:3000/auth/logout", {
  });
  } catch (error) {
    console.log(error)
  }
}

const user = [
  {
    key: 'shop',
    icon: <ShopOutlined />,
    label: <Link to="/">Shop</Link>,
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

const menus = [
  {
      key: 'shop',
      icon: <ShopOutlined />,
      label: <Link to="/">Shop</Link>,
  },
  {
      key: 'setting',
      icon: <SettingOutlined />,
      label: 'Setting',
      children: [
          {
              key: 'product',
              icon: <ShoppingOutlined />,
              label: <Link to="/dataproducts">Product</Link>,
          },
          {
              key: 'tag',
              icon: <TagOutlined />,
              label:<Link to="/datatag">Tag</Link>,
          },
          {
              key: 'category',
              icon: <CopyOutlined />,
              label: <Link to="/datacategory">Category</Link>
          },
          {
              key: 'address',
              icon: <AuditOutlined />,
              label: <Link to="/dataaddress">Address</Link>,
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
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [isAdmin, setIsAdmin] = useState({});
    const carts = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();


    useEffect(() => {
      getMe();
      dispatch(getCart());
  }, [])

    useEffect(() => { 
      // console.log("layout", carts)
  }, [carts])

    const getMe = async () => {
      try {
          let response = await axiosDriver.get("http://localhost:3000/auth/me")
          setIsAdmin(response.data)
      } catch (e) {
          console.log(e.message)
      }
    }


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
            items={isAdmin.role === "admin" ? menus : user}
            className="my-12 text-white font-bold"
          >
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0}}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger text-white font-bold",
                onClick: toggle,
              }
            )}
            <h2 className="text-stone-100 text-lg font-semibold justify-center items-center">
              {isAdmin.email}
            </h2>
            <IconButton color="inherit" 
            onClick={() => navigate('/cart')}
            >
              <Badge badgeContent={carts.length} color="secondary" className="mr-3">
                <ShoppingCartIcon className="text-white "/>
              </Badge>
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
