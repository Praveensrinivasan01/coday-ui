// src/popup/components/ReactSelect.jsx
import React from "react";
import Select from "react-select";

const ReactSelect = ({ options, selectedValues, onChange, placeholder, maxSelect }) => {
  const formattedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const formattedSelected = selectedValues.map((val) => ({ value: val, label: val }));

  const handleChange = (selected) => {
    const values = selected ? selected.map((opt) => opt.value) : [];
    if (!maxSelect || values.length <= maxSelect) {
      onChange(values);
    }
  };

  return (
    <Select
      options={formattedOptions}
      value={formattedSelected}
      onChange={handleChange}
      isMulti
      placeholder={placeholder || "Select..."}
    />
  );
};

export default ReactSelect;
