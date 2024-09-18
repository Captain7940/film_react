import { LEVEL_OPTIONS } from "@/pages/category";
import { Button, Form, Input, Select, message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Content from "../Content";
import styles from "./index.module.css";
import { CategoryType } from "@/type/category";
import { categoryAdd, getCategoryList } from "@/api/category";

export default function CategoryForm({ title }: { title: string }) {
  const [form] = Form.useForm();
  const [level, setLevel] = useState(1);
  const [levelOneList, setLevelOneList] = useState<CategoryType[]>([]);
  const router = useRouter();

  const handleFinish = async (values: CategoryType) => {
    await categoryAdd(values);
    message.success("Create Success");
    router.push("/category");
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getCategoryList({ all: true, level: 1 });
      setLevelOneList(res.data);
    }
    fetchData();
  }, []);
  const levelOneOptions = useMemo(() => {
    return levelOneList.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [levelOneList]);

  return (
    <Content title={title}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please Enter Name",
            },
          ]}
        >
          <Input placeholder="Please Enter" />
        </Form.Item>
        <Form.Item
          label="级别"
          name="level"
          rules={[
            {
              required: true,
              message: "请选择级别",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              setLevel(value);
            }}
            placeholder="Please Select"
            options={LEVEL_OPTIONS}
          ></Select>
        </Form.Item>
        {level === 2 && (
          <Form.Item
            label="所属级别"
            name="parent"
            rules={[
              {
                required: true,
                message: "请选择级别",
              },
            ]}
          >
            <Select placeholder="Please Select" options={levelOneOptions}></Select>
          </Form.Item>
        )}
        <Form.Item label=" " colon={false}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.btn}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
