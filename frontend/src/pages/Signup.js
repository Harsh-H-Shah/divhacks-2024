import React from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  InputNumber,
  Select,
  Upload,
  Space,
  Divider,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  FileOutlined,
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
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '16px',
    },
    skillInput: {
      width: '45%',
    },
    skillLevel: {
      width: '45%',
    },
    removeButton: {
      color: '#e53e3e',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.authContainer}>
        <Title level={2} style={styles.title}>
          Join Our Community
        </Title>
        <div
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#4a5568',
          }}
        >
          Already have an account?{' '}
          <a href="/login" style={{ color: '#4299e1', fontWeight: 'bold' }}>
            Log in
          </a>
        </div>
        <Form name="signup_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <InputNumber
              style={{ ...styles.input, width: '100%' }}
              prefix={<PhoneOutlined />}
              placeholder="Your phone number"
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              style={styles.input}
              prefix={<UserOutlined />}
              placeholder="Your full name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              style={styles.input}
              prefix={<MailOutlined />}
              placeholder="Your email address"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                min: 8,
                message: 'Password must be at least 8 characters long',
              },
            ]}
          >
            <Input.Password
              style={styles.input}
              prefix={<LockOutlined />}
              placeholder="Create a strong password"
            />
          </Form.Item>

          <Divider />

          <Form.Item name="bio" label="Bio (200 words)">
            <TextArea
              style={{ ...styles.input, height: 'auto' }}
              placeholder="Tell us about yourself"
              maxLength={200}
              showCount
              rows={4}
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
                        {
                          required: true,
                          message: 'Please input skill or delete this field.',
                        },
                      ]}
                      style={styles.skillInput}
                    >
                      <Input placeholder="Skill" style={styles.input} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'level']}
                      rules={[
                        {
                          required: true,
                          message: 'Please select skill level.',
                        },
                      ]}
                      style={styles.skillLevel}
                    >
                      <Select style={styles.input} placeholder="Skill Level">
                        <Option value="basic">Basic</Option>
                        <Option value="intermediate">Intermediate</Option>
                        <Option value="advanced">Advanced</Option>
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={styles.removeButton}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Skill
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item name="education" label="Education">
            <Input style={styles.input} placeholder="Your highest education" />
          </Form.Item>

          <Form.List name="certificates">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={styles.skillRow} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      style={styles.skillInput}
                    >
                      <Input
                        placeholder="Certificate Title"
                        style={styles.input}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'file']}
                      style={styles.skillLevel}
                    >
                      <Upload>
                        <Button icon={<FileOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={styles.removeButton}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Certificate
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
