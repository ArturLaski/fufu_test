import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { st_selectToken } from "src/store/selectors/authSelectors";

export const StPrivateRoute = ({ component: Component }) => {
  const token = useSelector(st_selectToken);

  return token ? <Component /> : <Navigate to="/" />;
};
