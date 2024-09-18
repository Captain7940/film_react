import Content from "@/components/Content";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  message,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "./index.module.css";
import { CategoryQueryType } from "@/type/category";
import { categoryDelete, getCategoryList } from "@/api/category";

const LEVEL = {
  ONE: 1,
  TWO: 2,
};

export const LEVEL_OPTIONS = [
  { label: "级别1", value: LEVEL.ONE },
  { label: "级别2", value: LEVEL.TWO },
];

const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "级别",
    dataIndex: "level",
    key: "level",
    width: 120,
    render: (text: number) => {
      return <Tag color={text === 1 ? "green" : "cyan"}>{`级别${text}`}</Tag>;
    },
  },
  {
    title: "所属分类",
    dataIndex: "parent",
    key: "parent",
    width: 120,
    render: (text: { name: string }) => {
      return text?.name ?? "-";
    },
  },

];

export default function Category() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  });

  async function fetchData(values?: any) {
    const res = await getCategoryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...values,
    });
    const { data } = res;
    setData(data);
    setPagination({ ...pagination, total: res.total });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchFinish = async (values: CategoryQueryType) => {
    const res = await getCategoryList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    setData(res.data);
    setPagination({ ...pagination, current: 1, total: res.total });
  };

  const handleSearchReset = () => {
    form.resetFields();
  };

  const handleCategoryEdit = (id: string) => {
    router.push(`/category/edit/${id}`);
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    getCategoryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };

  const handleCategoryDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Confirm?",
      okText: "Confirm",
      cancelText: "Cancel",
      async onOk() {
        await categoryDelete(id);
        message.success("Successfully Delete");
        fetchData(form.getFieldsValue());
      },
    });
  };

  const columns = [
    ...COLUMNS,
    {
      title: "Action",
      key: "action",
      render: (_: any, row: any) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                handleCategoryEdit(row._id);
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                handleCategoryDelete(row._id);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Content
      title="Category List"
      operation={
        <Button
          type="primary"
          onClick={() => {
            router.push("/category/add");
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
              <Input placeholder="Please Enter" allowClear />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item name="level" label="级别">
              <Select
                allowClear
                showSearch
                placeholder="Please Select"
                options={LEVEL_OPTIONS}
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
          dataSource={data}
          columns={columns}
          scroll={{ x: 1000 }}
          onChange={handleTableChange}
          pagination={{
            ...pagination,
            showTotal: () => `Total ${pagination.total} item`,
          }}
        />
      </div>
    </Content>
  );
}
