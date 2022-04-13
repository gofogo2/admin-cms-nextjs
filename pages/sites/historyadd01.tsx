import Layout2 from "@components/layout2";
import { usePageState } from "contexts/PageContext";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ContentsAdd from "pages/contentsAdd";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Historyadd01: NextPage = () => {
  const [method, UseMethod] = useState<string>("land");
  const pages = usePageState();
  useEffect(() => {
    const f = async () => {
      UseMethod(window.screen.orientation.type.toString());
      window.screen.orientation.onchange = () => {
        UseMethod(window.screen.orientation.type.toString());
      };
    };
    f();
  }, []);

  return (
    <div>
      <Layout2 title="고포고" hasTabBar canGoBack>
        <ContentsAdd />
      </Layout2>
    </div>
  );
};

export default Historyadd01;
