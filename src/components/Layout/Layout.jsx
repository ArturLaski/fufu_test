import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import StFooter from "../StFooter";
import StHeader from "../StHeader";
import { StLoader } from "../shared/StLoader/StLoader";

const StLayout = () => {
  return (
    <>
      <StHeader />
      <Suspense fallback={<StLoader />}>
        <Outlet />
      </Suspense>
      <StFooter />
    </>
  );
};

export default StLayout;
