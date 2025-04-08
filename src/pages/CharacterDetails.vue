
<template>
  <div v-if="character && character.id" class="character-details-wrapper">
  <div class="character-details-container">
    <canvas class="snow-canvas"></canvas>

    <div class="character-details-wrapper">
      <div class="character-image">
        <img :src="character.image" :alt="character.name" />
      </div>
      <div class="character-info">
        <h2>{{ character.name }}</h2>
        <p><strong>Gender:</strong> {{ character.gender }}</p>
        <p><strong>Species:</strong> {{ character.species }}</p>
        <p><strong>Homeworld:</strong> {{ character.homeworld }}</p>
        <p><strong>Height:</strong> {{ character.height }} cm</p>
        <p><strong>Mass:</strong> {{ character.mass }} kg</p>
      </div>
    </div>
    
    <div v-if="showPopup" class="popup-overlay">
  <div class="popup">
    <p>Character added to favorites!</p>
    <div class="popup-buttons">
      <button @click="goToFavorites" class="popup-btn">Go to Favorites</button>
      <button @click="goToList" class="popup-btn">Back to Characters</button>
    </div>
  </div>
</div>



<div class="button-group" v-if="!showPopup">
  <button @click="$router.push('/list')" class="nav-btn">Go to List</button>
  <button @click="handleAddToFavorites" class="nav-btn">Add to Favorites</button>
</div>

  </div>
</div>
</template>

import { nextTick } from 'vue';

<script>
import { nextTick } from "vue";
export default {
  data() {
    return {
      showPopup: false,
      character: {},
    };
  },
  async created() {
    const id = this.$route.params.characterId;
    const res = await fetch("https://akabab.github.io/starwars-api/api/id/" + id + ".json");
    this.character = await res.json();
  },
  mounted() {
    nextTick(() => {
      this.initSnowflakes();
    });
  },
  methods: {
    handleAddToFavorites() {
  console.log("Character", this.character);

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push({ 
  id: this.character.id, 
  name: this.character.name,
  image: this.character.image 
});

  localStorage.setItem("favorites", JSON.stringify(favorites));
  this.showPopup = true;
}
,
    goToFavorites() {
      this.$router.push('/favorites');
    },
    goToList() {
    this.$router.push('/list');
  },
    closePopup() {
      this.showPopup = false;
    },
    
    addToFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = favorites.find(fav => fav.id === this.character.id);

      if (!exists) {
        favorites.push(this.character);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      if (confirm("Character added to favorites! Do you want to go to Favorites?")) {
        this.$router.push("/favorites");
      }
    },
    
    initSnowflakes() {
      const canvas = document.querySelector('.snow-canvas');
      if (!canvas) {
        console.warn('Canvas not found');
        return;
      }
      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      const flakes = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        d: Math.random() * 1
      }));

      function drawFlakes() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        flakes.forEach(flake => {
          ctx.moveTo(flake.x, flake.y);
          ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
        });
        ctx.fill();
        moveFlakes();
      }

      let angle = 0;
      function moveFlakes() {
        angle += 0.01;
        flakes.forEach(flake => {
          flake.y += Math.cos(angle + flake.d) + 1 + flake.r / 2;
          flake.x += Math.sin(angle) * 2;

          if (flake.y > height) {
            flake.y = 0;
            flake.x = Math.random() * width;
          }
        });

      }

      function animate() {
        drawFlakes();
        requestAnimationFrame(animate);
      }

      animate();

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
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
}

.character-details-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  padding: 40px 20px;
  flex-wrap: wrap;
}

.character-image {
  position: relative;
  padding: 12px;
  border: 2px solid #00ffff;
  border-radius: 20px;
  box-shadow: 0 0 15px #00ffffaa, 0 0 30px #00ffff55 inset;
  background: linear-gradient(145deg, #001f2f 0%, #002233 100%);
  animation: saberGlow 2s ease-in-out infinite alternate;
}

.character-image img {
  width: 260px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 0 20px #00ffff55;
}

.character-info {
  max-width: 500px;
  text-align: left;
}

.character-info h2 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #00ffff;
}

.character-info p {
  font-size: 18px;
  margin-bottom: 10px;
  color: #e0f7ff;
}

.button-group {
  margin: 40px auto 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
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

.popup-buttons {
  display: flex;
  justify-content: center; /* centrira gumbe horizontalno */
  gap: 20px; /* razmak između gumba */
  margin-top: 20px; /* razmak između teksta i gumba */
}

.popup-btn {
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

.popup-btn:hover {
  background-color: #00ffff11;
  box-shadow: 0 0 15px #00ffff99, 0 0 25px #00ffff55;
  transform: scale(1.05);
}

.popup p {
  text-align: center;
  margin-bottom: 10px;
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
  .character-details-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .character-info {
    text-align: center;
  }
  .popup-buttons,
.button-group {
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.popup-btn,
.nav-btn {
  width: 80%;
  text-align: center;
}

}



</style>
