import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ISetWidth {
    width?: number;
}

export const Container = styled.View<ISetWidth>`
    width: ${({ width }) => ((width && width > 0 ) ? width : 100)}%;
`;

export const Error = styled.Text`
    font-size: ${ RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.attention};
    margin: 7px 0px;
`;