export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
    surface: string;
    surfaceHover: string;
    border: string;
  };
  transitions: {
    default: string;
  };
  borderRadius: string;
  glassMorphism: {
    background: string;
    blur: string;
  };
} 