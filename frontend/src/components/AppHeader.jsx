import React from 'react';
import { Layout, Input, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import Logo from '../assets/Logo.png';

const { Header } = Layout;
const { Search } = Input;

const AppHeader = () => {
  return (
    <Header
      style={{
        background: '#fff',
        padding: '0 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        height: '80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={Logo}
          alt="logo"
          style={{ height: '150px', marginRight: '40px' }}
        />
        <Space size="large">
          <Link to="/">
            <Button type="link">Home</Button>
          </Link>
          <Link to="/about">
            <Button type="link">About</Button>
          </Link>
          <Link to="/contact">
            <Button type="link">Contact Us</Button>
          </Link>
          <Link to="/sponsor">
            <Button type="link">Sponsor Us</Button>
          </Link>
        </Space>
      </div>
      <Search
        placeholder="Search for skills or services"
        style={{ width: '40%', maxWidth: '400px' }}
        enterButton={<SearchOutlined />}
      />
      <UserOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
    </Header>
  );
};

export default AppHeader;
