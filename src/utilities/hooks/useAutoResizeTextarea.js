import { useEffect } from "react";

const st_useAutoResizeTextarea = (textareaClass) => {
  useEffect(() => {
    const textarea = document.querySelector(`.${textareaClass}`);
    const st_adjustHeight = (e) => {
      textarea.style.height = "36px";
      textarea.style.height = `${e.target.scrollHeight}px`;
    };

    textarea.addEventListener("input", st_adjustHeight);

    return () => {
      textarea.removeEventListener("input", st_adjustHeight);
    };
  }, [textareaClass]);
};

export default st_useAutoResizeTextarea;
