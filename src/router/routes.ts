import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ThreeJS from "../pages/ThreeJS";

const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFound,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const ThreeJSRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/3d",
  component: ThreeJS,
})

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/*",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([homeRoute, notFoundRoute, ThreeJSRoute]);


export const router = createRouter({
  routeTree,
});
