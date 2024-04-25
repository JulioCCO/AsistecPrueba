import { useContext } from "react";
import DateContext from "../context/DateProvider";

export const useDateObj = () => {
    return (useContext(DateContext));
}

