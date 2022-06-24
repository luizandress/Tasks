import { DialogProps, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLists } from '../../hooks/useLists';
import { ModalDeleteList } from '../ModalDeleteList';
import {
    ContainerButtons,
    ContainerDialog,
    ButtonConfirme,
    ContainerInput,
    ButtonDelete,
    ButtonCancel,
    Content,
    Footer,
    Input,
    Title
} from './styles';

type Props = DialogProps & {
    edit?: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormList({ open, setOpen, edit, setEdit, ...rest }: Props) {
    const [nameList, setNameList] = useState<string>('');
    const [errorValidation, setErrorValidation] = useState<boolean>(false);
    const { editList, addList, listSelected, lists } = useLists();
    const [showModalDelete, setShowmModalDelete] = useState(false);

    useEffect(() => {
        if (edit) {
            setNameList(listSelected.title);
            return;
        }
        setNameList('');
    }, [open])

    function handleChangeText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (nameList.length > 15) {
            setErrorValidation(true);
        } else {
            setErrorValidation(false);
        }
        setNameList(event.target.value as string);
    }

    async function handleEditList() {
        try {
            if (nameList?.trim() != null && nameList != "") {
                await editList(nameList);
                setNameList('');
                setEdit(false);
                setOpen(false);
                toast.success(`Lista editada com sucesso`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                return;
            }
            toast.warning(`Informe o nome da lista`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error(`Não foi possível editar lista`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }
    async function handleCreateList() {
        try {
            if (nameList?.trim() != null && nameList != "") {
                await addList(nameList);
                setNameList('');
                setOpen(false);
                toast.success(`Lista criada com sucesso`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                return;
            }
            toast.warning(`Informe o nome da lista`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error(`Não foi possível criar lista`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    function handleCloseModal() {
        if (edit) {
            setEdit(false);
            setOpen(false);
        }
        setOpen(false);
    }

    async function handleSave() {
        if(edit){
            await handleEditList();
            return;
        }
        await handleCreateList()

    }

    return (
        <ContainerDialog open={open} {...rest}>
            <Title>{edit ? "Editar" : "Adicionar"} lista</Title>
            <Content>
                <ContainerInput error={errorValidation}>
                    <Input
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da lista"
                        placeholder="Nome da lista"
                        fullWidth
                        value={nameList}
                        error={errorValidation}
                        aria-describedby="component-error-text"
                        onChange={handleChangeText}
                    />
                    <FormHelperText id="component-error-text">Limite de caracteres excedido.</FormHelperText>
                </ContainerInput>
            </Content>
            <Footer>
                <ContainerButtons>
                    <ButtonConfirme
                        disabled={errorValidation}
                        onClick={() => handleSave()}
                    >Salvar</ButtonConfirme>
                    <ButtonCancel onClick={() => handleCloseModal()}>Cancelar</ButtonCancel>
                </ContainerButtons>
                {(edit && lists.length > 1 ) &&
                    <ButtonDelete
                        onClick={() => setShowmModalDelete(true)}
                    >
                        Excluir {`  `}
                        {/* <DeleteIcon /> */}
                    </ButtonDelete>
                }
            </Footer>
            <ModalDeleteList
                setEdit={setEdit}
                setCloseModalEdit={setOpen}
                setOpen={setShowmModalDelete}
                open={showModalDelete}
            />
        </ContainerDialog>
    );
}