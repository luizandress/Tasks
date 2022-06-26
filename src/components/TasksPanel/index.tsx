
import { useState } from 'react';
import {
    Task,
    Container,
    ButtonImg,
    TaskDescription,
    ContainerActions,
    TaskDescriptionDone,
    InputTask,
    Header,
    Title,
    ContainerList,
    ContainerControllerTask,
    ContainerTasks,
    HeaderTasks,
    NoTasksText,
} from './styles';
import { useLists } from '../../hooks/useLists';
import { InputAdornment } from '@mui/material';
import chackButton from '../../assets/images/buttonCheck.svg';
import chackDone from '../../assets/images/checkDone.svg';
import buttonDelete from '../../assets/images/delete.svg';
import buttonEdit from '../../assets/images/edit.svg';
import buttonAdd from '../../assets/images/buttonAddTask.svg';
import logo from '../../assets/images/tasks-logo.svg'

import { toast } from 'react-toastify';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ModalDeleteTask } from '../ModalDeleteTask';
import { FormEditTask } from '../FormEditTask';
import { ITaskProps } from '../../interfaces';

export function TasksPanel() {
    const { listSelected, doneTask, todoTask, addTask } = useLists();
    const [expandedTodo, setExpandedTodo] = useState<boolean>(true);
    const [expandedDone, setExpandedDone] = useState<boolean>(true);
    const [nameTask, setNameTask] = useState<string>('');
    
    const [uidTask, setUidTask] = useState<string>('');
    const [showModalDeleteTask, setShowModalDeleteTask] = useState<boolean>(false);

    const [editTask, setEditTask] = useState<ITaskProps>()
    const [showModalEditTask, setShowModalEditTask] = useState<boolean>(false);

    async function handleDoneTask(uid: string | undefined) {
        try {
            if (uid) await doneTask(uid);
        } catch (error) {
            toast.error(`Não foi possível marcar tarefa como concluída`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    async function handleTodoTask(uid: string | undefined) {
        try {
            if (uid) await todoTask(uid);
        } catch (error) {
            toast.error(`Não foi possível desmarcar tarefa como concluída`, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    async function handleAddTask() {
        if (nameTask.trim() !== '') {
            try {
                await addTask(nameTask)
                setNameTask('')
            } catch (error) {
                toast.error(`Não foi possível criar a tarefa`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
        }
    }

    function handleDeleteTask(uid: string) {
        setUidTask(uid);
        setShowModalDeleteTask(true);
    }

    function handleEditTask(task: ITaskProps){
        setEditTask(task)
        setShowModalEditTask(true)
    }

    return (
        <Container>
            <Header>
                <img src={logo} alt="Logo tasks" width={91.14} height={80.96} />
                <Title>{listSelected?.title}</Title>
            </Header>
            <ContainerList>
                <ContainerControllerTask>
                    <HeaderTasks onClick={() => setExpandedTodo(!expandedTodo)}>A fazer
                        {expandedTodo ? <ExpandLess /> : <ExpandMore />}
                    </HeaderTasks>
                    <ContainerTasks expanded={expandedTodo}>
                        
                        {
                        listSelected?.tasks?.length == 0 ? 
                            <NoTasksText>Sem tarefas por aqui 🤷‍♀️</NoTasksText>
                        :
                        listSelected?.tasks?.map((task, index) => {
                            if (!task.done)
                                return (
                                    <Task key={task.uid}>
                                        <ButtonImg src={chackButton} alt="Marcar como concluída" onClick={() => handleDoneTask(task.uid)} />
                                        <TaskDescription primary={task.description} />
                                        <ContainerActions>
                                            <ButtonImg src={buttonEdit} alt="Editar tarefa" onClick={() => handleEditTask(task)}/>
                                            <ButtonImg src={buttonDelete} alt="Excluir tarefa" onClick={() => handleDeleteTask(task.uid!)} />
                                        </ContainerActions>
                                    </Task>
                                )
                        })}
                    </ContainerTasks>
                </ContainerControllerTask>


                <ContainerControllerTask>
                    <HeaderTasks onClick={() => setExpandedDone(!expandedDone)}>Concluídas
                        {expandedDone ? <ExpandLess /> : <ExpandMore />}
                    </HeaderTasks>
                    <ContainerTasks expanded={expandedDone}>
                        {listSelected?.tasks?.map((task) => {
                            if (task.done)
                                return (
                                    <Task key={task.uid}>
                                        <ButtonImg src={chackDone} alt="Marcar com não concluída" onClick={() => handleTodoTask(task.uid)} />
                                        <TaskDescriptionDone primary={task.description} />
                                        <ContainerActions>
                                            <ButtonImg src={buttonEdit} alt="Editar tarefa" onClick={() => handleEditTask(task)}/>
                                            <ButtonImg src={buttonDelete} alt="Excluir tarefa" onClick={() => handleDeleteTask(task.uid!)} />
                                        </ContainerActions>
                                    </Task>
                                )
                        })}
                    </ContainerTasks>
                </ContainerControllerTask>

            </ContainerList>
            <InputTask
                value={nameTask}
                onChange={(e) => setNameTask(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <ButtonImg src={buttonAdd} alt='Adicionar tarefa' onClick={() => handleAddTask()} />
                        </InputAdornment>
                    )
                }}
            />
            <ModalDeleteTask
                open={showModalDeleteTask}
                setOpen={setShowModalDeleteTask}
                uid={uidTask}
            />
            <FormEditTask
                open={showModalEditTask}
                setOpen={setShowModalEditTask}
                task={editTask!}
            />
        </Container>
    );
}