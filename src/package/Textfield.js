import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CustomizedTextField({ label, data, type, onChange, minWidth }) {
  const [value, setValue] = React.useState([]);

  const options = () => {
    return data.map((role) => ({ title: role }));
  };
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (type === 'search') {
      onChange(event.target.value);
    } else {
      onChange(newValue.map((option) => option.title));
    }
  };

  const getOptionLabel = (option) => {
    if (!option) {
      return ''; // Handle empty options gracefully
    }
    return typeof option === 'string' ? option : option.title;
  };

  return (
    <Autocomplete
      multiple={type !== 'search'}
      id={`${type}-tags-demo`}
      value={value}
      onChange={handleChange}
      options={options()}
      getOptionLabel={getOptionLabel}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={typeof option === 'string' ? option : option.title}
            {...getTagProps({ index })}
            
          />
        ))
      }
      renderInput={(params) => (
        type === 'search' ? (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            style={{ minWidth: minWidth || 200 }} // Set the minWidth prop here
          />
        ) : (
          <TextField {...params} label={label} style={{ minWidth: minWidth || 200 }} /> // Set the minWidth prop here
        )
      )}
    />
  );
}