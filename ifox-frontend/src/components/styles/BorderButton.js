import { Button } from '@material-ui/core'
import styled from 'styled-components';

const BorderButton = styled(Button)`
    border: 1px solid ${props => {
      switch(props.colorButton){
        case 'green':
          return '#093313 !important'
          
        default: 
          return '#2341E8 !important';
      }  
    }} ;
    color: ${props => {
      switch(props.colorButton){
        case 'green':
          return '#093313 !important'
          
        default: 
          return '#2341E8 !important';
      }  
    }} 
    background-color: #fff !important;
    margin-top: 20px !important;
    height: 45px;
    width: 25%;
    &:hover {
        background-color: ${props => {
      switch(props.colorButton){
        case 'green':
          return '#093313 !important'
          
        default: 
          return '#2341E8 !important';
      }  
    }} ;
        color: #fff !important;
  }
`;

export default BorderButton