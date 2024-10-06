import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Collapse,
  Checkbox,
  Slider,
  Rate,
  Switch,
  Button,
  Tag,
  Space,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const FilterSidebar = ({ collapsed, setCollapsed }) => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);

  const handleApplyFilters = () => {
    const newFilters = [
      ...categories.map((cat) => ({ type: 'category', value: cat })),
      { type: 'price', value: `$${priceRange[0]} - $${priceRange[1]}` },
      { type: 'rating', value: `${rating} Stars` },
      ...(availableNow
        ? [{ type: 'availability', value: 'Available Now' }]
        : []),
    ];
    setAppliedFilters(newFilters);
  };

  const removeFilter = (filterToRemove) => {
    setAppliedFilters(
      appliedFilters.filter((filter) => filter !== filterToRemove)
    );
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={300}
      style={{
        background: '#fff',
        padding: '20px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={4}>
          <FilterOutlined /> Filters
        </Title>

        {appliedFilters.length > 0 && (
          <Space wrap>
            {appliedFilters.map((filter, index) => (
              <Tag
                key={index}
                closable
                onClose={() => removeFilter(filter)}
                style={{ marginBottom: 8 }}
              >
                {`${filter.type}: ${filter.value}`}
              </Tag>
            ))}
          </Space>
        )}

        <Collapse defaultActiveKey={['1', '2', '3', '4']} ghost>
          <Panel header="Category" key="1">
            <Checkbox.Group
              options={['Math', 'Science', 'English', 'History']}
              onChange={setCategories}
            />
          </Panel>
          <Panel header="Price Range" key="2">
            <Slider
              range
              min={0}
              max={1000}
              defaultValue={[0, 1000]}
              onChange={setPriceRange}
              tipFormatter={(value) => `$${value}`}
            />
            <Text>{`$${priceRange[0]} - $${priceRange[1]}`}</Text>
          </Panel>
          <Panel header="Rating" key="3">
            <Rate allowHalf onChange={setRating} value={rating} />
          </Panel>
          <Panel header="Availability" key="4">
            <Switch
              checkedChildren="Available Now"
              unCheckedChildren="All"
              onChange={setAvailableNow}
            />
          </Panel>
        </Collapse>

        <Button type="primary" block onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Space>
    </Sider>
  );
};

export default FilterSidebar;
