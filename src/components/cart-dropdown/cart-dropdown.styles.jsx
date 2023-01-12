import styled from "styled-components";
import { BaseButton, InvertedButton, GoogleButton } from "../button/button.styles";

export const CartDropdownContainer = styled.div`
    position: absolute;
    width: 290px;
    height: 370px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;

    ${BaseButton},
    ${InvertedButton},
    ${GoogleButton} {
        margin-top: auto;
    }
`

export const EmptyMessage = styled.div`
    font-size: 18px;
    margin: 50px auto;
`

export const CartItemsContainer = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`