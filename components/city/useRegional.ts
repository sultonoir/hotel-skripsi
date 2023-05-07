import {
  getAllDistricts,
  getAllProvinces,
  getAllRegencies,
} from "territory-indonesia";

export interface FormatRegional {
  value?: string;
  latlng?: [number, number];
}

interface Provinsi {
  name: string;
  latitude: number | null;
  longitude: number | null;
}

const useCountries = async (): Promise<{
  getAll: () => FormatRegional[];
  getByValue: (value: string) => FormatRegional | undefined;
}> => {
  const provinsi: Provinsi[] = await getAllRegencies();
  const formattedCountres: FormatRegional[] = provinsi.map((prov) => ({
    value: prov.name,
    latlng: [prov.latitude || 0, prov.longitude || 0],
  }));

  const getAll = () => formattedCountres;

  const getByValue = (value: string) => {
    return formattedCountres.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
