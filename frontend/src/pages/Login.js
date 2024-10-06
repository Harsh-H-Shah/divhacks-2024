import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('Login successful!');
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '40px 0',
    },
    authContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '48px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    },
    title: {
      color: '#1a202c',
      textAlign: 'center',
      marginBottom: '32px',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      color: '#4a5568',
      height: '48px',
    },
    button: {
      width: '100%',
      height: '48px',
      backgroundColor: '#4299e1',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '16px',
      marginTop: '24px',
      transition: 'background-color 0.3s ease',
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '24px',
      color: '#4a5568',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.authContainer}>
        <Title level={2} style={styles.title}>Welcome Back</Title>
        <Form
          name="login_form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              style={styles.input}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              style={styles.input}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div style={styles.signupLink}>
          Don't have an account? <a href="/signup">Sign up now!</a>
        </div>
      </div>
    </div>
  );
};

export default Login;