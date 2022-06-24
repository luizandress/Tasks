import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField
} from "@mui/material";

export const ContainerDialog = styled(Dialog)`
    & > div > div{
        background-color: ${({ theme }) => theme.palette.background.default};
        max-width: 35rem;
        width: 100% ;
    }
`;

export const Title = styled(DialogTitle)`
    text-align: center;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 600;
    font-size: 2.4rem;
`;

export const Content = styled(DialogContent)`
    width: 100%;
`;

export const ContainerInput = styled(FormControl)`
    width: 100%;
`;

export const Input = styled(TextField)`
    & label {
        color: ${({ theme }) => theme.palette.divider};
    }
    & input{
        width: 100%;
    }
    & input:valid + fieldset {
        border-color: ${({ theme }) => theme.palette.divider};
        border-width: 2px;
    }

    & input:focus + fieldset {
        border-color: ${({ theme }) => theme.palette.primary.contrastText};
    }

    & .MuiInputBase-input {
        background-color: ${({ theme }) => theme.palette.secondary.main};
    }

    & input:invalid + fieldset {
        border-color: red;
        border-width: 2px;
    }
`;

export const Footer = styled(DialogActions)`
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    padding: 2rem 2.4rem;
    padding-top: 0;
    gap: 1rem;
`;

export const ContainerButtons = styled(Box)`
    display: flex;
    gap: 1rem;
    width: 100%;
`

export const ButtonCancel = styled(Button)`
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.primary.light};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: none;
    font-size: 2rem;
    width: 100%;
    max-height: 5rem;
    :hover {
        background-color: ${({ theme }) => theme.palette.primary.light};
        filter: brightness(.9);
    }
`;

export const ButtonConfirme = styled(Button)`
    color: ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.primary.main};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: none;
    font-size: 2rem;
    max-height: 5rem;
    width:100% ;
    :hover {
        background-color: ${({ theme }) => theme.palette.primary.main};
        filter: brightness(.9);
    }
    :disabled {
        background-color: ${({ theme }) => theme.palette.primary.contrastText};
        color: white;
    }
`;

export const ButtonDelete = styled(Button)`
    color: white;
    background-color: #C83E3E;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: none;
    font-size: 2rem;
    max-height: 5rem;
    width:100% ;
    :hover {
        background-color: #C83E3E;
        filter: brightness(.9);
    }
`;

