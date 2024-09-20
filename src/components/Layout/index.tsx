import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps, message, Space } from "antd";
import { Layout as AntdLayout, Breadcrumb, Dropdown, Menu } from "antd";
import Head from "next/head";
import router, { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { logout } from "@/api/user";

const { Header, Content, Sider } = AntdLayout;

const ITEMS = [
  {
    // icon: React.createElement(icon),
    label: "Film Manage",
    key: "film",

    children: [
      { label: "Film List", key: "/film" },
      { label: "Add Film", key: "/film/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "Borrow Manage",
    key: "borrow",

    children: [
      { label: "Borrow List", key: "/borrow" },
      { label: "Add Borrow", key: "/borrow/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "Category Manage",
    key: "category",

    children: [
      { label: "Category List", key: "/category" },
      { label: "Add Category", key: "/category/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "User Manage",
    key: "user",

    children: [
      { label: "User List", key: "/user" },
      { label: "Add User", key: "/user/add" },
    ],
  },
];

const USER_ITEMS: MenuProps["items"] = [
  {
    label: <Link href="/user/edit/id">User Center</Link>,
    key: "1",
  },
  {
    label: (
      <span
        onClick={async () => {
          await logout();
          message.success("Successfully Logout");
          router.push("/login");
        }}
      >
        Logout
      </span>
    ),
    key: "2",
  },
];

// export function Layout({ children }: { children: ReactNode }) {
  export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
      router.push(key);
    };


  const activeMenu = router.pathname;
 

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AntdLayout>
          <Header className={styles.header}>
            Film online streaming system
            <span className={styles.user}>
              <Dropdown menu={{ items: USER_ITEMS }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    UserName
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </span>
          </Header>
          <AntdLayout className={styles.sectionInner}>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["/film"]}
                defaultOpenKeys={["film"]}
                selectedKeys={[activeMenu]}
                style={{ height: "100%", borderRight: 0 }}
                items={ITEMS}
                onClick={handleMenuClick}
              />
            </Sider>
            <AntdLayout className={styles.sectionContent}>
              <Content className={styles.content}>{children}</Content>
            </AntdLayout>
          </AntdLayout>
        </AntdLayout>
      </main>
    </>
  );
}
