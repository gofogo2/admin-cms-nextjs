import TableItemText from "@components/TableItemText";
import TableItemButton from "@components/TableItemButton";
import useHistory from "@libs/client/useHistory";
import { HistoryMedia } from "@prisma/client";
import { NextPage } from "next";
import { useEffect } from "react";

const ContentList: NextPage = () => {
  const { histoyMedias, isLoading } = useHistory();
  return (
    <div className="mt-3 flex w-full justify-center ">
      {isLoading ? (
        <div className="flex w-full items-center justify-center text-4xl font-extrabold text-zinc-600">
          LOADING....
        </div>
      ) : (
        <table className="mx-5 w-full border">
          <thead className="bg-slate-300">
            <th className="border-r py-2">
              <p>No</p>
            </th>
            <th className="border-r py-2">
              <p>ID</p>
            </th>
            <th className="border-r py-2">
              <p>Name</p>
            </th>
            <th className="border-r py-2">
              <p>Caption</p>
            </th>
            <th className="border-r py-2">
              <p>관리</p>
            </th>
          </thead>
          <tbody className="w-full  text-center">
            {histoyMedias?.map((item, i) => (
              <tr className="border-t" key={i + 1}>
                <TableItemText text={(i + 1).toString()} />
                <TableItemText text={item.id.toString()} />
                <TableItemText text={item.historyName} />
                <TableItemText text={item.historyCaption} />
                <TableItemButton />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    // <div>
    //   {isLoading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <div>
    //       {/* <ul>
    //         {histoyMedias?.map((a, i) => (
    //           <li key={i}>
    //             <span>{a.id}|||</span>
    //             <span>{a.historyName}|||</span>
    //             <span>{a.historyCaption} </span>
    //           </li>
    //         ))}
    //       </ul> */}
    //     </div>
    //   )}
    // </div>
  );
};
export default ContentList;
