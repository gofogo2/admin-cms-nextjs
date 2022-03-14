interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button className=" h-10 w-64 rounded-sm bg-gray-300 text-sm font-medium text-white hover:bg-red-200 ">
      {text}
    </button>
  );
}
