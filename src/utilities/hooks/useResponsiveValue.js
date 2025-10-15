import { useState, useEffect } from "react";

const st_useResponsiveValue = (breakpoint, mobileValue, tabletValue) => {
  const [value, setValue] = useState(window.innerWidth >= breakpoint ? tabletValue : mobileValue);

  useEffect(() => {
    const st_handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        setValue(tabletValue);
      } else {
        setValue(mobileValue);
      }
    };

    window.addEventListener("resize", st_handleResize);
    st_handleResize();

    return () => window.removeEventListener("resize", st_handleResize);
  }, [breakpoint, tabletValue, mobileValue]);

  return value;
};

export default st_useResponsiveValue;
