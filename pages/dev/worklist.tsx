import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";

const WorkList: NextPage = () => {
  return (
    <div>
      <div className="m-2 flex w-full justify-center border-2 border-slate-300 bg-slate-100   px-3 py-3 text-sm font-bold">
        Samsung Engineering Project WorkList
      </div>
      <p className="ml-3 text-xs">기준 Device : PC (Edge, Chrome, Safari)</p>
      <p className="ml-3 text-xs">문서타입 : HTML5 / CSS3</p>
      <TableContainer>
        <Table className="border">
          <TableHead>
            <TableRow className=" bg-slate-300">
              <TableCell className="border">ID</TableCell>
              <TableCell className="border">1 Depth</TableCell>
              <TableCell className="border">2 Depth</TableCell>
              <TableCell className="border">3 Depth</TableCell>
              <TableCell className="border">Popup</TableCell>
              <TableCell className="border">Path</TableCell>
              <TableCell className="border">Filename</TableCell>
              <TableCell className="border">
                History &amp; Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="bg-indigo-200" colSpan={8}>
                src Root
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">1</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">2</TableCell>
              <TableCell rowSpan={2} className="border">
                Common
              </TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">3</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">4</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">5</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">6</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" bg-indigo-200" colSpan={8}>
                Mail
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">1</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">2</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">3</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">4</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border">5</TableCell>
              <TableCell className="border">Common</TableCell>
              <TableCell className="border">layout</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border">
                <Link href="/sites/historyadd01">/sites/historyadd01</Link>
              </TableCell>
              <TableCell className="border">/sites/historyadd01.tsx</TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default WorkList;
