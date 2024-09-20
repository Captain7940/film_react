import { login } from "@/api/user";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Home() {
  const router = useRouter();
  const handleFinish = async (values: { name: string; password: string }) => {
    const res = await login(values);
    // {data:{id:xx,name:xxx}}
    if (res.success) {
      message.success("Successfully Login");
      router.push("/film");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Film online streaming system</h2>
      <Form onFinish={handleFinish}>
        <Form.Item
          label="Account"
          name="name"
          rules={[{ required: true, message: "Please Enter Account" }]}
        >
          <Input placeholder="Please Enter Account" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please Enter Password" }]}
        >
          <Input.Password placeholder="Please Enter Password" autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.btn}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
