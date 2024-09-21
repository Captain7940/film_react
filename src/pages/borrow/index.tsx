import { Button, Col, Image, Form, Input, Select, Space, Table, TablePaginationConfig, Tooltip, Row, message, Tag } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './index.module.css'
import { getFilmRentList } from "../../api/film";
import { FilmQueryType } from "@/type/film";
import Content from "@/components/Content";
import { logout } from "@/api/user";

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
        width={100}
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

];

export default function Film() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })

  async function fetchData(search?: FilmQueryType) {
    const res = await getFilmRentList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
    });
    const { data } = res;
    setData(data);
    setPagination({ ...pagination, total: res.total });
  }

  useEffect(() => {
    fetchData();

  }, []);
  
  const handleSearchFinish = async (values: FilmQueryType) => {
    const res = await getFilmRentList({ ...values, current: 1, pageSize: pagination.pageSize })
    setData(res.data)
    setPagination({ ...pagination, current: 1, total: res.total })
  }

  const handleSearchReset = () => {
    form.resetFields()
  }
  const handleFilmRent = (id: string) => {
    router.push(`/film/edit/${id}`);
  };
  const handleTableChange = async (pagination: TablePaginationConfig) => {
    setPagination(pagination)
    const query = form.getFieldsValue()
    const res = await getFilmRentList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    });
    setData(res.data);
  }

  const columns = [...COLUMNS,
    {
      title: "Action",
      key: "action",
      render: (_: any, row: any) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                handleFilmRent(row._id);
              }}
            >
              Rent
            </Button>
          </Space>
        );
      },
    }
    ]

  return (
    <Content
    title="Film List"
    operation={
      <Button
        type="primary"
        onClick={async () => {
          await logout();
          message.success("Successfully Logout");
          localStorage.removeItem("user");
          router.push("/login");
        }}
      >
        Logout
      </Button>
    }
  >
    <Form
    name="search"
    form={form}
    onFinish={handleSearchFinish}
    initialValues={{
      name: "",
      author: "",
      category: "available",
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
     size="large"
     rowKey="_id"
     dataSource={data}
     columns={columns}
     onChange={handleTableChange} 
     pagination={{ ...pagination, showTotal: () => `Total ${pagination.total} item` }}
     />
     </div>
  </Content>
  );
}
