import { useState, createContext } from 'react';
import './cssTheme.css';

export const themes = { light: 'light', dark: 'dark' };

export const CSSThemeContext = createContext({
  theme: themes.light,
  setTheme: () => {},
});

function CSSThemed({ children }) {
  const [theme, setTheme] = useState(themes.light);

  return (
    <CSSThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app ${theme}`}>{children}</div>
    </CSSThemeContext.Provider>
  );
}

export default CSSThemed;
