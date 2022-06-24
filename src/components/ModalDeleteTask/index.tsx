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
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    uid: string,
}

export function ModalDeleteTask({ open, setOpen, uid, ...rest }: Props) {
    const { removeTask } = useLists()

    function handleCloseModal() {setOpen(false)}

    async function handleDeleteTask() {
        try {
            await removeTask(uid);
            setOpen(false);
            toast.success(`Tarefa deletada com sucesso`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error(`Não foi possível deletar tarefa`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    return (
        <ContainerDialog open={open} {...rest}>
            <Title>Excluir tarefa</Title>
            <Content>
                Deseja mesmo excluir essa tarefa?
            </Content>
            <Footer>
                <ContainerButtons>
                    <ButtonDelete
                        onClick={() => handleDeleteTask()}
                    >
                        Excluir tarefa{`  `}
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