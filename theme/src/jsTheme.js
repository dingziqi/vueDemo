import { createContext } from 'react';

export const jsTheme = {
  color_primary: 'blue',
  color_wran: 'orange',
};

const JSThemeContext = createContext(jsTheme);

export default JSThemeContext;
