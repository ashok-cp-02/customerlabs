import Main from "./main";
import ThemeSetter from "./common/theme/components/themeshetter";
import ThemeProvider from "./common/theme/components/contexts/themeprovider";

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeSetter />
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
