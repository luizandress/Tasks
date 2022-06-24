import { useContext } from "react";
import { ListContext } from "../context/listContext";

export function useLists() {
    const value = useContext(ListContext);
    return value;
}