import { SyntheticEvent, useState } from "react";
import { TFormValues } from "../services/types/data";

export function useForm(inputValues: TFormValues) {
  const [values, setValues] = useState<TFormValues>(inputValues);

  const handleChange = (e: SyntheticEvent) => {
    const {value, name} = e.target as HTMLInputElement;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
