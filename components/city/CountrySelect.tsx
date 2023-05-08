import { useState, useEffect } from "react";
import useCountries, { FormatRegional } from "./useRegional";
import Select from "react-select";

interface CountrySelectProps {
  value?: FormatRegional;
  onChange: (value: FormatRegional) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const [countries, setCountries] = useState<FormatRegional[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await useCountries();
      setCountries(data.getAll()); // simpan data ke state setelah Promise selesai di-resolve
    };

    fetchData();
  }, []);

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={countries}
        value={value}
        onChange={(value) => onChange(value as FormatRegional)}
        formatOptionLabel={(option: any) => <p>{option.value}</p>}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
