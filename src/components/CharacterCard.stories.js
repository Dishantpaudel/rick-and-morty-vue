import CharacterCard from './CharacterCard.vue';
import '../style.css'; // This ensures your nice neon styles show up in Storybook!

export default {
    title: 'RickAndMorty/CharacterCard',
    component: CharacterCard,
};

// This is the "Story" for a living character
export const RickSanchez = {
    args: {
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        status: 'Alive',
        species: 'Human',
        origin: 'Earth (C-137)',
    },
};

// This is a "Story" to see how a dead character looks
export const DeadMorty = {
    args: {
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        status: 'Dead',
        species: 'Human',
        origin: 'Earth (C-137)',
    },
};