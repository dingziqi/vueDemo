import { useContext } from 'react';
import { CSSThemeContext, themes } from './cssTheme';
import JSThemeContext from './jsTheme';
import './App.css';

function App() {
  const { theme, setTheme } = useContext(CSSThemeContext);
  const jsTheme = useContext(JSThemeContext);

  console.log(jsTheme);

  return (
    <div>
      <h1 className="title">Themed App</h1>

      <h2>CSS Themed App</h2>
      {Object.keys(themes).map((themeKey) => (
        <label key={themeKey}>
          <input
            type="radio"
            radioGroup="theme"
            checked={themeKey === theme}
            onChange={setTheme?.bind(null, themeKey)}
          />
          {themeKey}
        </label>
      ))}

      <h2>JS Themed App</h2>

      <button style={{ background: jsTheme?.color_primary }}>primary</button>
      <button style={{ background: jsTheme?.color_wran }}>warn</button>
    </div>
  );
}

export default App;
