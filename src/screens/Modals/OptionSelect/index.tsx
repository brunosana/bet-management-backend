import React, { useState } from 'react';
import { IOption } from '../../../shared/interfaces/IOption';

import {
    Container,
    Header,
    Title,
    List,
    Category,
    Icon,
    Name,
    Separator
} from './styles';

interface IOptionSelect {
    options: Array<IOption>;
    setOption: (option: IOption) => void;
    closeSelectCategory: () => void;
}

const OptionSelect: React.FC<IOptionSelect> = ({ options, setOption, closeSelectCategory }) => {

    function handleSetOption(id: string){
        const option = options.find(option => option.id === id);
        if(option){
            setOption(option);
        }
        closeSelectCategory();
    }

    return (
        <Container>
            <Header>
                <Title>Selecionar Opção</Title>
            </Header>
            <List
                data={options}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <Category
                        onPress={ () => handleSetOption(item.id) }
                    >
                        <Icon name="arrowright"/>
                        <Name>{item.name}</Name>
                    </Category>
                }
                ItemSeparatorComponent={() => <Separator />}
            />
        </Container>
    );
}

export { OptionSelect };