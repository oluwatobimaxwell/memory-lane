import React, { createContext, useContext } from 'react';
// @ts-ignore
import { DefaultTheme } from 'styled-components/native';

export const ThemeContext = createContext(DefaultTheme);

export const useThemeContext = () => useContext(ThemeContext);
