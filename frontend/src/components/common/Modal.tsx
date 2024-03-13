import styled from 'styled-components'

export const Modal = styled.div`
    font-family : Pretendard;
    position : fixed;
    left : 0;
    bottom : 0;
    width : 100%;
    height : 200px;
    background-color : white;
    border-top-left-radius : 10px;
    border-top-right-radius: 10px;
    z-index:1000;

    margin-bottom : 72px;
    @media only screen and (max-width: 300px) {
        margin-bottom : 60px;
    }

    @media only screen and (min-width: 400px) {
        margin-bottom : 80px;
    }

    @media only screen and (min-width: 430px) {
        margin-bottom : 90px;
    }
    
    @media only screen and (min-width: 500px) {
        margin-bottom : 100px;
    }
`
//height @media 해줘야 됨