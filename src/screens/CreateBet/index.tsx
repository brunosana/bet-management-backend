import React, { useState, useEffect } from 'react';

import { 
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    FormMiddle,
    Bets
} from './styles';

import { OptionSelectButton } from '../../components/Forms/OptionSelectButton';
import { Button } from '../../components/Forms/Button';
import { OptionSelect } from '../Modals/OptionSelect';
import { BetValueInput } from '../Modals/BetValueInput';
import { InputForm } from '../../components/Forms/InputForm';
import { IOption } from '../../shared/interfaces/IOption';
import { TeamRow } from '../../components/TeamRow';
import { IBet } from '../../shared/interfaces/IBet';

interface IFormData {
    team: string;
    odds: number;
}

const schema = Yup.object().shape({
    team: Yup.string().required('Necessário inserir o nome do time'),
    odds: Yup.number()
        .required('Necessário inserir Odds')
        .moreThan(1.0, 'A Odds precisa ter um valor válido (Maior que 1)')
        .typeError('Odds aceita apenas valores numéricos')
}).required();

const CreateBet: React.FC = () => {

    const [options, setOptions] = useState<Array<IOption>>([
        {
            id: '1',
            name: '+1,5'
        },
        {
            id: '2',
            name: '+2,5'
        },
        {
            id: '3',
            name: '+3,5'
        },
        {
            id: '4',
            name: '+4,5'
        },
    ]);

    const [option, setOption] = useState<IOption>(options[0]);
    const [bet_value, setBetValue] = useState(0);
    const [bets, setBets] = useState<Array<IBet['bets']> | []>([]);
    
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [showBetValueInputModal, setShowBetValueInputModal] = useState(false);


    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleCloseBetValueInput(){
        setShowBetValueInputModal(false);
    }

    function handleOpenBetValueInput(){
        setShowBetValueInputModal(true);
    }

    function handleCloseSelectCategory(){
        setShowOptionModal(false);
    }

    function handleOpenSelectOptionModal() {
        setShowOptionModal(true);
    }

    function handleRegister(form: IFormData){
        let { team, odds } = form;
        odds = parseFloat(odds.toString().replace(',', '.'));

        const data = {
            option,
            team,
            odds
        }
        setBets(oldState => [...oldState, data]);
        reset();
    }

    function handleEditBet(id: number){
        let editBet = bets[id];
        bets.splice(id, 1);
        setBets([...bets]);
        setValue('team', editBet.team);
        setOption(editBet.option);
        setValue('odds', editBet.odds.toString());
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header>
                    <Title>Cadastrar Aposta</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="team"
                            control={control}
                            autoCapitalize="words"
                            placeholder="Team"
                            error={errors.team && errors.team.message}
                            />
                        <FormMiddle>
                            <OptionSelectButton
                                title={option.name}
                                onPress={handleOpenSelectOptionModal}
                                
                                />
                            <InputForm
                                width={48.5}
                                error={errors.odds && errors.odds.message}
                                name="odds"
                                control={control}
                                keyboardType="numeric"
                                placeholder="Odds"
                            />  
                        </FormMiddle>
                    <Button
                        title="Adicionar"
                        onPress={handleSubmit(handleRegister)}
                    />
                    </Fields>
                    {
                    bets &&
                    <Bets
                        showsVerticalScrollIndicator={false}
                    >
                        {
                        bets.map((bet, index) =>
                            <TeamRow
                                onPress={() => handleEditBet(index)}
                                team={bet.team}
                                odds={bet.odds}
                                option={bet.option}
                            />
                        )
                        }
                    </Bets>
                    }
                    <Button
                        onPress={handleOpenBetValueInput}
                        title="Próximo"
                        />
                </Form>
                <Modal visible={showOptionModal} >
                    <OptionSelect
                        options={options}
                        setOption={setOption}
                        closeSelectCategory={handleCloseSelectCategory}
                        />
                </Modal>

                <Modal
                    visible={showBetValueInputModal}
                    transparent
                >
                    <BetValueInput
                        setBetValue={setBetValue}
                        closeModal={handleCloseBetValueInput}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}

export { CreateBet }