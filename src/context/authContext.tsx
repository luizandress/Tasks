import { createContext, ReactNode, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { get, getDatabase, push, ref, set } from 'firebase/database';
import { IListProps, ITaskProps } from '../interfaces';


type AuthContextType = {
    user: User | undefined;
    loading: boolean;
    singInWithGoogle: () => Promise<void>;
    signOutWithGoogle: () => Promise<void>;
}

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;
                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account');
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });
            }
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    async function singInWithGoogle() {
        const auth = getAuth()
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        if (result.user) {
            const { displayName, photoURL, uid } = result.user;
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account');
            }

            try {
                let exists = false;
                const db = getDatabase()
                
                const referenceList = ref(db, `users/${uid}/lists`)

                await get(referenceList).then((snapshot) => {
                    if (snapshot.exists()) {
                        exists = true
                    }

                }).catch((error) => {
                    throw error
                });

                if (!exists) {
                    const initialList = {
                        title: 'Minhas tarefas',
                    } as IListProps;
                    const newList = await push(referenceList, initialList);
                    const referenceTask = ref(db, `users/${uid}/lists/${newList.key}/tasks`)
                    const initialTask = {
                        description: "Criar tarefas 😊",
                        done: false
                    } as ITaskProps
                    await push(referenceTask, initialTask);
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });

            } catch (error) {
                console.log("Erro ao criar usuário no banco");
                console.log(error);
            }
        }
    }

    async function signOutWithGoogle() {
        try {
            const auth = getAuth()
            await signOut(auth);
            setUser({} as User);
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, singInWithGoogle, signOutWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}