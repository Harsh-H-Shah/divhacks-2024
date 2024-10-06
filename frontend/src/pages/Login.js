import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Here you would typically verify the OTP with your backend
    message.success('Login successful!');
  };

  const sendOTP = (values) => {
    console.log('Sending OTP to:', values.phone);
    // Here you would typically send the OTP to the user's phone
    message.success('OTP sent successfully!');
    setOtpSent(true);
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '40px 0',
    },
    authContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '40px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
      color: '#333333',
      textAlign: 'center',
      marginBottom: '24px',
    },
    input: {
      backgroundColor: '#ffffff',
      border: '1px solid #d9d9d9',
      borderRadius: '2px',
      color: '#333333',
    },
    button: {
      width: '100%',
      height: '40px',
      backgroundColor: '#333333',
      border: 'none',
      borderRadius: '2px',
      color: '#ffffff',
      fontWeight: 'bold',
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '16px',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.authContainer}>
        <Title level={2} style={styles.title}>Login</Title>
        <Form
          name="login_form"
          onFinish={otpSent ? onFinish : sendOTP}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
              style={styles.input}
            />
          </Form.Item>
          {otpSent && (
            <Form.Item
              name="otp"
              rules={[{ required: true, message: 'Please input the OTP!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="Enter OTP"
                style={styles.input}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              {otpSent ? 'Verify OTP' : 'Send OTP'}
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