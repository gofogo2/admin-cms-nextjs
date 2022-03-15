import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Layout2 from "../components/layout2";
import { usePageState } from "../contexts/PageContext";
import styles from "../styles/Home.module.css";
import Admin1 from "./admin1";
import Contents1 from "./contentsAdd";
import Monitoring1 from "./monitoring1";
import Power1 from "./power1";
import Enter from "./enter";
import ContentList from "./contentsList";

const Home: NextPage = () => {
  const [method, UseMethod] = useState<string>("land");
  const pages = usePageState();
  const renderSwitch = (param: any) => {
    switch (param) {
      case "1":
        return <Monitoring1 />;
      case "2":
        return <Power1 />;
      case "3":
        return <Contents1 />;
      case "31":
        return <ContentList />;
      case "4":
        return <Admin1 />;
      default:
        return <Monitoring1 />;
    }
  };
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
          {renderSwitch(pages.id)}
        </Layout2>
      ) : (
        <span className="flex h-screen w-screen items-center justify-center bg-blue-200 text-4xl font-semibold text-slate-500 ">
          가로모드로 사용해주세요
        </span>
      )}
    </div>
  );
};

export default Home;
