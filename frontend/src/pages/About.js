import React from 'react';
import { Layout, Typography, Card, Row, Col, Space } from 'antd';
import { GlobalOutlined, BulbOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <Layout style={{ backgroundColor: '#f0f2f5', padding: '50px' }}>
      <Content>
        <Title level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>
          About ScholarShare: Revolutionizing Education with Blockchain
        </Title>

        <Paragraph style={{ fontSize: '16px', textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          Welcome to ScholarShare, where we're bridging the gap between education and decentralized finance (DeFi) to create a revolutionary learning ecosystem.
        </Paragraph>

        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <GlobalOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <Title level={3}>Decentralized Learning Marketplace</Title>
              <Paragraph>
                Our platform connects learners directly with educators, creating a peer-to-peer educational ecosystem. Whether you're looking to learn a new skill or share your expertise, ScholarShare provides the infrastructure to make it happen.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <BulbOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <Title level={3}>Learn and Earn with Education Points (EP)</Title>
              <Paragraph>
                Introducing our native token, Education Points (EP). Earn EP by providing educational services, completing courses, or contributing valuable content. Spend EP to access premium educational resources, tutoring sessions, or specialized courses.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Row gutter={[32, 32]} style={{ marginTop: '40px' }}>
          <Col span={12}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <LockOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <Title level={3}>Blockchain-Powered Trust and Transparency</Title>
              <Paragraph>
                Every transaction, whether it's a completed course or a tutoring session, is recorded on the blockchain. This ensures transparency, builds trust, and creates an immutable record of educational achievements.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <Title level={3}>Community-Driven Growth</Title>
              <Paragraph>
                ScholarShare is more than a platform; it's a community. Users can propose and vote on new features, courses, and platform improvements, ensuring that our ecosystem evolves with the needs of our users.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Title level={2} style={{ textAlign: 'center', marginTop: '60px' }}>How It Works</Title>

        <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          {[
            "Register: Sign up and create your profile on ScholarShare.",
            "Earn or Buy EP: Start earning EP by providing educational services or purchase them to access learning resources.",
            "Learn or Teach: Browse available courses and tutoring services or offer your own expertise to the community.",
            "Transact Securely: All EP transactions are secured by blockchain technology, ensuring fair and transparent exchanges.",
            "Grow Your Knowledge and Earnings: As you learn and contribute, watch both your skills and your EP balance grow."
          ].map((step, index) => (
            <Card key={index} bordered={false}>
              {step}
            </Card>
          ))}
        </Space>

        <Title level={3} style={{ textAlign: 'center', marginTop: '60px' }}>Join the Education Revolution</Title>

        <Paragraph style={{ fontSize: '16px', textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          Whether you're a lifelong learner, an expert looking to share your knowledge, or an institution aiming to provide decentralized educational services, ScholarShare offers a new way to engage with education. Be part of the future of learning. Join ScholarShare today and experience education reimagined through the lens of decentralized finance.
        </Paragraph>

        <Title level={4} style={{ textAlign: 'center' }}>ScholarShare: Empowering minds, one block at a time.</Title>
      </Content>
    </Layout>
  );
};

export default AboutUs;