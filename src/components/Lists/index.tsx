
import SettingsIcon from '@mui/icons-material/Settings';
import { useLists } from '../../hooks/useLists';

import {
    ButtonList,
    ListHeader,
    ContainerIcon,
    ContainerList,
    ButtonListText,
} from './styles';


type Props = {
    setShowFormList: () => void;
}

export function Lists({setShowFormList}: Props) {
    const { lists, listSelected, setListSelected } = useLists();
    return (
        <ContainerList
            aria-labelledby="Lista-de-tarefas"
            subheader={
                <ListHeader id="nested-list-subheader">
                    Listas
                </ListHeader>
            }
        >
            {lists?.map((item) => {
                return <ButtonList
                    key={item.uid}
                    activemenu={listSelected?.uid == item.uid ? true : false}
                    onClick={() => setListSelected(item)}>
                    <ButtonListText primary={item.title} />
                    <ContainerIcon>
                        <SettingsIcon onClick={() => setShowFormList()}/>
                    </ContainerIcon>
                </ButtonList>
            })}

        </ContainerList>
    );
}