import { createRouter, createWebHistory } from "vue-router";
import Welcome from "./pages/Welcome.vue";
import List from "./pages/List.vue";
import Favorites from "./pages/Favorites.vue";
import CharacterDetails from "./pages/CharacterDetails.vue";

const routes = [
  { path: "/", component: Welcome },
  { path: "/list", component: List },
  { path: "/favorites", component: Favorites },
  {
    path: "/character-details/:characterId",
    name: "character-details",
    component: CharacterDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
