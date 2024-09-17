
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import styles from "./index.module.css";
import { FilmType } from "@/type";
import { filmAdd } from "@/api/film";
import Content from "@/components/Content";


const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function FilmForm({ title }: { title: string }) {
  const [preview, setPreview] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  const handleFinish = async (values: FilmType) => {
    
    await filmAdd(values);
    message.success("Create Success");
    router.push("/film");
  };

  return (
    <Content title={title}>
      <Form
        form={form}
        className={styles.form}
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
              message: "Enter Name",
            },
          ]}
        >
          <Input placeholder="Please Enter" />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Enter author",
            },
          ]}
        >
          <Input placeholder="Please Enter" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Select category",
            },
          ]}
        >
          <Select placeholder="Please Select">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cover Page" name="cover">
          <Input.Group compact>
            <Input
              placeholder="Please Enter"
              style={{ width: "calc(100% - 80px)" }}
              onChange={(e) => {
                form.setFieldValue("cover", e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={(e) => {
                setPreview(form.getFieldValue("cover"));
              }}
            >
              Preview
            </Button>
          </Input.Group>
        </Form.Item>
        {preview && (
          <Form.Item label=" " colon={false}>
            <Image src={preview} width={100} height={100} alt="" />
          </Form.Item>
        )}

        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Please Enter" />
        </Form.Item>
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
