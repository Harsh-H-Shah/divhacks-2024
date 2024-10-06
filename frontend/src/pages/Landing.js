import React from 'react';
import { Layout, Menu, Button, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import Logo from '../assets/Logo.png';
import LandingBG from '../assets/LandingBG.avif';
import blockchain from '../assets/blockchain.png';
import secure from '../assets/secure.png';
import education from '../assets/education.png';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Landing = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={styles.header}>
        <div style={styles.logo}>
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              style={{ height: '10vw', marginTop: '20px' }}
            />
          </Link>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={styles.menu}
        >
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="services">Services</Menu.Item>
          <Menu.Item key="contact">Contact</Menu.Item>
          <Menu.Item key="about">About</Menu.Item>
        </Menu>
        <Link to="/signup">
          <Button type="primary" style={styles.button}>
            Get Started
          </Button>
        </Link>
      </Header>

      <Content style={styles.content}>
        <div style={styles.heroSection}>
          <Title level={1} style={styles.mainTitle}>
            Welcome to ScholarShare
          </Title>
          <Paragraph style={styles.subtitle}>
            Earn while you learn, pay off your tuition with knowledge.
          </Paragraph>
          <Link to="/signup">
            <Button type="primary" size="large" style={styles.ctaButton}>
              Get Started
            </Button>
          </Link>
        </div>

        <Row gutter={[32, 32]} style={styles.featuresSection}>
          <Col xs={24} md={8}>
            <img
              src={blockchain}
              alt="Blockchain"
              style={{ width: '25vw', marginBottom: '20px' }}
            />
            <Title level={3} style={styles.featureTitle}>
              Decentralized Learning
            </Title>
            <Paragraph style={styles.featureDescription}>
              Experience the future of education with blockchain technology.
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <img
              src={secure}
              alt="Secure"
              style={{ width: '15vw', marginBottom: '20px' }}
            />
            <Title level={3} style={styles.featureTitle}>
              Secure Transactions
            </Title>
            <Paragraph style={styles.featureDescription}>
              Utilize EduPoints for safe and fast educational exchanges.
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <img
              src={education}
              alt="Education"
              style={{ width: '20vw', marginBottom: '20px' }}
            />
            <Title level={3} style={styles.featureTitle}>
              Innovative Tutoring
            </Title>
            <Paragraph style={styles.featureDescription}>
              Join a community of forward-thinking educators and learners.
            </Paragraph>
          </Col>
        </Row>
      </Content>

      <Footer style={styles.footer}>Made with ❤️ by Seawolves</Footer>
    </Layout>
  );
};

const styles = {
  header: {
    background: 'rgba(255, 255, 255, 0.8)',
    position: 'fixed',
    width: '100%',
    zIndex: 1,
    borderBottom: '2px solid #1890ff',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1890ff',
  },
  menu: {
    flexGrow: 1,
    background: 'transparent',
    border: 'none',
  },
  button: {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  content: {
    backgroundImage: `url(${LandingBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px 50px',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  mainTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '48px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  subtitle: {
    color: '#fff',
    fontSize: '24px',
    marginBottom: '40px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
  ctaButton: {
    fontSize: '18px',
    height: 'auto',
    padding: '12px 40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  featuresSection: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  featureTitle: {
    color: '#1890ff',
    marginBottom: '16px',
  },
  featureDescription: {
    fontSize: '16px',
  },
  footer: {
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    padding: '20px 0',
  },
};

export default Landing;
