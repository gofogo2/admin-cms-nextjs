interface TableItemTextProps {
  text: string | null;
}

export default function TableItemText({ text }: TableItemTextProps) {
  return (
    <td className="border-r py-2">
      <p>{text}</p>
    </td>
  );
}
