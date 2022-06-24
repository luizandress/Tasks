import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Button } from "@mui/material";

export const CustomBox = styled(Box)`
    background-color: ${({ theme }) => theme.palette.background.default};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-height: 100vh;
    max-width: 100vw;
    overflow: auto;
`;

export const CustomContainer = styled(Container)`
    height: 100vh;
    display: flex;
    flex-direction: row;
    gap: 5rem;
`;



export const Sidebar = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 220px;
    gap: 1rem;
    height: 100vh;
    max-height: 100vh;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding: 1rem;
`;

export const ContainerInfoUser = styled(Box)`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 1.2rem;
`;

export const Photo = styled('img')`
    border-radius: 7rem;
    height: 70px;
    width: 70px;
`;

export const Name = styled(Typography)`
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
`;

export const ButtonSignOut = styled(Button)`
    color: ${({ theme }) => theme.palette.error.main};
    background-color: ${({ theme }) => theme.palette.error.light};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: none;
    font-size: 1.4rem;
    width: 100%;
    max-width: 11.8rem;
    max-height: 2.6rem;
    :hover {
        background-color: ${({ theme }) => theme.palette.error.light};
        filter: brightness(.9);
    }
`;


export const ButtonAddList = styled(Button)`
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.primary.light};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: none;
    font-size: 1.8rem;
    width: 100%;
    :hover {
        background-color: ${({ theme }) => theme.palette.primary.light};
        filter: brightness(.8);
    }
`;