import { Button } from '@material-ui/core'
import styled from 'styled-components';

const StyledButton = styled(Button)`
    background-color: ${props => {
      if (props.colorButton === 'error')
        return '#A81008'

      if (props.colorButton === 'success')
        return '#093313'

      if (props.colorButton === 'warn')
        return '#E6C300'

      else 
        return  '#AB3229'
    }} !important;
    margin-top: 20px !important;
    color: ${props => props.colorButton === 'warn' ? '#222' : '#fff'} !important;
    font-weight: bold;
    height: 50px;
    width: 90%;
    &:hover {
        background-color: ${props => {
      if (props.colorButton === 'error')
        return '#E8170C'

      if (props.colorButton === 'success')
        return '#0B4017'

      if (props.colorButton === 'warn')
        return '#FFD900'

      else 
        return  '#AB3211'
    }} !important;
  }
`;

export default StyledButton