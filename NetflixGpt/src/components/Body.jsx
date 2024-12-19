import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import { lazy, Suspense } from "react";
import ContentLoadingShimmerUi from "./ContentLoadingShimmerUi";
import Browse from "./Browse";
import HomePage from "./HomePage"; 

const GptSearch = lazy(() => import("./GptSearch"));
const MovieAndSeriesPage = lazy(() => import("./MovieAndSeriesPage"));
const NotFound = lazy(() => import("./NotFound"));

function Body() {
  const AppPathConfig = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
      children: [
        {
          index: true, // Default child route for "/browse"
          element: <HomePage />,
        },
        {
          path: "search", // Relative path ("/browse/search")
          element: (
            <Suspense fallback={<ContentLoadingShimmerUi />}>
              <GptSearch />
            </Suspense>
          ),
        },
        {
          path: "movieOrTv/:mediaType/:id", // Relative path ("/browse/movieOrTv/:mediaType/:id")
          element: (
            <Suspense fallback={<ContentLoadingShimmerUi />}>
              <MovieAndSeriesPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*", // Fallback route
      element: (
        <Suspense fallback={<ContentLoadingShimmerUi />}>
          <NotFound />
        </Suspense>
      )
    },
  ],
);

  return <RouterProvider router={AppPathConfig} />;
}

export default Body;
