import React, { useState } from 'react';
import { Layout, Card, Row, Col, Statistic, Typography, Form, Input, Button, Tag, Space, Avatar, Rate } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AppHeader from '../components/AppHeader';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const initialUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Experienced tutor specializing in STEM subjects. Passionate about helping students achieve their academic goals.',
  profilePicture: 'https://via.placeholder.com/150',
  skills: ['Mathematics', 'Physics', 'Chemistry'],
  monthlyEduPoints: [
    { month: 'Jan', points: 120 },
    { month: 'Feb', points: 130 },
    { month: 'Mar', points: 140 },
    { month: 'Apr', points: 150 },
    { month: 'May', points: 135 },
  ],
  averageRating: 4.8,
  contactNumber: '123-456-7890'
};

const Profile = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileSection, setIsProfileSection] = useState(true);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (values) => {
    setUserData({ ...userData, ...values });
    setIsEditing(false);
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <AppHeader isProfileSection={isProfileSection} />
        <Title level={2}>Tutor Profile Dashboard</Title>
        
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Avatar size={100} src={userData.profilePicture} icon={<UserOutlined />} />
                <Title level={3}>{userData.name}</Title>
                {isEditing ? (
                  <Form
                    initialValues={userData}
                    onFinish={handleSave}
                    layout="vertical"
                  >
                    <Form.Item name="bio" label="Bio">
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                      <Input />
                    </Form.Item>
                    <Form.Item name="contactNumber" label="Contact Number">
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <>
                    <Paragraph>{userData.bio}</Paragraph>
                    <Text strong>Email:</Text> <Text>{userData.email}</Text>
                    <Text strong>Contact:</Text> <Text>{userData.contactNumber}</Text>
                    <Button icon={<EditOutlined />} onClick={handleEdit}>
                      Edit Profile
                    </Button>
                  </>
                )}
              </Space>
            </Card>
          </Col>
          <Col span={16}>
            <Card title="Monthly EduPoints">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userData.monthlyEduPoints}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[100, 150]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="points" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card title="Skills">
              <Space wrap>
                {userData.skills.map((skill, index) => (
                  <Tag key={index} color="blue">{skill}</Tag>
                ))}
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Average Rating"
                value={userData.averageRating}
                precision={1}
                prefix={<Rate disabled defaultValue={userData.averageRating} />}
                suffix="/ 5"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total EduPoints (Last Month)"
                value={userData.monthlyEduPoints[userData.monthlyEduPoints.length - 1].points}
                suffix="points"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Profile;