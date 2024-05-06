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
    // Convert the newValue to a Set to remove duplicates
    const uniqueValues = [...new Set(newValue.map((option) => option.title))];

    setValue(uniqueValues.map((title) => ({ title })));

    if (type === 'search') {
      onChange(event.target.value);
    } else {
      onChange(uniqueValues);
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
      size="small"
      style={{ minWidth: minWidth || "150px" }}
      multiple={type !== 'search'}
      id={`${type}-tags-demo`}
      value={value}
      onChange={handleChange}
      options={options()}
      getOptionLabel={getOptionLabel}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip key={index} size="small" label={typeof option === 'string' ? option : option.title} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) =>
        type === 'search' ? (
          <TextField {...params} label={label} variant="outlined" />
        ) : (
          <TextField {...params} label={label} />
        )
      }
    />
  );
}