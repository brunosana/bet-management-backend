import React from 'react';

import {
    Container,
    Title,
    Icon
} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';

interface IOption extends RectButtonProps {
    title: string;
}

const OptionSelectButton: React.FC<IOption> = ({ title, ...rest }) => {
    return (
        <Container
            activeOpacity={0.7}
            {...rest}
        >
            <Title>
                {title}
            </Title>
            <Icon name="chevron-down"/>
        </Container>
    );
}

export { OptionSelectButton };