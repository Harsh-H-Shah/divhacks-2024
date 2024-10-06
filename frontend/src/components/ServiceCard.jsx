import React from 'react';
import { Card, Typography, Rate, Button } from 'antd';

const { Text } = Typography;

function ServiceCard() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px',
      }}
    >
      <Card
        hoverable
        cover={<img alt="example" src="https://via.placeholder.com/150" />}
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
        <Button type="primary" block style={{ marginTop: '10px' }}>
          Book Now
        </Button>
      </Card>
    </div>
  );
}

export default ServiceCard;
