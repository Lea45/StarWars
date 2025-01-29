<template>
  <div class="favorites-container">
    <h1 class="favorites-title">Favorite Characters</h1>
    <div v-if="favorites.length" class="favorites-grid">
      <div
        v-for="character in favorites"
        :key="character.name"
        class="favorite-card"
      >
        <img
          :src="getCharacterImage(character.url)"
          :alt="character.name"
          class="favorite-image"
        />
        <span class="favorite-name">{{ character.name }}</span>
      </div>
    </div>
    <p v-else>No favorite characters added yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: [],
    };
  },
  created() {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.favorites = storedFavorites;
  },
  methods: {
    getCharacterImage(url) {
      const id = url.match(/\/(\d+)\//)[1];
      return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    },
  },
};
</script>

<style>
.favorites-container {
  text-align: center;
  background: linear-gradient(to bottom, #1a1a40, #0d0d0d);
  color: white;
  min-height: 100vh;
}

.favorites-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.favorite-card {
  background: rgba(0, 0, 0, 0.6);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.2);
}

.favorite-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid white;
}

.favorite-name {
  display: block;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.6);
}

@media (max-width: 1200px) {
  .favorites-grid {
    grid-template-columns: repeat(4, minmax(150px, 1fr));
  }
}

@media (max-width: 900px) {
  .favorites-grid {
    grid-template-columns: repeat(3, minmax(150px, 1fr));
  }
}

@media (max-width: 600px) {
  .favorites-grid {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }
}

@media (max-width: 400px) {
  .favorites-grid {
    grid-template-columns: repeat(1, minmax(150px, 1fr));
  }
}
</style>
