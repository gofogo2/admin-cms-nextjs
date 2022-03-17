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
  const onEmailClick = (e: any) => {
    dispatcher({
      type: "CHANGE",
      id: e.target.value,
    });
    setMethod(e.target.value);
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
          <details className="group">
            <summary className="cursor-pointer select-none list-none text-sm font-thin">
              모니터링 관리
            </summary>
            <ul className="select-none">
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="huey"
                  value="1"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold "
                  htmlFor="huey"
                >
                  모니터링1
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="gofogo"
                  value="1"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="gofogo"
                >
                  모니터링2
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="wow"
                  value="1"
                  type="radio"
                  className="peer opacity-0 "
                />
                <label
                  className=" text-xs font-thin peer-checked:font-bold"
                  htmlFor="wow"
                >
                  모니터링3
                </label>
              </div>
            </ul>
          </details>
          <details className=" cursor-pointer">
            <summary className="cursor-pointer select-none list-none text-sm font-thin group-open:before:rotate-90">
              전원 관리
            </summary>
            <ul className="select-none">
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="huey1"
                  value="2"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="huey1"
                >
                  전원1
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="gofogo1"
                  value="2"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="gofogo1"
                >
                  전원2
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="wow1"
                  value="2"
                  type="radio"
                  className="peer opacity-0 "
                />
                <label
                  className=" text-xs font-thin peer-checked:font-bold"
                  htmlFor="wow1"
                >
                  전원3
                </label>
              </div>
            </ul>
          </details>
          <details className="cursor-pointer select-none">
            <summary className="cursor-pointer select-none list-none text-sm font-thin group-open:before:rotate-90">
              콘텐츠
            </summary>
            <ul className="select-none">
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="huey2"
                  value="31"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="huey2"
                >
                  콘텐츠리스트
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="gofogo2"
                  value="3"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="gofogo2"
                >
                  콘텐츠등록
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="search"
                  value="32"
                  type="radio"
                  className="peer opacity-0 "
                />
                <label
                  className=" text-xs font-thin peer-checked:font-bold"
                  htmlFor="search"
                >
                  콘텐츠검색
                </label>
              </div>
            </ul>
          </details>
          <details className="cursor-pointer select-none">
            <summary className="cursor-pointer select-none list-none text-sm font-thin group-open:before:rotate-90">
              관리자
            </summary>
            <ul className="select-none">
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="huey3"
                  value="4"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="huey3"
                >
                  관리자1
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="gofogo3"
                  value="4"
                  type="radio"
                  className="peer opacity-0"
                  hidden
                />
                <label
                  className="text-xs font-thin peer-checked:font-bold"
                  htmlFor="gofogo3"
                >
                  관리자2
                </label>
              </div>
              <div>
                <input
                  name="menu-select"
                  onClick={onEmailClick}
                  id="wow3"
                  value="4"
                  type="radio"
                  className="peer opacity-0 "
                />
                <label
                  className=" text-xs font-thin peer-checked:font-bold"
                  htmlFor="wow3"
                >
                  관리자3
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
