import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "home" },
    { path: "/preview", component: "preview" },
  ],
  npmClient: 'yarn',
});
