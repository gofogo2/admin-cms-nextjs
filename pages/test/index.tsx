import type { NextPage } from "next";
const Test: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center mt-10">
      <div className=" p-10 text-2xl font-bold">
        <span>@Samsung Engineering</span>
      </div>
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal">아이디</span>
        <input className="border-2" type="text"></input>
      </div>
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal">비밀번호</span>
        <input className="border-2" type="text"></input>
      </div>
      <div className="flex items-center justify-center   mt-5 " >
        <button className=" w-64 h-10 font-medium text-sm text-white rounded-xl bg-gray-300" >로그인</button>
      </div>
      <div className="mt-6 flex flex-col justify-center items-center" >
        <span className="text-sm" >문의가 있는 경우, 아래의 이메일로 연락부탁드립니다.</span>
        <span className="text-sm" >promoted.go@gmail.com</span>
      </div>
    </div>
  );
};

export default Test;
