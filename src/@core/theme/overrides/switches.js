const Switch = theme => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-track': {
            backgroundColor: `rgb(${theme.palette.customColors.mainCustom})`
          }
        }
      }
    }
  }
}

export default Switch
