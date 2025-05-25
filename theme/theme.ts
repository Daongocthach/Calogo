export const lightTheme = {
  colors: {
    primary: "#3b82f6",
    onPrimary: "#ffffff",
    primaryContainer: "#dbeafe",
    onPrimaryContainer: "#1e3a8a",

    secondary: "#FF8247",
    onSecondary: "#ffffff",
    secondaryContainer: "#fefce8",
    onSecondaryContainer: "#FF8247",

    tertiary: "#22c55e",
    onTertiary: "#ffffff",
    tertiaryContainer: "#f0fdf4",
    onTertiaryContainer: "#14532d",

    error: "#f87171",
    onError: "#ffffff",
    errorContainer: "#fef2f2",
    onErrorContainer: "#f87171",

    background: "#ffffff",
    onBackground: "#1e293b",
    surface: "#f8fafc",
    onSurface: "#0f172a",

    surfaceVariant: "#dceef7",
    onSurfaceVariant: "#40576e",
    outline: "#CCD7DF",
    outlineVariant: "#8693AE",

    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#1e293b",
    inverseOnSurface: "#f1f5f9",
    inversePrimary: "#93c5fd",

    elevation: {
      level0: "transparent",
      level1: "#f0f9ff",
      level2: "#e0f2fe",
      level3: "#bae6fd",
      level4: "#7dd3fc",
      level5: "#38bdf8",
    },

    surfaceDisabled: "#DDDDDD",
    onSurfaceDisabled: "#8693AE",
    backdrop: "#283c552f",
  },
};

export const darkTheme = {
  colors: {
    primary: "#3b82f6",
    onPrimary: "#ffffff",
    primaryContainer: "#3b82f6", // Background color for primary button/container
    onPrimaryContainer: "#ffffff", // Text color on primary container

    secondary: "#FF8247",
    onSecondary: "#ffffff",
    secondaryContainer: "#FFCC99",
    onSecondaryContainer: "#FF8247",

    // Tertiary color used for highlighting, alerts, etc.
    tertiary: "#22c55e",
    onTertiary: "#ffffff",
    tertiaryContainer: "#dcfce7",
    onTertiaryContainer: "#22543d",

    error: "#f87171",
    onError: "#ffffff",
    errorContainer: "#F7D6D6",
    onErrorContainer: "#f87171",

    // Background colors for dark mode
    background: "#0d1117", // Background color for the entire page
    onBackground: "#f0f6fc", // Text color for background (main text)

    // Surface color for panels, cards, and other surface elements
    surface: "#4F4F4F", // Surface background color
    onSurface: "#ebf5ff", // Text color on surface elements (cards, panels)

    // Surface variant and outlines
    surfaceVariant: "#40576e", // Slightly different background for sub-panels
    onSurfaceVariant: "#dceef7", // Text color for surface variant
    outline: "#ebf5ff61", // Outline color for borders and dividers
    outlineVariant: "#ebf5ff", // Variant outline for elements with hover/focus

    // Shadow color for elevated elements
    shadow: "#000000", // Shadows for floating elements (modals, dropdowns)
    scrim: "#000000", // Scrim color for overlay screens

    // Inverse colors for dark mode
    inverseSurface: "#323c4b", // Inverse background for dark mode surfaces
    inverseOnSurface: "#ebf5ff", // Inverse text color for dark surfaces
    inversePrimary: "#bae6fd", // Inverse primary color (used for highlighting in dark mode)

    // Elevation levels for raised components
    elevation: {
      level0: "transparent", // Flat element with no elevation
      level1: "#e1f5ff", // Light elevation for components
      level2: "#d7f0ff", // Slightly darker elevation for components
      level3: "#cdefff", // Higher elevation for elements
      level4: "#c3e6ff", // Even higher elevation for more prominent elements
      level5: "#b9e1ff", // Maximum elevation for prominent raised elements
    },

    // Disabled elements and backdrop colors
    surfaceDisabled: "#999999", // Disabled surface background
    onSurfaceDisabled: "#CCCCCC", // Text color for disabled surface elements
    backdrop: "#283c552f", // Backdrop color for modal or overlay elements
  },
};
