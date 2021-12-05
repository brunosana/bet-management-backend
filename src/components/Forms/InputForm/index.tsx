import React from 'react';

import {
    Container,
    Error
} from './styles';

import { Input  } from '../Input';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

interface IInput extends TextInputProps {
    control: Control;
    name: string;
    error: string;
    width?: number;
}

const InputForm: React.FC<IInput> = ({
    control,
    name,
    error,
    width,
    ...rest
}) => {
    return (
        <Container width={width} >
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}

export { InputForm };