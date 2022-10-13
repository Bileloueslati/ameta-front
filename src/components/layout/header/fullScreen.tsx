import { IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const FullScreen: FC = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const toggle = () => {
    const el = document.documentElement;

    const isFullScreen = !!document.fullscreenElement;

    if (!isFullScreen) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onChange);

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
    };
  }, []);

  return (
    <IconButton onClick={toggle}>
      {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  );
};

export default FullScreen;
