interface TableHeaderProps {
  text: string;
}

export default function TableHeader({ text }: TableHeaderProps) {
  return (
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
  );
}
