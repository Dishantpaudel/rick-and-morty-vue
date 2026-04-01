import AppNavbar from "./AppNavbar.vue";

export default {
  title: "RickAndMorty/AppNavbar",
  component: AppNavbar,
  args: {
    modelValue: "",
  },
};

export const Default = {};

export const WithSearchValue = {
  args: {
    modelValue: "Morty",
  },
};
