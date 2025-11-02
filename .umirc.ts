import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "home" },
    { path: "/preview", component: "preview" },
    { path: "/template/screenOne", component: "@/components/Template/SanMao/ScreenOne" },
  ],
  npmClient: "yarn",
});
