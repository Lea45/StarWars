<template>
  <div class="main-container">
    <h1 class="character-list-title">Star Wars Character List</h1>
    <div v-if="characters.length" class="character-grid">
      <div
        v-for="character in characters"
        :key="character.name"
        class="character-card"
        @click="goToCharacterDetails(character)"
      >
        <img
          :src="getCharacterImage(character.url)"
          :alt="character.name"
          class="character-image"
        />
        <span class="character-name">{{ character.name }}</span>
      </div>
    </div>
    <p v-else class="loading">Loading characters...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characters: [],
    };
  },
  async created() {
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      this.characters = data.results;
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  },
  methods: {
    getCharacterImage(url) {
      const id = url.match(/\/(\d+)\//)[1];
      return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    },
    goToCharacterDetails(character) {
      this.$router.push({
        name: "character-details",
        params: { characterId: character.url.split("/")[5] },
      });
    },
  },
};
</script>

<style>
.main-container {
  text-align: center;
  background: linear-gradient(to bottom, #1a1a40, #0d0d0d);
  color: white;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.character-list-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));
  gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 100%;
}

.character-card {
  background: rgba(0, 0, 0, 0.6);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.character-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid white;
}

.character-name {
  display: block;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.6);
}

.loading {
  font-size: 18px;
  font-style: italic;
}

@media (max-width: 1200px) {
  .character-grid {
    grid-template-columns: repeat(4, minmax(150px, 1fr));
  }
}

@media (max-width: 900px) {
  .character-grid {
    grid-template-columns: repeat(3, minmax(150px, 1fr));
  }
}

@media (max-width: 600px) {
  .character-grid {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }
}

@media (max-width: 400px) {
  .character-grid {
    grid-template-columns: repeat(1, minmax(150px, 1fr));
  }
}
</style>
