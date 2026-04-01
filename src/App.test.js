import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AppNavbar from "./components/AppNavbar.vue";
import CharacterCard from "./components/CharacterCard.vue";

describe("CharacterCard.vue", () => {
  it("renders content and prioritized image attributes", () => {
    const wrapper = mount(CharacterCard, {
      props: {
        id: 1,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        status: "Alive",
        species: "Human",
        origin: "Earth (C-137)",
        priority: true,
      },
    });

    expect(wrapper.get("a.character-link").attributes("href")).toBe(
      "#/character/1",
    );
    expect(wrapper.text()).toContain("Rick Sanchez");
    expect(wrapper.text()).toContain("Human");
    expect(wrapper.get(".status-pill").classes()).toContain("status-alive");

    const image = wrapper.get("img");
    expect(image.attributes("width")).toBe("300");
    expect(image.attributes("height")).toBe("300");
    expect(image.attributes("loading")).toBe("eager");
    expect(image.attributes("fetchpriority")).toBe("high");
  });

  it("defaults to lazy image loading when not prioritized", () => {
    const wrapper = mount(CharacterCard, {
      props: {
        id: 2,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    });

    const image = wrapper.get("img");
    expect(image.attributes("loading")).toBe("lazy");
    expect(image.attributes("fetchpriority")).toBe("auto");
  });
});

describe("AppNavbar.vue", () => {
  it("emits search updates on input", async () => {
    const wrapper = mount(AppNavbar, {
      props: {
        modelValue: "",
      },
    });

    await wrapper.get("#global-search").setValue("Morty");

    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["Morty"]);
    expect(wrapper.get("a.brand").attributes("href")).toBe("#/");
  });
});
