import {Button, Form, Image, Input, InputNumber, Select, message,} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { FilmType } from "@/type";
import { filmAdd, filmUpdate } from "@/api/film";
import Content from "@/components/Content";

const { TextArea } = Input;

export default function FilmForm({ title, data }: { title: string ,data: FilmType}) {
  const [preview, setPreview] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (data?._id) {
      
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleFinish = async (values: FilmType) => {
    if (data?._id) {
      await filmUpdate(data._id, values);
      message.success("Edit Success");
    } else {
      await filmAdd(values);
      message.success("Successfully Create");
    }
    router.push("/film");
  };

  useEffect(() => {

  }, []);

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
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please Enter Author",
            },
          ]}
        >
          <Input placeholder="Please Enter" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="category"
          rules={[
            {
              required: true,
              message: "Please Select Status",
            },
          ]}
        >
          <Select
            placeholder="Please Select"
            options={[
              { label: <span style={{ color: "green" }}>Available</span>, value: "available" },
              { label: <span style={{ color: "orange" }}>Pending</span>, value: "pending" },
              { label: <span style={{ color: "red" }}>Offline</span>, value: "offline" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label="Cover Page" name="cover">
          <Input.Group compact>
            <Input
              placeholder="Please Enter"
              style={{ width: "calc(100% - 63px)" }}
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
            {data?._id ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
