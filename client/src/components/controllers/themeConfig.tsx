import { createTheme, adaptV4Theme } from "@mui/material/styles";

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#00c2cb",
      },
      secondary: {
        main: "#7ed957",
        dark: "#324b4d",
      },
    },
  })
);

export default theme;
