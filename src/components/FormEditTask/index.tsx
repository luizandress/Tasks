import { DialogProps, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLists } from '../../hooks/useLists';
import { ITaskProps } from '../../interfaces';
import {
    ContainerButtons,
    ContainerDialog,
    ButtonConfirme,
    ContainerInput,
    ButtonCancel,
    Content,
    Footer,
    Input,
    Title
} from './styles';

type Props = DialogProps & {
    task: ITaskProps,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormEditTask({ open, setOpen, task, ...rest }: Props) {
    const [nameTask, setNameTask] = useState<string>('');
    const [errorValidation, setErrorValidation] = useState<boolean>(false);
    const {editTask} = useLists();

    useEffect(() => {
        setNameTask(task?.description);
    }, [open])

    function handleChangeText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (nameTask.length > 60) {
            setErrorValidation(true);
        } else {
            setErrorValidation(false);
        }
        setNameTask(event.target.value as string);
    }

    async function handleEditTask() {
        try {
            if (nameTask?.trim() != null && nameTask != "") {
                await editTask(nameTask, task.uid!);
                setOpen(false);
                toast.success(`Tarefa editada com sucesso`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                return;
            }
            toast.warning(`Informe a descrição da tarefa`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error(`Não foi possível editar a tarefa`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    function handleCloseModal() {
        setOpen(false);
    }

    return (
        <ContainerDialog open={open} {...rest}>
            <Title>Editar tarefa</Title>
            <Content>
                <ContainerInput error={errorValidation}>
                    <Input
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da tarefa"
                        placeholder="Nome da tarefa"
                        fullWidth
                        value={nameTask}
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
                        onClick={() => handleEditTask()}
                    >Salvar</ButtonConfirme>
                    <ButtonCancel onClick={() => handleCloseModal()}>Cancelar</ButtonCancel>
                </ContainerButtons>
            </Footer>
        </ContainerDialog>
    );
}