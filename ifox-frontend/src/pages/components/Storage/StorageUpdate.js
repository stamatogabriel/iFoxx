import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Container, Input, Button, Loading, Title, theme, InputWrapper } from '~/components/styles';
import { ThemeProvider } from '@material-ui/core'

import api from '~/services/api'
import Zipcode from '~/services/zipcode'

import { Phone as PhoneMask, Cep as ZipcodeMask } from '~/components/Masks'

export default function StorageUpdate(props) {
    const [isLoading, setLoading] = useState()
    const [name, setCorporateName] = useState(props.storage.name)
    const [street, setStreet] = useState(props.storage.street)
    const [number, setNumber] = useState(props.storage.number)
    const [neighborhood, setNeighborhood] = useState(props.storage.neighborhood)
    const [city, setCity] = useState(props.storage.city)
    const [uf, setUf] = useState(props.storage.uf)
    const [zipcode, setzipcode] = useState(props.storage.zipcode)
    const [contact, setContact] = useState(props.storage.contact)
    const [phone, setPhone] = useState(props.storage.phone)

    useEffect(() => {
        async function getZipcode() {
            const newZipcode = zipcode.replace('.', '').replace('-', '');

            if (newZipcode.length === 8) {
                const address = await Zipcode.get(`/${newZipcode}/json`);

                if (address.data.erro === true) {
                    return toast.error('CEP não encontrado. Por favor, verifique e tente novamente.')
                }

                setStreet(address.data.logradouro);
                setNeighborhood(address.data.bairro);
                setCity(address.data.localidade);
                setUf(address.data.uf)
            }
        }

        getZipcode()
    }, [zipcode])

    async function updateStorage() {
        try {
            setLoading(true)
            await api.put(`/storages/${props.storage.id}`, {
                name,
                street,
                number,
                neighborhood,
                city,
                uf,
                zipcode,
                contact,
                phone,
            })
            props.getUser()
            toast.success(`Armazém ${name} foi atualizado com sucesso.`)
            props.handleClose()
        } catch (err) {
            setLoading(false)
            console.log(err)
            toast.error('Algo deu errado. Verifique os dados e tente novamente.')
        }
    }

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Title variant='h4'>
                    Editando {name}
                </Title>
                <Input
                    size='small'
                    label='Nome'
                    value={name}
                    variant='outlined'
                    onChange={e => setCorporateName(e.target.value)}
                />
                <InputWrapper>
                <Input
                    size='small'
                    variant='outlined'
                    onChange={e => setzipcode(ZipcodeMask(e.target.value))}
                    value={zipcode}
                    label='CEP'
                    style={{ width: '49.5%' }}
                    />
                <Input
                    size='small'
                    
                    InputLabelProps={{
                        shrink: street ? true : false,
                    }}
                    value={street}
                    variant='outlined'
                    onChange={e => setStreet(e.target.value)}
                    label='Endereço'
                    style={{ width: '49.5%' }}
                    />
                </InputWrapper>
                <InputWrapper>
                <Input
                    size='small'
                    variant='outlined'
                    onChange={e => setNumber(e.target.value)}
                    label='N°'
                    value={number}
                    style={{ width: '49.5%' }}
                    />
                <Input
                    size='small'
                    
                    InputLabelProps={{
                        shrink: neighborhood ? true : false,
                    }}
                    value={neighborhood}
                    variant='outlined'
                    onChange={e => setNeighborhood(e.target.value)}
                    label='Bairro'
                    style={{ width: '49.5%' }}
                    />
                </InputWrapper>
                <InputWrapper>
                <Input
                    size='small'
                    
                    InputLabelProps={{
                        shrink: city ? true : false,
                    }}
                    value={city}
                    variant='outlined'
                    onChange={e => setCity(e.target.value)}
                    label='Cidade'
                    style={{ width: '49.5%' }}
                    />
                <Input
                    size='small'
                    
                    InputLabelProps={{
                        shrink: uf ? true : false,
                    }}
                    value={uf}
                    variant='outlined'
                    onChange={e => setCity(e.target.value)}
                    label='Estado'
                    style={{ width: '49.5%' }}
                    />
                </InputWrapper>
                <InputWrapper>
                <Input
                    size='small'
                    variant='outlined'
                    onChange={e => setContact(e.target.value)}
                    value={contact}
                    label='Contato'
                    style={{ width: '49.5%' }}
                    />
                <Input
                    size='small'
                    variant='outlined'
                    onChange={e => setPhone(PhoneMask(e.target.value))}
                    value={phone}
                    label='Telefone'
                    style={{ width: '49.5%' }}
                    />
                </InputWrapper>
                {isLoading ? (
                    <Loading />
                ) : (
                        <Button
                            color="primary"
                            onClick={updateStorage}
                            variant="contained"
                        >
                            Salvar
                    </Button>
                    )}
            </ThemeProvider>
        </Container>
    );
}
