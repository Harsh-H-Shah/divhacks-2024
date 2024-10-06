import React from 'react';
import { Layout, Menu, Button, Typography, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Landing = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">Logo</div>
        <Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ flexGrow: 1 }}>
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="services">Services</Menu.Item>
          <Menu.Item key="contact">Contact</Menu.Item>
          <Menu.Item key="about">About</Menu.Item>
        </Menu>
        <Button type="primary">Get Started</Button>
      </Header>

      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={1}>Welcome to Our Web3 Tutoring Platform</Title>
        <Paragraph>Connecting learners and tutors in a decentralized world.</Paragraph>
        
        {/* Illustration placeholder */}
        <div style={{ height: '300px', backgroundColor: '#e6f7ff', marginBottom: '20px' }}>
          {/* Add illustration here */}
        </div>

        <Button type="primary" size="large" style={{ marginBottom: '40px' }}>Get Started</Button>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Title level={4}>Decentralized Learning</Title>
            <Paragraph>Experience the future of education with blockchain technology.</Paragraph>
          </Col>
          <Col span={8}>
            <Title level={4}>Secure Transactions</Title>
            <Paragraph>Utilize our custom currency for safe and fast payments.</Paragraph>
          </Col>
          <Col span={8}>
            <Title level={4}>Innovative Tutoring</Title>
            <Paragraph>Join a community of forward-thinking educators and learners.</Paragraph>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Made by Seawolves
      </Footer>
    </Layout>
  );
};

export default Landing;