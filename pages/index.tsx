import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from 'react';
import Layout from "../components/layout";
import Layout2 from "../components/layout2";
import styles from "../styles/Home.module.css";
import Test from "./test";
import Enter from "./test/enter";
import TestForm from "./testForm";

const Home: NextPage = () => {

  useEffect(() => {
    setTimeout(() => {
    	console.log('3초가 지났습니다');
    }, 3000);   
  }, []);

  return (
    <div>

      <Layout2 title="고포고" hasTabBar canGoBack>
        <Enter />
      </Layout2>
    </div>
  );
};

export default Home;
