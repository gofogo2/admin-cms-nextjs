import useMutation from "@libs/client/userMutation";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ModifyForm {
  id: number;
  historyName: string;
  historyCaption?: string;
}

const Contents1: NextPage = () => {
  const [apply, { loading, data }] = useMutation("/api/historys/history");

  const onValid = (data: ModifyForm) => {
    console.log(data);

    if (loading) return;
    apply(data);
  };

  const click = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("일반버튼");
  };

  const { register, handleSubmit, reset, watch } = useForm<ModifyForm>();

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mt-3 flex flex-col border-2 ">
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              미디어
            </span>
            <div className="flex w-5/6 items-center  border-b  pl-2 text-xs font-medium">
              History Wall 01
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              제목
            </span>
            <div className="flex  w-5/6 items-center  border-b pl-2 text-xs font-medium">
              <input
                {...register("historyName", { required: true })}
                type="text"
                className=" border-1 mr-2 h-8 w-full rounded-md border-slate-400"
              ></input>
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              캡션
            </span>
            <div className="flex  w-5/6 items-center  border-b  pl-2 text-xs font-medium">
              <input
                type="text"
                {...register("historyCaption", { required: false })}
                className=" border-1 mr-2 h-8 w-full rounded-md border-slate-400"
              ></input>
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              이미지
            </span>
            <div className="flex w-5/6 flex-col border-b p-5 pl-2 text-xs font-medium">
              <div>
                <table className=" flex flex-col px-5">
                  <thead className=" flex flex-row border-2">
                    <th className=" flex flex-[0.2] items-center justify-center border-r-2  py-3">
                      번호
                    </th>
                    <th className=" flex flex-[0.7] items-center justify-center border-r-2 py-3">
                      이름
                    </th>
                    <th className="flex flex-1 items-center justify-center border-r-2 py-3">
                      파일명
                    </th>
                    <th className="flex flex-[0.3] items-center justify-center  py-3">
                      삭제
                    </th>
                  </thead>
                  <tbody className=" flex flex-col border-l-2 border-r-2 border-b-2 ">
                    <tr className="flex flex-row ">
                      <td className=" flex flex-[0.2] items-center justify-center border-r-2 py-3">
                        1
                      </td>
                      <td className=" flex flex-[0.7] items-center justify-center border-r-2 py-3">
                        테스트1
                      </td>
                      <td className="flex flex-1 items-center justify-center border-r-2 py-3">
                        test.jpg
                      </td>
                      <td className="flex flex-[0.3] items-center justify-center py-3">
                        <button
                          onClick={click}
                          className="rounded-md bg-slate-300 px-4 py-2"
                        >
                          <span className="text-[0.7rem] font-bold text-gray-700">
                            삭제
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="flex flex-row ">
                      <td className=" flex flex-[0.2] items-center justify-center border-r-2 py-3">
                        1
                      </td>
                      <td className=" flex flex-[0.7] items-center justify-center border-r-2 py-3">
                        테스트1
                      </td>
                      <td className="flex flex-1 items-center justify-center border-r-2 py-3">
                        test.jpg
                      </td>
                      <td className="flex flex-[0.3] items-center justify-center py-3">
                        <button
                          onClick={click}
                          className="rounded-md bg-slate-300 px-4 py-2"
                        >
                          <span className="text-[0.7rem] font-bold text-gray-700">
                            삭제
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="flex flex-row ">
                      <td className=" flex flex-[0.2] items-center justify-center border-r-2 py-3">
                        1
                      </td>
                      <td className=" flex flex-[0.7] items-center justify-center border-r-2 py-3">
                        테스트1
                      </td>
                      <td className="flex flex-1 items-center justify-center border-r-2 py-3">
                        test.jpg
                      </td>
                      <td className="flex flex-[0.3] items-center justify-center py-3">
                        <button
                          onClick={click}
                          className="rounded-md bg-slate-300 px-4 py-2"
                        >
                          <span className="text-[0.7rem] font-bold text-gray-700">
                            삭제
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div></div>
              <div className="mt-5 flex flex-col space-y-2">
                <span>※ 1920x1080 - JPG, PNG</span>
                <div className="flex justify-between px-5">
                  <input type="text" /> {/* <input type="file" /> */}
                  <button
                    onClick={click}
                    className="rounded-md bg-slate-300 px-4 py-2"
                  >
                    <span className="text-[0.7rem] font-bold text-gray-700">
                      업로드
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center  border-r bg-neutral-100 p-3 text-xs font-medium">
              히스토리 목록
            </span>
            <div className="flex w-5/6  flex-row items-center   justify-between border-b px-10 pl-7 text-xs font-medium">
              <input type="text" />
              {/* <input type="file" /> */}
              <button className="rounded-md bg-slate-300 px-4 py-2">
                <span className="text-[0.7rem] font-bold text-gray-700">
                  업로드
                </span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <input type="submit" value="가나다"></input>
        </div>
      </form>
    </div>
  );
};
export default Contents1;
