import React, { useState } from 'react';
import { Layout, List, Typography, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ServiceCard from '../components/ServiceCard';
import FilterSidebar from '../components/FilterSidebar';
import AppHeader from '../components/AppHeader';

import math from '../assets/math.jpeg';
import physics from '../assets/physics.jpeg';
import chemistry from '../assets/chemistry.jpeg';
import english from '../assets/english.jpeg';
import history from '../assets/history.jpeg';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

// Sample time series data for a single tutoring service
const timeSeriesData = [
  { week: 'Week 1', price: 50 },
  { week: 'Week 2', price: 55 },
  { week: 'Week 3', price: 60 },
  { week: 'Week 4', price: 58 },
];

// Dummy data for services
const dummyServices = [
  {
    id: 1,
    name: 'Advanced Math Tutoring',
    provider: 'John Doe',
    rating: 4.5,
    price: '$50/hr',
    image: 'https://via.placeholder.com/300',
    category: 'Mathematics',
    duration: '1 hour',
    img: math,
  },
  {
    id: 2,
    name: 'Physics Tutoring',
    provider: 'Jane Smith',
    rating: 4.0,
    price: '$40/hr',
    image: 'https://via.placeholder.com/300',
    category: 'Science',
    duration: '1 hour',
    img: physics,
  },
  {
    id: 3,
    name: 'English Literature Tutoring',
    provider: 'Alice Johnson',
    rating: 4.8,
    price: '$45/hr',
    image: 'https://via.placeholder.com/300',
    category: 'English',
    duration: '1 hour',
    img: english,
  },
  {
    id: 4,
    name: 'History Tutoring',
    provider: 'Bob Brown',
    rating: 4.2,
    price: '$35/hr',
    image: 'https://via.placeholder.com/300',
    category: 'History',
    duration: '1 hour',
    img: history,
  },
  {
    id: 5,
    name: 'Chemistry Tutoring',
    provider: 'Eve Davis',
    rating: 4.7,
    price: '$55/hr',
    image: 'https://via.placeholder.com/300',
    category: 'Science',
    duration: '1 hour',
    img: chemistry,
  }
];

const Home = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <FilterSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ padding: '24px' }}>
          <ServiceCard services={dummyServices} />
        </Content>
        <Sider
          width={300}
          style={{
            backgroundColor: '#fff',
            padding: '20px',
          }}
        >
          {/* Time Series Chart */}
          <Title level={4}>Price Trend for Math Tutoring Service</Title>
          <LineChart
            width={260}
            height={200}
            data={timeSeriesData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          {/* Trending Topics List */}
          <Title level={4}>Trending Topics</Title>
          <List
            itemLayout="horizontal"
            dataSource={[
              { name: 'Topic 1', price: 100, change: 5 },
              { name: 'Topic 2', price: 80, change: -3 },
              // Add more topics
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={
                    <Space>
                      <Text strong>${item.price}</Text>
                      {item.change > 0 ? (
                        <Text type="success">
                          <ArrowUpOutlined /> {item.change}%
                        </Text>
                      ) : (
                        <Text type="danger">
                          <ArrowDownOutlined /> {Math.abs(item.change)}%
                        </Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Home;