import { ProtectedRoute } from 'components/ProtectedRoute';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { AppLayout } from "layouts/app-layout";

const ResoRoutes = (props) => {
  const { location, direction } = props;
  return (
    <>
      <ProtectedRoute path={APP_PREFIX_PATH} direction={direction} location={location}>
        <AppLayout direction={direction} location={location} />
      </ProtectedRoute>
    </>
  );
};
export default ResoRoutes;