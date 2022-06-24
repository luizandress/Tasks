import { styled } from "@mui/material/styles";
import { List, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

interface ButtonProps extends ListItemButtonProps {
    activemenu: boolean
}

export const ContainerList = styled(List)`
    width: 100%;
    height: 80%;
    max-height: 80%;
    overflow-y: auto;
    background-color: white;
`;

export const ListHeader = styled(ListSubheader)`
    padding: 0;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1.9rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
`;

export const ButtonList = styled(ListItemButton)<ButtonProps>((props) => ({
    backgroundColor: props.activemenu ? props.theme.palette.primary.main : props.theme.palette.secondary.main,
    border: props.activemenu ? 0 : `1px solid ${props.theme.palette.primary.light}`,
    color: props.activemenu ? props.theme.palette.primary.light : props.theme.palette.text.primary,
    marginBottom: '1rem',
    borderRadius: '4px',
    "svg": {
        color: props.activemenu ? props.theme.palette.primary.contrastText : props.theme.palette.primary.main,
        display: 'none',
        fontSize: '2.5rem',
    },
    ":hover": {
        backgroundColor: props.activemenu ? props.theme.palette.primary.main : props.theme.palette.secondary.main,
        filter: 'brightness(0.8)', 
        "svg": {
             display: 'block',
        },
    }
}))

export const ButtonListText = styled(ListItemText)`
    color: inherit;
    & span {
        font-size: 13px;
    }
`;

export const ContainerIcon = styled(ListItemIcon)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end !important;
    color: inherit;
`;