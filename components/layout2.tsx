import { cls } from "@libs/client/utils";
import { usePageDispatch } from "contexts/PageContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout2({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const dispatcher = usePageDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [method, setMethod] = useState<string>("모니터링1");
  const onNavigateClick = (e: any) => {
    console.log(e.target.value);
    router.push(`/${e.target.value}`);
  };
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return !loading ? (
    <div className="px-5">
      <div className=" flex justify-between pt-8 pb-5 shadow-lg">
        <span className="font-bold">@SAMSUNG ENGINEERING</span>
        <div className="space-x-1">
          <span className="text-xs font-semibold">관리자님</span>
          <span className="text-xs">|</span>
          <span className="text-xs font-semibold ">마이페이지</span>
          <span className="text-xs">|</span>
          <span className="text-xs  font-semibold">로그아웃</span>
          <span className="rounded-sm bg-gray-400 p-1 text-xs text-white ">
            사용자 매뉴얼
          </span>
          <span className="rounded-sm bg-gray-400 p-1 text-xs text-white ">
            콘텐츠 등록 가이드
          </span>
        </div>
      </div>
      <div></div>
      <div className="mt-6 mb-0 flex  ">
        <span className=" flex flex-[0.5] items-center border-b border-gray-300 text-[0.3rem] text-gray-500 ">
          monitoring&gt;monitoring1
        </span>
        <div className="flex-[0.2]"> </div>
        <div className="flex-[4] border-b border-gray-300 font-semibold">
          모니터링 관리
        </div>
      </div>

      <div className={cls("flex", hasTabBar ? "pb-10" : "")}>
        <div className="mt-4 flex-[0.7] space-y-1">
          <details className="cursor-pointer select-none">
            <summary className="cursor-pointer select-none list-none text-sm font-thin group-open:before:rotate-90">
              콘텐츠
            </summary>
            <ul className="select-none">
              <div>
                <input
                  name="menu-select"
                  onClick={onNavigateClick}
                  id="add01"
                  value="sites/historyadd01"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="add01"
                >
                  1970's 콘텐츠
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onNavigateClick}
                  id="add02"
                  value="sites/historyadd02"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="add02"
                >
                  1980's 콘텐츠
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onNavigateClick}
                  id="add03"
                  value="sites/historyadd3"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="add03"
                >
                  1990's 콘텐츠
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onNavigateClick}
                  id="add04"
                  value="sites/historyadd4"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="add04"
                >
                  2000's 콘텐츠
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onNavigateClick}
                  id="add05"
                  value="sites/historyadd5"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="add05"
                >
                  2010's 콘텐츠
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onNavigateClick}
                  id="add06"
                  value="sites/historyadd6"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="add06"
                >
                  2020's 콘텐츠
                </label>
              </div>
            </ul>
          </details>
        </div>
        <div className="flex-[4]">{children}</div>
      </div>
      <div className="text-center">
        <span className=" text-xs font-medium">@SAMSUNG ENGINEERING</span>
      </div>
    </div>
  ) : (
    <span className="flex h-screen w-full items-center justify-center text-3xl font-bold landscape:text-5xl">
      Loading...
    </span>
  );
}
