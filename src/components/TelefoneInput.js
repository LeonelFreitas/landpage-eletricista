import React from "react";
import MaskedInput from "react-text-mask";

const TelefoneInput = ({ name, value, onChange, required }) => {
  return (
    <MaskedInput
      mask={[
        "(",
        /[0-9]/,
        /[0-9]/,
        ")",
        " ",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
      ]}
      placeholder="(XX) XXXXX-XXXX"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
    />
  );
};

export default TelefoneInput;