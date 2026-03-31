import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.vue";
import { fetchCharacterById, fetchCharacters } from "./services/rickAndMorty";

vi.mock("./services/rickAndMorty", () => ({
  fetchCharacters: vi.fn(),
  fetchCharacterById: vi.fn(),
}));

describe("App.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.hash = "#/";

    fetchCharacterById.mockResolvedValue({
      id: 2,
      name: "Morty Smith",
    });

    fetchCharacters.mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 2,
          name: "Morty Smith",
          image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          status: "Alive",
          species: "Human",
          origin: { name: "Earth (C-137)" },
        },
      ],
    });
  });

  it("renders title and fetched character", async () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain("Rick and Morty Character Explorer");

    await flushPromises();

    expect(wrapper.text()).toContain("Morty Smith");
    expect(fetchCharacters).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        name: "",
        status: "",
      }),
    );
  });
});
