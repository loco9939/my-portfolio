// import { TextField } from "@mui/material";
// import { useRef } from "react";

// export const NumberInput: typeof TextField = ({ ...props }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const formatNumber = (value) => {
//     // 숫자가 아닌 문자열이 입력된 경우 빈 문자열 반환
//     if (isNaN(value) || value === "") return "";
//     // 숫자를 형식화하여 천단위 쉼표를 포함된 문자열로 반환
//     return parseFloat(value).toLocaleString();
//   };
//   const onFocus = () => {
//     if (inputRef.current) {
//       inputRef.current.value = inputRef.current.value.replace(/,/g, "");
//     }
//   };
//   const onBlur = () => {
//     if (inputRef.current) {
//       inputRef.current.value = formatNumber(inputRef.current.value);
//     }
//   };
//   console.log("defaultValue: ", props.defaultValue);
//   return (
//     <TextField
//       {...props}
//       inputRef={inputRef}
//       onFocus={onFocus}
//       onBlur={onBlur}
//     />
//   );
// };

import { forwardRef, ForwardRefRenderFunction, useRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
const NumberInput: ForwardRefRenderFunction<
  HTMLInputElement,
  TextFieldProps
> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatNumber = (value: string) => {
    // 숫자가 아닌 문자열이 입력된 경우 빈 문자열 반환
    if (isNaN(Number(value)) || value === "") return "";
    // 숫자를 형식화하여 천단위 쉼표를 포함된 문자열로 반환
    return parseFloat(value).toLocaleString();
  };

  const onFocus = () => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.value.replace(/,/g, "");
    }
  };

  const onBlur = () => {
    if (inputRef.current) {
      inputRef.current.value = formatNumber(inputRef.current.value);
    }
  };

  return (
    <TextField
      {...props}
      inputRef={(input) => {
        if (typeof ref === "function") {
          ref(input);
        } else if (ref) {
          ref.current = input;
        }
        inputRef.current = input;
      }}
      // defaultValue={formatNumber(props.defaultValue)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default forwardRef(NumberInput);
