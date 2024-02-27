import Auth from "./auth/Layout";
import Main from "./main/Layout";

export const Layouts = {
  Main: Main,
  Auth: Auth,
};

export type LayoutKeys = keyof typeof Layouts;
