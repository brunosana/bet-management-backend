import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    `;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${ ({ theme }) => theme.colors.primary };
    justify-content: flex-end;
    align-items: center;
    `;

export const TitleWrapper = styled.View`
    align-items: center;
    margin-bottom: 45px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${ ({ theme }) => theme.colors.background };
    font-size: ${RFValue(19)}px;
    text-align: center;
    margin-top: 45px;
`;
 
export const SignInTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${ ({ theme }) => theme.colors.background };
    font-size: ${RFValue(15)}px;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 40px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({ theme }) => theme.colors.background};
`;
export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
`;
