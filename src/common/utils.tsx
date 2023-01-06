import React  from 'react';
import { Input, Button, DatePicker, Space } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

interface Props {
    setSelectedKeys: (x: any) => void
    selectedKeys: string[]
    confirm: () => void
    clearFilters: () => void
}

const filterDropdownTextForm = (param: Props, dataIndex: string, setSearchText: any, setSearchedColumn: any) => (
  <div style={{ padding: 8 }}>
    <Input
      id="searchInput"
      placeholder={`Search ${dataIndex}`}
      value={param.selectedKeys[0]}
      onChange={e => param.setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => handleSearch(param.selectedKeys, param.confirm, dataIndex, setSearchText, setSearchedColumn)}
      style={{ width: 188, marginBottom: 8, display: 'block' }}
    />
    <Space>
      <Button
        type="primary"
        onClick={() => handleSearch(param.selectedKeys, param.confirm, dataIndex, setSearchText, setSearchedColumn)}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        Search
      </Button>
      <Button onClick={() => handleReset(param.clearFilters, setSearchText)} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </Space>
  </div>
)

const filterDropdownDateForm = (param: Props, dataIndex: string, setSearchText: any, setSearchedColumn: any) => (
  <div style={{ padding: 8 }}>
    <Space>
      <DatePicker onChange={(date: any, dateString: any) => param.setSelectedKeys(dateString ? [dateString] : [])}/>
      <Button
        type="primary"
        onClick={() => handleSearch(param.selectedKeys, param.confirm, dataIndex, setSearchText, setSearchedColumn)}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        Search
      </Button>
      <Button onClick={() => handleReset(param.clearFilters,setSearchText)} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </Space>
  </div>
)

export const getColumnSearchProps = (dataIndex: string, searchText: string, setSearchText: any, searchedColumn: string, setSearchedColumn: any) => ({
    filterDropdown: (param: Props) => filterDropdownTextForm(param, dataIndex, setSearchText, setSearchedColumn),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string | number | boolean, record: { [x: string]: { toString: () => string } }) => record[dataIndex]?record[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase()):false,
    render: (text: { toString: () => string }) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText!]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : text,
  })

  export const getColumnSearchDate = (dataIndex: string, searchText: string, setSearchText: any, searchedColumn: string, setSearchedColumn: any) => ({
    filterDropdown: (param: Props) => filterDropdownDateForm(param, dataIndex, setSearchText, setSearchedColumn),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string | number | boolean, record: { [x: string]: { toString: () => string } }) => record[dataIndex].toString().substr(0,10) === value.toString(),
    render: (text: { toString: () => string }) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText!]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : text,
  })

const handleSearch = (selectedKeys: React.SetStateAction<string | undefined>[], confirm: () => void, dataIndex: React.SetStateAction<string | undefined>, 
    setSearchText: any, setSearchedColumn: any) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
}

const handleReset = (clearFilters: () => void, setSearchText: any) => {
    clearFilters()
    setSearchText('')
}