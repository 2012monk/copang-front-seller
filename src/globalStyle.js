import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyle = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    a:hover{
        text-decoration:none;
        color:inherit;
    }
    // *{
    //     box-sizing:boerder-box;
    // }
    
`;

export default globalStyle;
