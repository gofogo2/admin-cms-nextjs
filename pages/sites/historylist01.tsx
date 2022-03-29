import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "@components/layout";
import Layout2 from "@components/layout2";
import styles from "../styles/Home.module.css";
import { usePageState } from "contexts/PageContext";
import ContentList from "pages/contentsList";
import ContentSearch from "pages/contentSearch";

const HistoryList01: NextPage = () => {
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
      {method.includes("land") ? (
        <Layout2 title="고포고" hasTabBar canGoBack>
          <ContentSearch />
        </Layout2>
      ) : (
        <span className="flex h-screen w-screen items-center justify-center bg-blue-200 text-4xl font-semibold text-slate-500 ">
          가로모드로 사용해주세요
        </span>
      )}
    </div>
  );
};

export default HistoryList01;
