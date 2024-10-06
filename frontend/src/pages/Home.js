import React, { useState } from 'react';
import { Layout, Input, Menu, Switch, Slider, Rate, Button, Card, List, Typography, Space } from 'antd';
import { UserOutlined, ArrowUpOutlined, ArrowDownOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

// Sample time series data for a single tutoring service
const timeSeriesData = [
  { week: 'Week 1', price: 50 },
  { week: 'Week 2', price: 55 },
  { week: 'Week 3', price: 60 },
  { week: 'Week 4', price: 58 },
];

const Home = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="logo">Logo</div>
        <Search placeholder="Search for a topic" style={{ width: 300 }} />
        <Space>
          <UserOutlined style={{ fontSize: '18px' }} />
        </Space>
      </Header>
      <Layout>
      <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={200}
          style={{ background: '#fff', padding: '20px' }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => setCollapsed(broken)}
        >
          <Title level={4}>Filters</Title>
          <Menu mode="vertical">
            <Menu.SubMenu key="category" title="Category">
              {/* Add category options */}
            </Menu.SubMenu>
            <Menu.Item key="price" style={{ marginRight: '20px' }}>
              Price Range
              <Slider range defaultValue={[20, 50]} style={{ width: '40px' }}/>
            </Menu.Item>
            <Menu.Item key="rating">
              Rating
              <Rate />
            </Menu.Item>
            <Menu.Item key="availability">
              <Switch /> Available Now
            </Menu.Item>
          </Menu>
          <Button type="primary" block style={{ marginTop: '20px' }}>Apply Filters</Button>
        </Sider>
        <Content style={{ marginLeft: collapsed ? '0' : '200px', paddingTop: '20px', paddingRight: '20px', backgroundColor: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {/* Example service card */}
            <Card
              hoverable
              cover={<img alt="example" src="https://via.placeholder.com/150" />}
              style={{ maxWidth: 300 }}
            >
              <Card.Meta
                title="Service Name"
                description={
                  <>
                    <Text>Provider Name</Text>
                    <Rate disabled defaultValue={4} />
                    <Text strong>$50</Text>
                  </>
                }
              />
              <Button type="primary" block style={{ marginTop: '10px' }}>Book Now</Button>
            </Card>
            {/* Repeat for more services */}
          </div>
        </Content>
        <Sider width={300} style={{ backgroundColor: '#fff', paddingTop: '20px', paddingRight: '20px' }}>
          {/* Time Series Chart */}
          <Title level={4}>Price Trend for Math Tutoring Service</Title>
          <LineChart
            width={280}
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
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={
                    <Space>
                      <Text strong>${item.price}</Text>
                      {item.change > 0 ? (
                        <Text type="success"><ArrowUpOutlined /> {item.change}%</Text>
                      ) : (
                        <Text type="danger"><ArrowDownOutlined /> {Math.abs(item.change)}%</Text>
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