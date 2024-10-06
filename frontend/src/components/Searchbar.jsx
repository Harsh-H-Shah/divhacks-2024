import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const popularSkills = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English Literature',
  'History',
  'Geography',
  'Foreign Languages',
  'Music',
];

const SearchBar = () => {
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    const filteredOptions = popularSkills
      .filter((skill) => skill.toLowerCase().includes(value.toLowerCase()))
      .map((skill) => ({ value: skill }));
    setOptions(filteredOptions);
  };

  const onSelect = (value) => {
    console.log('Selected:', value);
    // Implement your search logic here
  };

  return (
    <AutoComplete
      style={{ width: 300 }}
      options={options}
      onSearch={handleSearch}
      onSelect={onSelect}
    >
      <Search
        placeholder="Search for a skill"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={(value) => console.log('Searched:', value)}
      />
    </AutoComplete>
  );
};

export default SearchBar;
