import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { data } from './data';

export const MySelect = ({ selected, setSelected }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Location</InputLabel>
      <Select
        value={selected}
        label="Location"
        onChange={(e) => setSelected(e.target.value)}
      >
        {/* for the `data` below, use the `dataFromBlockChain`, see if you can do it by passing props or not */}
        {data.map((timeline) => (
          <MenuItem key={timeline.designation} value={timeline.designation}>
            {timeline.designation}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
