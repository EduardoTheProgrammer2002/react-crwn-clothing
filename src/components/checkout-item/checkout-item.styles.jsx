import styled from "styled-components";

// child components
export const Name = styled.span`
    width: 23%;
`;

export const Arrow = styled.span`
    cursor: pointer;
    font-size: 25px;
`;
export const Value = styled.span`
    margin: 0 10px;
`;

export const Quantity = styled.span`
    width: 23%;
    display: flex;
    align-items: center;
    padding-left: 2px;
`;


export const Price = styled.span`
    width: 23%;
`;
export const RemoveButton = styled.div`
    padding-left: 12px;
    cursor: pointer;
`;

export const ImageContainer = styled.div`
    width: 23%;
    padding-right: 15px;

    img {
    width: 100%;
    height: 100%;
    }
`;

// parent component
export const CheckoutItemContainer = styled.div`
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;

`;

