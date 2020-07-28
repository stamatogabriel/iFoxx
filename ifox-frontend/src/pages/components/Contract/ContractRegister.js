import React, { useState, useRef, useEffect } from 'react';
import NumberFormat from '~/components/NumberFormat'
import { toast } from 'react-toastify';

import { Container, MenuItem, FormControl, Input, Button, Loading, Title, theme, Chip, Checkbox, InputWrapper } from '~/components/styles';
import { ThemeProvider, InputLabel, Select, Input as MaterialInput, FormControlLabel } from '@material-ui/core'

import api from '~/services/api'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(partner, partners, theme) {
    return {
        fontWeight:
            partners.indexOf(partner) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function ContractRegister(props) {
    const [storages, setStorages] = useState()

    const [isLoading, setLoading] = useState()
    const [contractNumber, setContractNumber] = useState()
    const [distributors, setDistributors] = useState([])
    const [volume, setVolume] = useState()
    const [unitaryPrice, setUnitaryPrice] = useState()
    const [products, setProducts] = useState([])
    const [spread, setSpread] = useState()
    const [brokerage, setBrokerage] = useState()
    const [storageCust, setStorageCust] = useState()
    const [freight, setFreight] = useState()
    const [notes, setNotes] = useState()
    const [comission, setComission] = useState(0)
    const [owner, setOwner] = useState(false)

    const [contractDistributor, setContractDistributor] = useState()
    const [storageContract, setStorageContract] = useState()
    const [productContract, setProductContract] = useState()
    const [partners, setPartners] = useState([])

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);


    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
        getInformations()
    }, [])

    async function getInformations() {
        const responseStorages = await api.get('/storages')
        const responseEnterprises = await api.get('/enterprises')
        const responseProducts = await api.get('/products')

        setDistributors(responseEnterprises.data)

        setStorages(responseStorages.data)
        setProducts(responseProducts.data)
    }

    const handleChange = event => {
        setStorageContract(event.target.value);
    };

    const handleChangeDistributor = event => {
        setContractDistributor(event.target.value);
    }

    const handleChangePartners = event => {
        setPartners(event.target.value)
    }

    const handleChangeProducts = event => {
        setProductContract(event.target.value)
    }

    async function register() {
        try {
            setLoading(true)
            const responseContract = await api.post('/contracts', {
                storage_id: storageContract,
                contract_number: contractNumber,
                enterprise_id: contractDistributor,
                product_id: productContract,
                volume,
                spread: owner === true ? 0 : spread,
                brokerage: owner === true ? 0 : brokerage,
                storage_cust: owner === true ? 0 : storageCust,
                freight:owner === true ? 0 :  freight,
                unitary_price: owner === true ? 0 : unitaryPrice,
                comission: owner === true ? comission : 0,
                notes
            })

            partners.map(async partner => {
                await api.post(`/contracts/${responseContract.data.id}/partners`, {
                    partner_id: partner
                })
            })

            props.getContracts()
            toast.success(`Contrato foi cadastrado com sucesso.`)
            props.handleClose()
        } catch (err) {
            setLoading(false)
            console.log(err)
            toast.error('Algo deu errado. Verifique os dados e tente novamente.')
        }
    }

    function getCorporanteName(value) {
        const name = distributors.filter(distributor => value === distributor.id)
        return name[0].corporate_name
    }

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Title variant='h4'>
                    Novo Contrato
                </Title>
                <Input
                    size='small'
                    label='Número do contrato'
                    variant='outlined'
                    onChange={e => setContractNumber(e.target.value)}
                    style={{ marginTop: 0 }}
                />
                <InputWrapper>

                    <FormControl variant="outlined" size='small' style={{ width: '49.5%', marginTop: 0 }}>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label" >
                            Produto
                    </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={productContract}
                            onChange={handleChangeProducts}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">
                                <em>Selecione o Produto do contrato</em>
                            </MenuItem>
                            {products && products.map(product =>
                                <MenuItem value={product.id}> {product.description} </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size='small' style={{ width: '49.5%', marginTop: 0 }}>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label" >
                            Armazém
                    </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={storageContract}
                            onChange={handleChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">
                                <em>Selecione o armázém do contrato</em>
                            </MenuItem>
                            {storages && storages.map(storage =>
                                <MenuItem value={storage.id}> {storage.name} </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </InputWrapper>
                <InputWrapper>

                    <FormControl variant="outlined" size='small' style={{ width: '49.5%', marginTop: 0 }} >
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Distribuidora
                    </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={contractDistributor}
                            onChange={handleChangeDistributor}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">
                                <em>Selecione a distribuidora do contrato</em>
                            </MenuItem>
                            {distributors && distributors.map(distributor =>
                                <MenuItem value={distributor.id}> {distributor.corporate_name} </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Input
                        style={{ width: '49.5%', marginTop: 0 }}
                        size='small'
                        type='number'
                        label='Volume'
                        variant='outlined'
                        onChange={e => setVolume(e.target.value)}
                    />
                </InputWrapper>
                {!owner &&
                    <>
                        <InputWrapper>
                            <Input
                                style={{ width: '49.5%', marginTop: 0 }}
                                size='small'
                                disabled={owner}
                                variant='outlined'
                                label="Preço por litro"
                                value={unitaryPrice}
                                onChange={e => setUnitaryPrice(e.target.value)}
                                InputProps={{
                                    inputComponent: NumberFormat,
                                }}
                            />

                            <Input
                                style={{ width: '49.5%', marginTop: 0 }}
                                size='small'
                                variant='outlined'
                                label="Valor Spread"
                                disabled={owner}
                                value={spread}
                                onChange={e => setSpread(e.target.value)}
                                InputProps={{
                                    inputComponent: NumberFormat,
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                style={{ width: '49.5%', marginTop: 0 }}
                                size='small'
                                variant='outlined'
                                label="Valor Corretagem"
                                disabled={owner}
                                value={brokerage}
                                onChange={e => setBrokerage(e.target.value)}
                                InputProps={{
                                    inputComponent: NumberFormat,
                                }}
                            />
                            <Input
                                style={{ width: '49.5%', marginTop: 0 }}
                                size='small'
                                variant='outlined'
                                label="Valor Armazenagem"
                                disabled={owner}
                                value={storageCust}
                                onChange={e => setStorageCust(e.target.value)}
                                InputProps={{
                                    inputComponent: NumberFormat,
                                }}
                            />
                        </InputWrapper>
                    </>
                }
                <InputWrapper>
                    {!owner &&
                        <Input
                            style={{ width: '49.5%', marginTop: 0 }}
                            size='small'
                            variant='outlined'
                            label="Valor Frete"
                            disabled={owner}
                            value={freight}
                            onChange={e => setFreight(e.target.value)}
                            InputProps={{
                                inputComponent: NumberFormat,
                            }}
                        />
                    }
                    {owner &&
                        <Input
                            style={{ width: '49.5%', marginTop: 0 }}
                            size='small'
                            variant='outlined'
                            label="Valor da comissão"
                            value={comission}
                            onChange={e => setComission(e.target.value)}
                            InputProps={{
                                inputComponent: NumberFormat,
                            }}
                        />}
                </InputWrapper>
                <InputWrapper>
                    <FormControlLabel
                        style={{ color: '#555' }}
                        control={
                            <Checkbox
                                checked={owner}
                                onChange={e => setOwner(!owner)}
                            />
                        }
                        label="Contrato de terceiros"
                    />
                </InputWrapper>
                <FormControl>
                    <InputLabel id="demo-mutiple-chip-label">Parceiros</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        variant="outlined"
                        multiple
                        value={partners}
                        onChange={handleChangePartners}
                        input={<MaterialInput id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div>
                                {selected.map(value => (
                                    <Chip key={value} label={getCorporanteName(value)} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {distributors.map(distributor => (
                            <MenuItem key={distributor.id} value={distributor.id} style={getStyles(distributor, partners, theme)}>
                                {distributor.corporate_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Input
                    multiline
                    rows="4"
                    label='Observações'
                    variant='outlined'
                    onChange={e => setNotes(e.target.value)}
                />
                {isLoading ? (
                    <Loading />
                ) : (
                        <Button
                            color="primary"
                            onClick={register}
                            variant="contained"
                        >
                            Salvar
                    </Button>
                    )}
            </ThemeProvider>
        </Container>
    );
}

