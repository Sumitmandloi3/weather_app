import React, { useState } from 'react';
import Select, { InputActionMeta } from 'react-select';
import axios from 'axios';

interface CityOption {
  value: string;
  label: string;
}

const Autocomplete: React.FC = () => {
  const [options, setOptions] = useState<CityOption[]>([]);

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name&q=${inputValue}`
      );
      const cities = response.data.records.map((city: any) => ({
        value: city.name,
        label: `${city.name}, ${city.country}`,
      }));
      setOptions(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  return (
    <Select
      options={options}
      onInputChange={(inputValue: string, actionMeta: InputActionMeta) => {
        if (actionMeta.action === 'input-change') {
          loadOptions(inputValue || '');
        }
      }}
    />
  );
};

export default Autocomplete;
