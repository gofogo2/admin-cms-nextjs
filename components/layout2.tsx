import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { cls } from "../libs/utils";

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

     useEffect(() => {
         setTimeout(() => {
             setLoading(false);
         }, 3000);   
       }, []);

      const [loading,setLoading] = useState<boolean>(true);
    const [method, setMethod] = useState<string>("모니터링1");
    const onEmailClick = (e:any) => {setMethod(e.target.value);
                        alert(e.target.value); }
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
      !loading?
    <div className='px-5' >
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
      <div className='flex mt-6 mb-0  '>
        <span className=' flex flex-[0.5] border-gray-300 border-b text-[0.3rem] items-center text-gray-500 '>monitoring>monitoring1</span>
        <div className='flex-[0.2]' > </div>
        <div className='font-semibold border-gray-300 border-b flex-[4]' >모니터링 관리</div>
      </div>

      <div className={cls("flex", hasTabBar ? "pb-10" : "")}>
          <div className="flex-[0.7] space-y-1 mt-4" >
              <details className='group' >
                  <summary  className='list-none select-none cursor-pointer text-sm font-thin' >모니터링 관리</summary>
                  <ul className='select-none' >
                      <div><input name='menu-select'  onClick={onEmailClick} id="huey" value="모니터링1" type="radio" className='peer opacity-0'  hidden/><label className='text-xs font-thin peer-checked:font-bold ' htmlFor="huey">모니터링1</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="gofogo" value="모니터링2" type="radio" className='peer opacity-0' hidden/><label className='text-xs font-thin peer-checked:font-bold' htmlFor="gofogo">모니터링2</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="wow" value="모니터링3" type="radio" className='peer opacity-0 '/><label className=' text-xs font-thin peer-checked:font-bold' htmlFor="wow">모니터링3</label></div>
                  </ul>
                  </details>
                  <details  className=' cursor-pointer' >
                  <summary  className='list-none select-none cursor-pointer group-open:before:rotate-90 text-sm font-thin' >전원 관리</summary>
                  <ul className='select-none' >
                      <div><input name='menu-select' onClick={onEmailClick} id="huey1" value="전원1" type="radio" className='peer opacity-0'  hidden/><label className='text-xs font-thin peer-checked:font-bold' htmlFor="huey1">전원1</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="gofogo1" value="전원2" type="radio" className='peer opacity-0' hidden/><label className='text-xs font-thin peer-checked:font-bold' htmlFor="gofogo1">전원2</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="wow1" value="전원3" type="radio" className='peer opacity-0 '/><label className=' text-xs font-thin peer-checked:font-bold' htmlFor="wow1">전원3</label></div>
                  </ul>
                  </details>
                  <details className='select-none cursor-pointer' >
                  <summary  className='list-none select-none cursor-pointer group-open:before:rotate-90 text-sm font-thin' >콘텐츠</summary>
                  <ul className='select-none' >
                      <div><input name='menu-select' onClick={onEmailClick} id="huey2" value="콘텐츠1" type="radio" className='peer opacity-0'  hidden/><label className='text-xs font-thin peer-checked:font-bold' htmlFor="huey2">콘텐츠1</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="gofogo2" value="콘텐츠2" type="radio" className='peer opacity-0' hidden/><label className='text-xs font-thin peer-checked:font-bold' htmlFor="gofogo2">콘텐츠2</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="wow2" value="콘텐츠3" type="radio" className='peer opacity-0 '/><label className=' text-xs font-thin peer-checked:font-bold' htmlFor="wow2">콘텐츠3</label></div>
                  </ul>
                  </details>
                  <details className='select-none cursor-pointer' >
                  <summary  className='list-none select-none cursor-pointer group-open:before:rotate-90 text-sm font-thin' >관리자</summary>
                  <ul className='select-none' >
                      <div><input name='menu-select' onClick={onEmailClick} id="huey3" value="관리자1" type="radio" className='peer opacity-0'  hidden/><label className='text-xs font-thin peer-checked:font-bold' htmlFor="huey3">관리자1</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="gofogo3" value="관리자2" type="radio" className='peer opacity-0' hidden/><label className='text-xs font-thin peer-checked:font-bold' htmlFor="gofogo3">관리자2</label></div>
                      <div><input name='menu-select' onClick={onEmailClick} id="wow3" value="관리자3" type="radio" className='peer opacity-0 '/><label className=' text-xs font-thin peer-checked:font-bold' htmlFor="wow3">관리자3</label></div>
                  </ul>
                  </details>

              
              
              </div><div className='flex-[4]' >
          {children}</div></div>
      <div className="text-center">
        <span className=" text-xs font-medium">@SAMSUNG ENGINEERING</span>
      </div>
    </div>
    :<span className='w-full h-screen flex justify-center items-center font-bold text-3xl landscape:text-5xl' >Loading...</span>
  );
}
