import { CustomContainer, Title } from "./styles";
import logo from '../../assets/images/tasks-logo.svg'
import { Button } from "../../components";
import { useAuth } from "../../hooks/useAuth";
export function Login() {
    const { singInWithGoogle } = useAuth();

    async function handleSignIn() {
        try {
            await singInWithGoogle()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CustomContainer>
            <img src={logo} alt="Logo tasks" width={166.67} height={148.04} />

            <Title variant="h2">
                Organize suas tarefas em seu <br />browser.
            </Title>
            <Button variant="contained" onClick={handleSignIn} style={{ width: '20rem' }}>
                Entrar com o google
            </Button>

        </CustomContainer>
    )
}
