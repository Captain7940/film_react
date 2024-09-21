import { Button, Col, Image, Form, Input, Select, Space, Table, TablePaginationConfig, Tooltip, Row, message, Tag } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './index.module.css'
import { filmDelete, getFilmList } from "../../api/film";
import { FilmQueryType } from "@/type/film";
import Content from "@/components/Content";
// import { getCategoryList } from "@/api/category";
// import { CategoryType } from "@/type/category";


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
    title: 'Status',
    dataIndex: 'category',
    key: 'category',
    width: 100,
    render: (text: string) => {
      let color;
      switch (text) {
        case 'pending':
          color = 'orange';
          break;
        case 'available':
          color = 'green';
          break;
        case 'offline':
          color = 'red';
          break;
        default:
          color = 'white';
      }
      return <Tag color={color}>{text}</Tag>;
    },
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
  // const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })

  async function fetchData(search?: FilmQueryType) {
    const res = await getFilmList({
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
    // getCategoryList({ all: true }).then((res) => {
    //   setCategoryList(res.data);
    // });

  }, []);
  
  const handleSearchFinish = async (values: FilmQueryType) => {
    const res = await getFilmList({ ...values, current: 1, pageSize: pagination.pageSize })
    setData(res.data)
    setPagination({ ...pagination, current: 1, total: res.total })
  }

  const handleSearchReset = () => {
    form.resetFields()
  }

  const handleFilmEdit = (id: string) => {
    router.push(`/film/edit/${id}`);
  };

  const handleTableChange = async (pagination: TablePaginationConfig) => {
    setPagination(pagination)
    const query = form.getFieldsValue()
    const res = await getFilmList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    });
    setData(res.data);
  }

  const handleFilmDelete = async (id: string) => {
    await filmDelete(id);
    message.success("Successfully Delete");
    fetchData(form.getFieldsValue());
  };

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
                handleFilmEdit(row._id);
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                handleFilmDelete(row._id);
              }}
            >
              Delete
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
        onClick={() => {
          router.push("/film/add");
        }}
      >
        Add
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
      category: "",
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
        <Form.Item name="category" label="Status" >
          <Select
            allowClear
            showSearch
            placeholder="Please Select"
            options={[
              { label: <span style={{ color: "green" }}>Available</span>, value: "available" },
              { label: <span style={{ color: "orange" }}>Pending</span>, value: "pending" },
              { label: <span style={{ color: "red" }}>Offline</span>, value: "offline" },
            ]}
          />
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
