<template>
  <div class="character-details-container">
    <h1 class="character-details-title">Character Details</h1>
    <div v-if="character">
      <img
        :src="getCharacterImage(character.url)"
        :alt="character.name"
        class="character-details-image"
      />
      <h2>{{ character.name }}</h2>
      <p><strong>Height:</strong> {{ character.height }} cm</p>
      <p><strong>Mass:</strong> {{ character.mass }} kg</p>
      <p><strong>Hair Color:</strong> {{ character.hair_color }}</p>
      <p><strong>Skin Color:</strong> {{ character.skin_color }}</p>
      <p><strong>Eye Color:</strong> {{ character.eye_color }}</p>
      <p><strong>Birth Year:</strong> {{ character.birth_year }}</p>
      <button @click="addToFavorites(character)">Add to Favorites</button>
    </div>
    <p v-else>Loading details...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: null,
    };
  },
  async created() {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/${this.$route.params.characterId}/`
      );
      const data = await response.json();
      this.character = data;
    } catch (error) {
      console.error("Error fetching character details:", error);
    }
  },
  methods: {
    getCharacterImage(url) {
      const id = url.match(/\/(\d+)\//)[1];
      return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    },
    addToFavorites(character) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some((fav) => fav.name === character.name)) {
        favorites.push(character);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    },
  },
};
</script>

<style>
.character-details-container {
  text-align: center;
  background: linear-gradient(to bottom, #1a1a40, #0d0d0d);
  color: white;
  min-height: 100vh;
  width: 100vw;
  color: white;
  padding: 50px;
}

.character-details-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.character-details-image {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid white;
  margin-bottom: 20px;
}

button {
  padding: 12px 20px;
  font-size: 18px;
  cursor: pointer;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

button:hover {
  background: linear-gradient(135deg, #0056b3, #004494);
  transform: scale(1.05);
}
</style>
