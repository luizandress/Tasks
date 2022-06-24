import { useAuth } from "../../hooks/useAuth";
import {
    FormList,
    Lists,
    TasksPanel
} from "../../components";
import {
    ButtonAddList,
    ButtonSignOut,
    ContainerInfoUser,
    CustomBox,
    CustomContainer,
    Name,
    Photo,
    Sidebar,
} from "./styles";
import { useLists } from "../../hooks/useLists";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Home() {
    const [showFormList, setShowFormList] = useState(false);
    const [edit, setEdit] = useState<boolean>(false);
    const { signOutWithGoogle, user } = useAuth();
    const { lists, listSelected, setListSelected } = useLists();

    useEffect( () => {
        if(listSelected){
            const listAlter = lists.filter((list) => list.uid === listSelected?.uid)[0]
            setListSelected(listAlter)
            return;
        }
        setListSelected(lists[0])
    }, [lists])

    async function handleSignOut() {
        try {
            await signOutWithGoogle()
        } catch (error) {
            console.log(error);
            console.log('Não foi possível sair');
        }
    }

    function handleOpenModalEdit() {
        setEdit(true);
        setShowFormList(true);
    }

    return (
        <CustomBox>
            <CustomContainer maxWidth='lg'>


                    <TasksPanel />

                <Sidebar>
                    <ContainerInfoUser>
                        <Photo
                            src={user?.avatar}
                            alt="Foto de perfil do usuário"
                        />
                        <Name>
                            {user?.name}
                        </Name>
                        <ButtonSignOut onClick={handleSignOut}>
                            Sair
                        </ButtonSignOut>
                    </ContainerInfoUser>
                    <Lists
                        setShowFormList={handleOpenModalEdit}
                    />
                    <ButtonAddList onClick={() => setShowFormList(true)}>
                        Adicionar lista
                    </ButtonAddList>
                </Sidebar>
            </CustomContainer>
            <FormList
                setEdit={setEdit}
                edit={edit}
                setOpen={setShowFormList}
                open={showFormList}
            />
            <ToastContainer autoClose={2000} />
        </CustomBox>
    )
}