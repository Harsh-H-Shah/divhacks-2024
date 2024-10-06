import React from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Space,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MinusCircleOutlined,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Signup = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
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
      maxWidth: '600px',
      padding: '48px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    },
    title: {
      color: '#1a202c',
      textAlign: 'center',
      marginBottom: '32px',
      fontSize: '32px',
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
    skillRow: {
      display: 'flex',
      marginBottom: '16px',
      gap: '16px',
    },
    skillInput: {
      flex: 1,
    },
    skillLevel: {
      width: '140px',
    },
    removeButton: {
      color: '#e53e3e',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.authContainer}>
        <Title level={2} style={styles.title}>
          Sign Up
        </Title>
        <Form name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: 'Please input your full name!' },
              {
                pattern: /^[a-zA-Z\s]{2,50}$/,
                message:
                  'Name should contain only letters and spaces, 2-50 characters long',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
              {
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              {
                pattern: /^\+?[1-9]\d{1,14}$/,
                message: 'Please enter a valid phone number!',
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
              style={styles.input}
            />
          </Form.Item>

          <Form.List name="skills">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={styles.skillRow} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'skill']}
                      rules={[
                        { required: true, message: 'Please input skill or delete this field' },
                        { pattern: /^[a-zA-Z\s]{2,30}$/, message: 'Skill should contain only letters and spaces, 2-30 characters long' }
                      ]}
                      style={styles.skillInput}
                    >
                      <Input placeholder="Skill" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'level']}
                      rules={[{ required: true, message: 'Please select skill level' }]}
                      style={styles.skillLevel}
                    >
                      <Select placeholder="Level">
                        <Option value="beginner">Beginner</Option>
                        <Option value="intermediate">Intermediate</Option>
                        <Option value="advanced">Advanced</Option>
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} style={styles.removeButton} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Skill
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            name="bio"
            rules={[
              { required: true, message: 'Please input your bio!' },
              { max: 500, message: 'Bio should not exceed 500 characters' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Tell us about yourself"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
