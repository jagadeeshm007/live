import { Global, css, useTheme } from '@emotion/react';
import { Theme } from '../types/theme';

const GlobalStyles = () => {
  const theme = useTheme() as Theme;
  
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          overflow-x: hidden;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        button {
          font-family: inherit;
        }

        ::selection {
          background: ${theme.colors.accent};
          color: white;
        }
      `}
    />
  );
};

export default GlobalStyles;