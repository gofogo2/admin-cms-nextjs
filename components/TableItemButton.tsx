interface TableItemButtonProps {
  text?: string;
}

export default function TableItemButton({ text }: TableItemButtonProps) {
  return (
    <td className="border-r py-2">
      <button className="ml-2 rounded-md bg-stone-200 py-2 px-3 text-sm">
        수정
      </button>
      <button className="ml-2 rounded-md bg-stone-200 py-2 px-3 text-sm">
        삭제
      </button>
    </td>
  );
}
