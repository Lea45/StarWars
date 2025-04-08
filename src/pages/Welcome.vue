<template>
  <div id="hyperspace-flash"></div>

  <div class="welcome-container">
    <canvas id="stars-canvas"></canvas>
    <h1 class="welcome-text">Welcome, Star Wars Fan!</h1>
    <p class="welcome-subtext">
      Strap in, traveler! The hyperdrive is engaged, and your journey through
      the galaxy far, far away begins now. Explore the vast universe, discover
      legendary heroes and villains, and relive iconic Star Wars moments. May
      the Force guide your way!
    </p>
    <div class="buttons-container">
  <button @click="jumpTo('/list')">Go to List</button>
  <button @click="jumpTo('/favorites')">Go to Favorites</button>
</div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('stars-canvas')
  const ctx = canvas.getContext('2d')

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', resize)

  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.2
  }))

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    stars.forEach(star => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const update = () => {
    stars.forEach(star => {
      star.y += star.speed
      if (star.y > canvas.height) {
        star.y = 0
        star.x = Math.random() * canvas.width
      }
    })
  }

  const animate = () => {
    update()
    draw()
    requestAnimationFrame(animate)
  }

  animate()
})

import { useRouter } from 'vue-router'

const router = useRouter()

const jumpTo = (route) => {
  const flash = document.getElementById('hyperspace-flash')
  flash.classList.add('active')

  setTimeout(() => {
    router.push(route)
    flash.classList.remove('active') // in case you return back
  }, 800) // matches animation duration
}

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Orbitron', sans-serif;
  overflow: hidden;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
  text-align: center;
  background: url("/star-wars-background.jpg") no-repeat center center/cover;
  color: white;
  padding: 20px;
  animation: fadeIn 2s ease-in-out;
  position: relative;
}

.welcome-text {
  font-size: 42px;
  font-weight: bold;
  text-shadow: 0 0 10px #00e6e6, 0 0 20px #00b3b3;
  animation: lightSaberGlow 1.5s infinite alternate;
}

.welcome-subtext {
  font-size: 20px;
  color: #ccc;
  max-width: 650px;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
  animation: fadeInUp 2s ease-out;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  width: 220px;
  padding: 14px 24px;
  font-size: 18px;
  background: transparent;
  border: 2px solid #00e6e6;
  color: #00e6e6;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #00e6e6, inset 0 0 10px #00e6e6;
  animation: glow 1.5s infinite alternate;
}

button:hover {
  background-color: rgba(0, 230, 230, 0.1);
  transform: scale(1.1);
  box-shadow: 0 0 20px #00e6e6, 0 0 40px #00b3b3;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glow {
  from { box-shadow: 0 0 10px #00e6e6; }
  to { box-shadow: 0 0 20px #00e6e6, 0 0 40px #00b3b3; }
}

@keyframes lightSaberGlow {
  from { text-shadow: 0 0 10px #00e6e6; }
  to { text-shadow: 0 0 20px #00e6e6, 0 0 40px #00b3b3; }
}

@media (max-width: 768px) {
  .welcome-text {
    font-size: 32px;
  }
  .welcome-subtext {
    font-size: 16px;
    max-width: 90%;
  }
  .buttons-container {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .welcome-text {
    font-size: 26px;
  }
  .welcome-subtext {
    font-size: 14px;
  }
  button {
    width: 180px;
    font-size: 16px;
  }
}

#stars-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.welcome-container {
  position: relative;
  z-index: 1;
}

#hyperspace-flash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at center, #fff 0%, #00e6e6 40%, #000 100%);
  opacity: 0;
  pointer-events: none;
  z-index: 999;
  transition: opacity 0.2s ease-in;
  mix-blend-mode: screen;
}

#hyperspace-flash.active {
  animation: hyperspace 0.8s ease-in forwards;
}

@keyframes hyperspace {
  0% {
    opacity: 0;
    transform: scale(1) rotate(0deg);
    filter: blur(0);
  }
  30% {
    opacity: 1;
    transform: scale(1.2) rotate(45deg);
    filter: blur(2px);
  }
  60% {
    transform: scale(4) rotate(90deg);
    filter: blur(6px);
    opacity: 0.9;
  }
  100% {
    opacity: 0;
    transform: scale(8) rotate(180deg);
    filter: blur(10px);
  }
}


</style>
