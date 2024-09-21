import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/*
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}*/

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setRole(user?.info?.role || null);
    setLoading(false);
  },[])

  if(loading) {
    return <div>Loading...</div>;
  }

  return router.pathname === "/login" ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );

  

  // switch (role) {
  //   case 'admin':
  //     return (
  //       <Layout>
  //         <Component {...pageProps} />
  //       </Layout>
  //     );
  //   case 'user':
  //   default:
  //     router.push('/borrow');
  //     return null;
  // }



}
