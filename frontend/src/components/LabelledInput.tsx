import { ChangeEvent } from "react";

interface LabelledInputType {
    placeholder: string;
    label: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }
  
const LabelledInput = ({
    type,
    placeholder,
    label,
    onChange,
  }: LabelledInputType) => {
    return (
      <div className="w-72 py-2">
        <h3 className="font-lg text-lg mb-1">{label}</h3>
        <input
          type={type || "text"}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full outline-none border border-gray-500 p-2 rounded-xl"
        />
      </div>
    );
  }

  export default LabelledInput;