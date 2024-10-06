import React, { useState } from 'react';
import { Layout, Card, List, Button, Modal, Typography, Space, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const { Content } = Layout;
const { Title, Text } = Typography;

const tutors = [
  {
    id: 1,
    name: 'John Doe',
    topic: 'Mathematics',
    cost: 30,
    slots: ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM', '2:00 PM - 3:00 PM'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    topic: 'Physics',
    cost: 25,
    slots: ['10:00 AM - 11:00 AM', '1:00 PM - 2:00 PM', '3:00 PM - 4:00 PM'],
  },
];

const BookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBookSlot = (tutor) => {
    setSelectedSlot(tutor);
    setIsModalVisible(true);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      console.log(`Booked with ${selectedSlot.name} on ${selectedDate.format('YYYY-MM-DD')} at ${selectedTime.format('HH:mm')}`);
      setIsModalVisible(false);
      // Implement booking logic here
    } else {
      alert('Please select a date and time.');
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <Title level={2}>Book a Tutor Slot</Title>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={tutors}
          renderItem={(tutor) => (
            <List.Item>
              <Card title={`${tutor.name} - ${tutor.topic}`}>
                <Space direction="vertical" size="middle">
                  <Text>Cost per Slot: {tutor.cost} EduPoints</Text>
                  <Button type="primary" onClick={() => handleBookSlot(tutor)}>
                    Book a Slot
                  </Button>
                </Space>
              </Card>
            </List.Item>
          )}
        />
        <Modal
          title="Confirm Booking"
          visible={isModalVisible}
          onOk={handleConfirmBooking}
          onCancel={() => setIsModalVisible(false)}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <DatePicker
              onChange={(date) => setSelectedDate(date)}
              style={{ width: '100%' }}
            />
            <TimePicker
              onChange={(time) => setSelectedTime(time)}
              style={{ width: '100%' }}
              format="HH:mm"
              defaultOpenValue={moment('00:00', 'HH:mm')}
            />
            <Text>
              Booking with {selectedSlot?.name} for {selectedSlot?.cost} EduPoints.
            </Text>
          </Space>
        </Modal>
      </Content>
    </Layout>
  );
};

export default BookingPage;