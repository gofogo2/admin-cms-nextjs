import type { NextPage } from "next";
import { useRouter } from "next/router";
const Test: NextPage = () => {
  const router = useRouter();

  const goMainPage = () => {
    router.push("/");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center rounded-3xl bg-white pb-10">
      <div className=" p-10 text-2xl font-bold">
        <span>@SamsungEngineering CMS</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  p-2 pt-0">
          <span className="p-1 text-xs font-extrabold text-gray-500">
            아이디
          </span>
          <input required className=" peer h-8 border-2" type="text"></input>
          <span className="hidden text-xs font-medium text-red-600 peer-invalid:block">
            아이디를 입력해주세요
          </span>
        </div>
        <div className="flex w-64 flex-col  p-2 pt-0">
          <span className="p-1 text-xs  font-extrabold text-gray-500">
            비밀번호
          </span>
          <input required className=" peer h-8 border-2" type="text"></input>
          <span className="hidden text-xs font-medium text-red-600 peer-invalid:block">
            패스워드를 입력해주세요
          </span>
        </div>
        <div className="mt-5 flex items-center   justify-center ">
          <input
            className=" h-10 w-64 rounded-sm bg-gray-300 text-sm font-medium text-white hover:bg-red-200 "
            type="submit"
            value="로그인"
          />
        </div>
      </form>
      <div className="mt-8 flex flex-col items-center justify-center">
        <span className="text-sm">
          문의가 있는 경우, 아래의 이메일로 연락부탁드립니다.
        </span>
        <span className="text-sm">test@gmail.com</span>
      </div>
    </div>
  );
};

export default Test;
