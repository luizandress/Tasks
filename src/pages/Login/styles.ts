import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
export const CustomContainer = styled(Box)`
    background-color: ${({ theme }) => theme.palette.background.default};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-height: 100vh;
`;

export const Title = styled(Typography)`
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 2rem;
`;
