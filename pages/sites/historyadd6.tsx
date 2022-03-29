import Layout2 from "@components/layout2";
import { usePageState } from "contexts/PageContext";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ContentsAdd from "pages/contentsAdd";
import ContentsAdd2 from "pages/contentsAdd2";
import ContentsAdd3 from "pages/contentsAdd3";
import ContentsAdd6 from "pages/contentsAdd6";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Historyadd06: NextPage = () => {
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
          <ContentsAdd6 />
        </Layout2>
      ) : (
        <span className="flex h-screen w-screen items-center justify-center bg-blue-200 text-4xl font-semibold text-slate-500 ">
          가로모드로 사용해주세요
        </span>
      )}
    </div>
  );
};

export default Historyadd06;
