import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from 'components/ProtectedRoute';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

export const AppViews = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Switch>
        <ProtectedRoute path={`${APP_PREFIX_PATH}`} component={lazy(() => import(`./home`))} />
        <ProtectedRoute exact path={`${APP_PREFIX_PATH}dashboard`} component={lazy(() => import(`./dashboard`))} />
      </Switch>
    </Suspense>
  )
}

export default AppViews;