import * as React from 'react';
import styled from '@emotion/styled'
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center ;
`
const StyledIcon = styled.div``
const Parragraph = styled.p`
text-align: center;
font-size: 14px;
`
const IconText = (props) => {
  return (
    <Box>
      <StyledIcon>{props.icon}</StyledIcon>
      <Parragraph>{ props.content}</Parragraph>
    </Box>
  )
}
export default IconText;