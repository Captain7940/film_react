import { Button, Col, Image, Form, Input, Select, Space, Table, TablePaginationConfig, Tooltip, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './index.module.css'
import { getBookList } from "../api/book";
import { BookQueryType } from "@/type/book";
import dayjs from "dayjs";


const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200
  },
  {
    title: 'Cover Page',
    dataIndex: 'cover',
    key: 'cover',
    width: 120,
    render: (text: string) => {
      return <Image
        width={50}
        src={text}
        alt=""
      />
    }
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    width: 120
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 80
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    width: 200,
    render: (text: string) => {
      return <Tooltip title={text} placement="topLeft">
        {text}
      </Tooltip>
    }
  },
  {
    title: 'Created Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 130,
    render: (text: string) => dayjs(text).format('YYYY-MM-DD')
  },
];

export default function Home() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })

  useEffect(() => {
    async function fetchData() {
      const res = await getBookList({ current: 1, pageSize: pagination.pageSize })
      const { data } = res
      setData(data)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleSearchFinish = async (values: BookQueryType) => {
    const res = await getBookList({ ...values, current: 1, pageSize: pagination.pageSize })
    setData(res.data)
    setPagination({ ...pagination, current: 1, total: res.total })
  }

  const handleSearchReset = () => {
    form.resetFields()
  }

  const handleBookEdit = () => {
    router.push('/book/edit/id')
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination)
    const query = form.getFieldsValue()
    getBookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    })
  }

  const columns = [...COLUMNS,
    {
      title: 'Action', key: "action", render: (_: any, row: any) => {
        return <Space>
          <Button type="link" onClick={handleBookEdit}> Edit</Button>
          <Button type="link" danger>Delete</Button>
        </Space>
      }
    }
    ]

  return <>  <Form
    name="search"
    form={form}
    onFinish={handleSearchFinish}
    initialValues={{
      name: '', author: '', category: ''
    }}
  >
    <Row gutter={24}>
      <Col span={5}>
        <Form.Item name="name" label="Name">
          <Input placeholder="Please Input" allowClear />
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item name="author" label="Author" >
          <Input placeholder="Please Input" allowClear />
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item name="category" label="Category" >
          <Select
            allowClear
            showSearch
            placeholder="Please Select"
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]} />
        </Form.Item>
      </Col>
      <Col span={9}>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button htmlType="submit" onClick={handleSearchReset}>
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Col>
    </Row>
  </Form>
  
  <div className={styles.tableWrap}>
    <Table
     dataSource={data} 
     columns={columns} 
     scroll={{x: 1000 }} 
     onChange={handleTableChange} 
     pagination={{ ...pagination, showTotal: () => `Total ${pagination.total} item` }}
     />
     </div>
  </>;
}
