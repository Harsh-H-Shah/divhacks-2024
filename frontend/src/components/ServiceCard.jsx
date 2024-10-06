import React from 'react';
import {
  Card,
  Typography,
  Rate,
  Button,
  Avatar,
  Space,
  Tag,
  Tooltip,
  Divider,
} from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text, Paragraph } = Typography;

function ServiceCard({ service }) {
  const { name, provider, rating, price, img, category, duration } = service;

  return (
    <Card
      hoverable
      style={{ width: '100%', height: '100%' }}
      cover={
        <div style={{ position: 'relative' }}>
          <img
            alt={name}
            src={img}
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
          <Tag color="blue" style={{ position: 'absolute', top: 8, left: 8 }}>
            {category}
          </Tag>
          <Button
            type="text"
            icon={<HeartOutlined />}
            style={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
          />
        </div>
      }
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ fontWeight: 'bold', marginBottom: 0, fontSize: '16px' }}
        >
          {name}
        </Paragraph>
        <Space align="center" style={{ marginBottom: 4 }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text type="secondary" style={{ fontSize: '14px' }}>
            {provider}
          </Text>
        </Space>
        <Space split={<Divider type="vertical" style={{ margin: '0 4px' }} />}>
          <Space>
            <Rate disabled defaultValue={rating} style={{ fontSize: 12 }} />
            <Text type="secondary" style={{ fontSize: '14px' }}>
              ({rating})
            </Text>
          </Space>
          <Tooltip title={`Duration: ${duration}`}>
            <Space>
              <ClockCircleOutlined style={{ fontSize: '14px' }} />
              <Text type="secondary" style={{ fontSize: '14px' }}>
                {duration}
              </Text>
            </Space>
          </Tooltip>
        </Space>
        <Text strong style={{ fontSize: 18 }}>
          <DollarOutlined /> {price}
        </Text>
        <Link to="/book">
          <Button type="primary" block style={{ marginTop: '8px' }}>
            Book Now
          </Button>
        </Link>
      </Space>
    </Card>
  );
}

function ServiceCardGrid({ services }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}

export default ServiceCardGrid;
