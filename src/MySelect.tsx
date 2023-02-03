import Select from 'react-select';
import { data } from './data';

const options = data.map((i) => ({
  label: i.designation,
  value: i.designation,
}));

export const MySelect = ({ selected, setSelected }) => {
  return (
    <Select
      onChange={(option) => {
        setSelected(option?.value);
      }}
      options={options}
      value={options.find((i) => i.value === selected)}
    />
  );
};
