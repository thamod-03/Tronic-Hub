import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [ keyword, setKeyword ] = useState("");

  const capitalizeWords = (sentence) => {
    if (typeof sentence !== "string" || sentence.length === 0) {
      return "";
    }

    const words = sentence.toLowerCase().split(" ");

    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return ""; 
      }
    });

    return capitalizedWords.join(" ");
  };

  const value = {
    navigate,
    capitalizeWords,
    keyword,
    setKeyword,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
