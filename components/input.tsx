import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps{
    label:string;
    name:string;
    type:string;
    register:UseFormRegisterReturn;
    required:boolean;
}

export default function Input({label,name,register,
type,
required

}:InputProps){
    return( <div className="flex flex-col  p-2 pt-0">
    <span className="p-1 text-xs font-extrabold text-gray-500">
      {label}
    </span>
    <input required={required} {...register} type={type} className=" peer h-8 border-2"></input>
    <span className="hidden text-xs font-medium text-red-600 peer-invalid:block">
      {name}
    </span>
  </div>);
}