import { createContext, ReactNode, useEffect, useState } from 'react';
import { IListProps, ITaskProps } from '../interfaces';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useAuth } from '../hooks/useAuth';
import { FirebaseError } from 'firebase/app';

type AuthContextType = {
    loadingLists: boolean;
    listSelected: IListProps;
    setListSelected: React.Dispatch<React.SetStateAction<IListProps>>;
    lists: IListProps[];
    addList(nameList: string): Promise<void>;
    editList(nameList: string): Promise<void>;
    removeList: () => Promise<void>;
    doneTask(uid: string): Promise<void>;
    removeTask(uid: string): Promise<void>;
    todoTask(uid: string): Promise<void>;
    addTask(nameTask: string): Promise<void>;
    editTask(nameTask: string, uid: string): Promise<void>;
}

type ListContextProviderProps = {
    children: ReactNode;
}

type FirebaseData = Record<string, {
    title: string,
    tasks: Record<string, {
        description: string,
        done: boolean
    }>
}>

export const ListContext = createContext({} as AuthContextType);

export function ListContextProvider(props: ListContextProviderProps) {
    const { user } = useAuth();
    const [loadingLists, setLoadingLists] = useState<boolean>(true);
    const [lists, setLists] = useState<IListProps[]>([] as IListProps[])
    const [listSelected, setListSelected] = useState<IListProps>({} as IListProps)

    useEffect(() => {
        try {
            if (user?.id) {
                const db = getDatabase();
                const listsRef = ref(db, `users/${user.id}/lists`);
                const unsubscribe = onValue(listsRef, (snapshot) => {
                    const data = snapshot.val() as FirebaseData;
                    if (data) {
                        let listsParsed = Object.entries(data).map(([KEY, VALUE]) => {
                            let tasks = [] as ITaskProps[];
                            for (const key in VALUE.tasks) {
                                tasks.push({ ...VALUE.tasks[key], uid: key } as ITaskProps)
                            }
                            return {
                                uid: KEY,
                                title: VALUE.title,
                                tasks: tasks,
                            } as IListProps
                        })
                        setLists(listsParsed);
                        console.log(listSelected);
                    }
                })
                return () => {
                    unsubscribe();
                }
            }
        } catch (error: FirebaseError | any) {
            console.log("Erro ao pegar dados", error.message)
        } finally {
            setLoadingLists(false)
        }
    }, [user])

    async function addList(nameList: string) {
        if (user?.id) {
            try {
                const db = getDatabase();
                const listRef = ref(db, `users/${user.id}/lists/`)
                await push(listRef, {
                    title: nameList,
                    tasks: []
                })
            } catch (error) {
                throw error
            }
        }
    }

    async function editList(nameList: string) {
        if (user?.id) {
            try {
                const db = getDatabase();
                const listRef = ref(db, `users/${user.id}/lists/${listSelected!.uid}/title`)
                set(listRef, nameList)
            } catch (error) {
                throw error
            }
        }
    }


    async function addTask(nameTask: string) {
        if (user?.id) {
            try {
                const db = getDatabase();
                const listRef = ref(db, `users/${user.id}/lists/${listSelected!.uid}/tasks`)
                push(listRef, {
                    description: nameTask,
                    done: false,
                } as ITaskProps)
            } catch (error) {
                throw error
            }
        }
    }

    async function removeList() {
        if (user?.id) {
            try {
                const db = getDatabase();
                const listRef = ref(db, `users/${user.id}/lists/${listSelected!.uid}`)
                await remove(listRef);
                setListSelected(lists[0]);
            } catch (error) {
                throw error
            }
        }
    }

    async function removeTask( uid: string) {
        if (user?.id) {
            try {
                const db = getDatabase();
                const taskRef = ref(db, `users/${user.id}/lists/${listSelected!.uid}/tasks/${uid}`)
                await remove(taskRef)
            } catch (error) {
                throw error
            }
        }
    }

    async function doneTask(uid: string) {
        if (user?.id) {
            try {
                const db = getDatabase();
                const listRef = ref(db, `users/${user.id}/lists/${listSelected!.uid}/tasks/${uid}/done`)
                set(listRef, true)
            } catch (error) {
                throw error

            }
        }
    }

    async function editTask(nameTask: string, uid: string) {
        if (user?.id) {
            try {
                const db = getDatabase();
                const taskRef = ref(db, `users/${user.id}/lists/${listSelected!.uid}/tasks/${uid}/description`)
                set(taskRef, nameTask)
            } catch (error) {
                throw error
            }
        }
    }

    async function todoTask(uid: string) {
        if (user?.id) {
            try {
                const db = getDatabase();
                const listRef = ref(db, `users/${user.id}/lists/${listSelected!.uid}/tasks/${uid}/done`)
                set(listRef, false)
            } catch (error) {
                throw error

            }
        }
    }

    return (
        <ListContext.Provider value={{
            lists,
            addList,
            addTask,
            editList,
            doneTask,
            editTask,
            todoTask,
            removeList,
            removeTask,
            listSelected,
            loadingLists,
            setListSelected,
        }}>
            {props.children}
        </ListContext.Provider>
    )
}