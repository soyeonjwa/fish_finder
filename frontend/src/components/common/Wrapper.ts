import styled from 'styled-components';

interface WrapperProps{
    width? : string;
    height? : string;
    margin? : string;
}


export const Wrapper = styled.div<WrapperProps>`
    width : ${props => props.width? props.width : '90%'};
    height : ${props => props.height? props.height : 'auto'};
    margin : ${props => props.margin? props.margin : '0% 5% 0% 5%'};
`

export const NavBarWrapper = styled(Wrapper)`
    padding-bottom : 72px;

    @media only screen and (max-width: 300px) {
    padding-bottom : 60px;
    }

    @media only screen and (max-width: 400px) {
    padding-bottom : 80px;
    }

    @media only screen and (max-width: 450px) {
    padding-bottom : 90px;
    }

    @media only screen and (max-width: 500px) {
    padding-bottom : 100px;
    }
`
