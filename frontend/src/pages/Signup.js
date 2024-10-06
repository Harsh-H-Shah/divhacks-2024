import React from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Space,
  message,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const Signup = () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        username: values.username,
        email: values.email,
        password: values.password,
        profile: {
          skills: values.skills,
          education: values.education,
          bio: values.bio,
        },
      };
      console.log('Sending data:', formattedValues);
  
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      message.success('Signup successful!');

      navigate('/home');

    } catch (error) {
      console.error('Error during signup:', error);
      message.error('Signup failed. Please try again.');
    }
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
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              {
                pattern: /^[a-zA-Z0-9_]{3,20}$/,
                message: 'Username should be 3-20 characters long and can contain letters, numbers, and underscores',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
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
                min: 8,
                message: 'Password must be at least 8 characters long',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              style={styles.input}
            />
          </Form.Item>

          <Form.List name="skills">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} style={styles.skillRow} align="baseline">
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        { required: true, message: 'Please input a skill or delete this field' },
                      ]}
                      noStyle
                    >
                      <Input placeholder="Skill" style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined onClick={() => remove(field.name)} style={styles.removeButton} />
                    )}
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

          <Form.List name="education">
  {(fields, { add, remove }) => (
    <>
      {fields.map((field) => (
        <Space key={field.key} style={styles.skillRow} align="baseline">
          <Form.Item
            key={field.key}
            {...field}
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              { required: true, message: 'Please input a skill or delete this field' },
            ]}
            noStyle
          >
            <Input placeholder="Skill" style={{ width: '60%' }} />
          </Form.Item>
          {fields.length > 1 && (
            <MinusCircleOutlined onClick={() => remove(field.name)} style={styles.removeButton} />
          )}
        </Space>
      ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Education
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