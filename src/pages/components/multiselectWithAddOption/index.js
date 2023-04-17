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
      </FormControl>
      <Button variant='contained' onClick={onHandleAddOption}><Plus /> Agregar componente</Button>
    </div>
  );
};

export default MultiSelectWithAddOption;
