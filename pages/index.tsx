import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Layout2 from "../components/layout2";
import { usePageState } from "../contexts/PageContext";
import styles from "../styles/Home.module.css";
import Admin1 from "./admin1";
import ContentsAdd from "./contentsAdd";
import Monitoring1 from "./monitoring1";
import Power1 from "./power1";
import Enter from "./enter";
import ContentList from "./contentsList";
import ContentSearch from "./contentSearch";

const Home: NextPage = () => {
  const [method, UseMethod] = useState<string>("land");
  const pages = usePageState();
  const renderSwitch = (param: any) => {
    switch (param) {
      default:
        return <ContentsAdd />;
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
      <Layout2 title="고포고" hasTabBar canGoBack>
        {renderSwitch(pages.id)}
      </Layout2>
    </div>
  );
};

export default Home;
