import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const ButtonPurple = styled(Button)`
    color: ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.primary.main};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: none;
    font-size: 1.2rem;
`;