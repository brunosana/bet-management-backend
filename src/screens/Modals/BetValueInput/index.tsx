import React from 'react';

import {
    Container,
    Title,
    Content,
    Input,
    Form
} from './styles'

import { Button } from '../../../components/Forms/Button';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';
import { main } from '../../../global/styles/theme';

const schema = Yup.object().shape({
    betValue: Yup.number()
    .required('Quantidade deve ser válida')
    .min(0.1)
}).required();

interface IFormData {
    betValue: number;
}

interface IBetValueInput {
    closeModal: () => void;
    setBetValue: (value: number)=> void;
}

const BetValueInput: React.FC<IBetValueInput> = ({ closeModal, setBetValue }) =>{

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleCreateBet({ betValue }: IFormData) {
        setBetValue(betValue);
        closeModal();
    }

    return (
        <Container>
            <Content>
                <Title>Insira o valor da aposta</Title>
                <Form>
                    <Input
                        name='betValue'
                        control={control}
                        error={errors.betValue && errors.betValue.message}
                        keyboardType="numeric"
                        placeholder="Valor da Aposta"
                        placeholderTextColor={main.colors.shape}
                        />
                    <Button
                        title="Finalizar"
                        onPress={handleSubmit(handleCreateBet)}
                    />
                </Form>
            </Content>
        </Container>
    );
}

export { BetValueInput }