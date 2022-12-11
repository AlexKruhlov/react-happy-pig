import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLayout, Loading, ErrorBoundary } from '../components'

const Funds = lazy(() => import('../pages/Funds'));
const Fund = lazy(() => import('../pages/Fund'));

const routers = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Funds />
          </Suspense>
        )
      },
      {
        path: "funds/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Fund />
          </Suspense>
        )
      }
    ]
  }
]);

const AppRouters = () => (
  <RouterProvider router={routers} />
);

export default AppRouters;
