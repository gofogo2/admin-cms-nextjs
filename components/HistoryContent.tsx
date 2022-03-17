interface HistoryContentProps {
  year: string;
  content: string;
}

export default function HistoryContent({ year, content }: HistoryContentProps) {
  return (
    <div className="ml-5">
      <p>{year}</p>
      <p>{content}</p>
    </div>
  );
}
