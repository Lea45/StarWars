
<template>
  <div class="list-container">
    <canvas class="snow-canvas"></canvas>

    <h1 class="list-title">Explore the Galaxy</h1>
    <input type="text" v-model="searchQuery" placeholder="Search characters..." class="search-input" />
    <div class="button-group">
      <button @click="$router.push('/')" class="nav-btn">Go to Home</button>
      <button @click="$router.push('/favorites')" class="nav-btn">Favorites</button>
    </div>
    <div v-if="filteredCharacters.length" class="grid">
      <div
        v-for="character in filteredCharacters"
        :key="character.id"
        class="card" @click="goToCharacterDetails(character)" @mousedown="cardClickEffect($event)" >
        <div class="card-image-wrapper">
          <img :src="character.image" :alt="character.name" class="card-img" />
        </div>
        <div class="card-name">{{ character.name }}</div>
      </div>
    </div>
    
    <p v-if="filteredCharacters.length === 0 && searchQuery" class="no-results">
      No characters found...
    </p>

    <p v-else class="loading">Loading characters...</p>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      searchQuery: "",
      characters: [],
    };
  },

  async created() {
    const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
    this.characters = await res.json();
  },
  
  computed: {
    filteredCharacters() {
      return this.characters.filter(char =>
        char.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },

  mounted() {
    this.initSnowflakes();
  },
  methods: {
    goToCharacterDetails(character) {
      this.$router.push({
        name: "character-details",
        params: { characterId: character.id },
      });
    },
    cardClickEffect(event) {
      const el = event.currentTarget;
      el.classList.add("clicked-effect");
      setTimeout(() => {
        el.classList.remove("clicked-effect");
      }, 400);
    },
    initSnowflakes() {
      const canvas = document.querySelector('.snow-canvas');
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
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Orbitron', sans-serif;
  background: radial-gradient(ellipse at top, #0c0c24, #000000);
  color: white;
}

/* Snow Canvas */
.snow-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

/* Klik efekt */
.clicked-effect {
  animation: hypershock 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes hypershock {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0px #00ffff;
  }
  30% {
    transform: scale(1.08) rotate(1deg);
    box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff44;
  }
  60% {
    transform: scale(0.97) rotate(-1deg);
    box-shadow: 0 0 10px #00ffff;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0px #00ffff00;
  }
}


.button-group {
  margin: 20px auto 40px;
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


/* Layout i kartice */
.list-container {
  position: relative;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
  z-index: 1;
}

.list-title {
  font-size: 42px;
  margin-bottom: 30px;
  color: #00ffff;
  text-shadow: 0 0 10px #00e6e6, 0 0 20px #00b3b3;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 60px;
}

.card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #00ffff44;
  border-radius: 16px;
  box-shadow: 0 0 20px #00ffff33;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 25px #00ffff88;
}

.card-image-wrapper {
  background: rgba(0, 255, 255, 0.05);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
}

.card-img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.card-name {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #00e6e6;
  text-shadow: 0 0 5px #00e6e6, 0 0 10px #00b3b3;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid #00ffff33;
}

.loading {
  font-size: 20px;
  font-style: italic;
  margin-top: 80px;
  color: #00e6e6;
  animation: blink 1.5s infinite alternate;
}

@keyframes blink {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

.search-input {
  width: 100%;
  max-width: 400px;
  margin: 30px auto 40px;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 12px;
  border: 2px solid #00ffff;
  background-color: rgba(0, 0, 0, 0.5);
  color: #00ffff;
  box-shadow: 0 0 15px #00ffff55;
  transition: all 0.3s ease;
  outline: none;
}

.search-input::placeholder {
  color: #00ffff88;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.search-input:focus {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: #00ffff;
  box-shadow: 0 0 25px #00ffffaa, 0 0 50px #00ffff55;
}

</style>
