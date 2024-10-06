import React from 'react';
import { Form, Input, Button, Typography, InputNumber, Select, Upload, Space } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, FileOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

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
      backgroundColor: '#ffffff',
      padding: '40px 0',
    },
    authContainer: {
      width: '100%',
      maxWidth: '600px',
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
    certificateRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '10px',
    },
    certificateInput: {
      width: '100%',
    },
    certificateUpload: {
      width: '30%',
    },
    removeButton: {
      color: '#ff4d4f',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.authContainer}>
        <Title level={2} style={styles.title}>Sign Up</Title>
        <Form
          name="signup_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <InputNumber
              style={{ ...styles.input, width: '100%' }}
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              style={styles.input}
              prefix={<UserOutlined />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input
              style={styles.input}
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="bio"
            label="Bio (200 words)"
          >
            <TextArea
              style={styles.input}
              placeholder="Tell us about yourself"
              maxLength={200}
              showCount
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="skills"
            label="Skills"
          >
            <Select
              mode="tags"
              style={styles.input}
              placeholder="Select or type your skills"
            />
          </Form.Item>

          <Form.Item
            name="education"
            label="Education"
          >
            <Input
              style={styles.input}
              placeholder="Your highest education"
            />
          </Form.Item>

          <Form.List name="certificates">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={styles.certificateRow} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      style={styles.certificateInput}
                    >
                      <Input placeholder="Certificate Title" style={styles.input} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'file']}
                      style={styles.certificateUpload}
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
                  <Button type="dashed" onClick={() => add()} block>
                    Add Certificate
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;