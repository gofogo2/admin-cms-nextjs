import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
const Test: NextPage = () => {
  const router = useRouter();

  const goMainPage = () => {
    router.push("/");
  };

  interface EnterForm {
    email?: string;
    password?: string;
  }

  const onValid = (data: EnterForm) => {
    console.log(data.email);
    console.log(data.password);
  };

  const { register, handleSubmit, reset, watch } = useForm<EnterForm>();
  console.log(watch());
  return (
    <div className="flex flex-col items-center rounded-3xl bg-white pb-10">
      <div className=" p-10 text-2xl font-bold">
        <span>@SamsungEngineering CMS</span>
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("email", {
            required: true,
          })}
          name="아이디를 입력해주세요"
          label="아이디"
          type="text"
          required
        />
        <Input
          register={register("password", {
            required: true,
          })}
          name="패스워드를 입력해주세요"
          label="패스워드"
          type="password"
          required
        />
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
