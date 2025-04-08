<template>
  <div class="character-details-container">
    <canvas class="snow-canvas"></canvas>
    <h1 class="favorites-title">Favorite Characters</h1>
    <button @click="$router.push('/list')" class="nav-btn back-btn">Back to List</button>

    <div v-if="favorites.length" class="favorites-grid">
      <div
        v-for="character in favorites"
        :key="character.id"
        class="character-card"
      >
        <img
          :src="character.image"
          :alt="character.name"
          class="character-image2"
        />
        <h2 class="character-name">{{ character.name }}</h2>
        <button @click="removeFromFavorites(character.id)" class="delete-btn">
          Delete 
        </button>
      </div>
    </div>
    <p v-else class="no-favorites">No favorite characters added yet.</p>
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
    removeFromFavorites(id) {
      this.favorites = this.favorites.filter(char => char.id !== id);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Orbitron', sans-serif;
  background: radial-gradient(ellipse at top, #0c0c24, #000000);
  color: white;
}

.snow-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

.character-details-container {
  min-height: 100vh;
  padding: 20px;
  position: relative;
  z-index: 1;
  text-align: center;
}

.favorites-title {
  font-size: 36px;
  color: #00ffff;
  margin-bottom: 10px;
}

.back-btn {
  margin-bottom: 30px;
}

.favorites-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.character-card {
  background: linear-gradient(145deg, #001f2f 0%, #002233 100%);
  border: 2px solid #00ffff;
  border-radius: 20px;
  padding: 20px;
  width: 220px;
  box-shadow: 0 0 15px #00ffffaa, 0 0 30px #00ffff55 inset;
  animation: saberGlow 2s ease-in-out infinite alternate;
  text-align: center;
}

.character-image2 {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 0 20px #00ffff55;
}


.character-name {
  font-size: 20px;
  color: #00ffff;
  margin: 15px 0;
}

.delete-btn {
  background-color: transparent;
  border: 2px solid #ff4d4d;
  padding: 10px 20px;
  font-size: 14px;
  color: #ff4d4d;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #ff4d4d44;
  margin-top: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.delete-btn:hover {
  background-color: #ff4d4d11;
  box-shadow: 0 0 15px #ff4d4d99, 0 0 25px #ff4d4d55;
  transform: scale(1.05);
}

.nav-btn {
  background-color: transparent;
  border: 2px solid #00ffff;
  padding: 10px 20px;
  font-size: 16px;
  color: #00ffff;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #00ffff44;
}

.nav-btn:hover {
  background-color: #00ffff11;
  box-shadow: 0 0 15px #00ffff99, 0 0 25px #00ffff55;
  transform: scale(1.05);
}

.no-favorites {
  color: #e0f7ff;
  font-size: 18px;
  margin-top: 40px;
}

@keyframes saberGlow {
  0% {
    box-shadow: 0 0 15px #00ffffaa, 0 0 30px #00ffff55 inset;
  }
  100% {
    box-shadow: 0 0 25px #00ffffcc, 0 0 45px #00ffff88 inset;
  }
}

@media (max-width: 768px) {
  .favorites-grid {
    flex-direction: column;
    align-items: center;
  }
}
</style>