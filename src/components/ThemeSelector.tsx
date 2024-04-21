import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import {
  Moon as DarkModeIcon,
  Sun as LightModeIcon,
} from "react-bootstrap-icons";

// Reference: https://getbootstrap.com/docs/5.3/customize/color-modes/#dark-mode
const THEME_ATTRIBUTE_NAME = "data-bs-theme";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const ThemeSelector: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(Theme.DARK);

  // Whenever the selected theme changes, update the HTML attribute on the `<html>` tag.
  // Note: This function directly accesses the DOM, ignoring the fact that we're in a React app.
  useEffect(() => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, selectedTheme);
  }, [selectedTheme]);

  const isSelectedThemeDark = selectedTheme === Theme.DARK;

  return (
    <Button
      onClick={() =>
        setSelectedTheme(isSelectedThemeDark ? Theme.LIGHT : Theme.DARK)
      }
      variant={"link"}
      size={"sm"}
      className={"p-0 align-text-bottom"}
      title={
        isSelectedThemeDark ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {isSelectedThemeDark ? (
        <DarkModeIcon className={"text-body"} />
      ) : (
        <LightModeIcon className={"text-body"} />
      )}
    </Button>
  );
};

export default ThemeSelector;
