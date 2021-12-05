import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

interface IProps extends RectButtonProps{
    title: string;
    svg: React.FC<SvgProps>;
}
import {
    Button,
    ImageContainer,
    Title
} from './styles';

const SignInSocialButton: React.FC<IProps> = ({ title, svg: Svg, ...rest }) => {
    return (
        <Button {...rest}>
            <ImageContainer>
                <Svg />
            </ImageContainer>
            <Title>
                {title}
            </Title>
        </Button>
    );
}

export { SignInSocialButton }