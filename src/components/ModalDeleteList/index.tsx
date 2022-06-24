import { DialogProps } from '@mui/material';

import { toast } from 'react-toastify';
import { useLists } from '../../hooks/useLists';
import {
    ButtonCancel,
    ButtonDelete,
    ContainerButtons,
    ContainerDialog,
    Content,
    Footer,
    Title
} from './styles';

type Props = DialogProps & {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCloseModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalDeleteList({ open, setOpen, setEdit, setCloseModalEdit, ...rest }: Props) {
    const { removeList } = useLists()

    function handleCloseModal() {
        setOpen(false);
    }

    async function handleDeleteList() {
        try {
            await removeList();
            setOpen(false);
            setCloseModalEdit(false);
            setEdit(false);
            toast.success(`Lista deletada com sucesso`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error(`Não foi possível deletar lista`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    return (
        <ContainerDialog open={open} {...rest}>
            <Title>Excluir lista</Title>
            <Content>
                Deseja mesmo excluir essa lista?
            </Content>
            <Footer>
                <ContainerButtons>
                    <ButtonDelete
                        onClick={() => handleDeleteList()}
                    >
                        Excluir lista{`  `}
                    </ButtonDelete>
                    <ButtonCancel
                        onClick={() => handleCloseModal()}
                    >Cancelar
                    </ButtonCancel>
                </ContainerButtons>
            </Footer>
        </ContainerDialog>
    );
}