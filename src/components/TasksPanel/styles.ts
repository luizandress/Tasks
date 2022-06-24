import {
    Box,
    ListItem,
    TextField,
    ListItemText,
    Typography,
    BoxProps,
    Button,
} from '@mui/material';
import { styled } from "@mui/material/styles";

interface ContainerTasksProps extends BoxProps {
    expanded: boolean
}
export const Container = styled(Box)`
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100vh;
    overflow-y: auto;
    margin: 0;
    padding: 0;
`;

export const Title = styled(Typography)`
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 2.4rem;
    font-weight: 500;
    text-align: left;
    margin-bottom: 4rem;
    margin-top: 1.4rem;
    border-bottom: 2px solid ${({ theme }) => theme.palette.divider} ;
`;

export const Header = styled(Box)`
    margin-top: 1.6rem;
    & img {
        margin-left: -5px;
    }
`;


export const TaskDescription = styled(ListItemText)`
    span{
        font-size: 1.5rem;
        font-weight: 400;
    }
`;

export const TaskDescriptionDone = styled(ListItemText)`
    span{
        font-size: 1.5rem;
        font-weight: 400;
        text-decoration: line-through;
    }
`;

export const ButtonImg = styled('img')`
    margin-right: 1rem;
    transition: filter 1s;
    :hover {
        filter: brightness(.8);
        cursor: pointer;
    }
`;

export const ContainerActions = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Container taks
export const ContainerControllerTask = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ContainerTasks = styled(Box)<ContainerTasksProps>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: props.expanded ? 'auto' : '0px',
    overflow: 'hidden',
}))

export const ContainerList = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100vh - 25rem);
    overflow: auto;
`;

export const InputTask = styled(TextField)`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.background.default} ;
    padding: 0;
    .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
           border: .2rem solid #E5E5F1;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.palette.primary.main};
    }
    img {
        margin: 0;
    }
`;

export const HeaderTasks = styled(Button)`
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    text-transform: none;
    color: ${({theme}) => theme.palette.secondary.contrastText};
    font-size: 1.6rem;
`;


export const Task = styled(ListItem)`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 0.4rem;
    padding: 1.3rem; 
    border: 1px solid  transparent;

    span {
        
    }

    div img {
        display: none;
    }

    :hover {
        border: 1px solid  ${({ theme }) => theme.palette.primary.light};
        div > img {
            display: block;
        }
    }
`;

// Sem tasks
export const NoTasksText = styled('span')`
    background-color: #FFFDCE;
    font-size: 1.8rem;
    text-align: center;
    padding: 1rem;
    width: 100%;
    border-radius: .4rem;
`;