import styled from "styled-components";

export const CategoryTitle = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 35px;
    margin-top: 40px;
    margin-bottom: 30px;
`;


export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`;