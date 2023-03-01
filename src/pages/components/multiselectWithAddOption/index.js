import React from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Chip, InputAdornment
} from '@mui/material';

import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'

const MultiSelectWithAddOption = ({
  options, //options
  onOptionChange, //select on chnange
  value, //value select

  newOption, // new option of text
  onHandleNewOptionChange, //handle of change of text
  onHandleAddOption, // only action that push new value

  onCleanOptions, //clean option
}) => { 
  return (
    <div style={{ marginTop: '5px' }}>
      <FormControl fullWidth>
        <InputLabel id="select-multiple-label">Components principales</InputLabel>
        <Select
          label='Components principales'
          labelId="select-multiple-label"
          multiple
          value={value}
          onChange={onOptionChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((option, i) => (
                <Chip key={i} label={option.value} />
              ))}
            </Box>
          )}
          endAdornment={
            <InputAdornment  position="end">
              <Close style={{ marginRight: '15px', cursor: 'pointer' }} onClick={onCleanOptions} />
            </InputAdornment>
          }
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Agregar opcion"
        value={newOption}
        onChange={onHandleNewOptionChange}
        margin="normal"
        fullWidth
      />
      <Button variant='contained' onClick={onHandleAddOption}><Plus /> Agregar componente</Button>
    </div>
  );
};

export default MultiSelectWithAddOption;