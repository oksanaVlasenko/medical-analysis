import { createContext } from "react";

//function noop() {}

export const ItemContext = createContext({
  items: null,
  gender: null,
  result: null,
  analysis: null,
});
