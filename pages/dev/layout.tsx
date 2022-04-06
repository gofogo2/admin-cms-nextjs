import Layout2 from "@components/layout2";
import { usePageState } from "contexts/PageContext";
import type { NextPage } from "next";
import ContentsAdd3 from "pages/contentsAdd3";
import { useEffect, useState } from "react";

const LayoutTest: NextPage = () => {
  return (
    <div className="relative clear-left min-w-[1280px] bg-red-500">
      <div className="fixed top-0 left-0 bottom-0 z-10 w-1/5 overflow-hidden bg-[#0f152e] after:absolute after:block after:w-[28px] after:rounded-md after:bg-red-400 after:shadow-xl">
        <header>
          <h1>
            <strong>SDI ON</strong>
          </h1>
        </header>
        <div className="sideNav">
          <nav>
            <ul>
              <li>
                <strong>Member MGTM</strong>
                <ul>
                  <li>
                    <a href="">Members</a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Conference</strong>
                <ul>
                  <li>
                    <a href="">In session</a>
                  </li>
                  <li>
                    <a href="">On demand</a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Enquiry</strong>
                <ul>
                  <li>
                    <a href="">Region</a>
                  </li>
                  <li>
                    <a href="">Site</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bottom">
          <a href="" className="btnAdmin">
            Admin
          </a>
          <span>
            <a href="/login" className="btnLogout">
              Logout
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LayoutTest;
