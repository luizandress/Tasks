import { ITaskProps } from "./ITasks";

export interface IListProps {
    uid: string;
    title: string;
    tasks?: ITaskProps[];
}