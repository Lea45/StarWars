<template>
  <div class="welcome-container">
    <h1 class="welcome-text">Welcome, Star Wars Fan!</h1>
    <p class="welcome-subtext">
      Strap in, traveler! The hyperdrive is engaged, and your journey through
      the galaxy far, far away begins now. Explore the vast universe, discover
      legendary heroes and villains, and relive iconic Star Wars moments. May
      the Force guide your way!
    </p>
    <div class="buttons-container">
      <router-link to="/list"><button>Go to List</button></router-link>
      <router-link to="/favorites"><button>Go to Favorite</button></router-link>
    </div>
  </div>
</template>

<style>
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
}

.welcome-text {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.welcome-subtext {
  font-size: 18px;
  color: #ddd;
  max-width: 600px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.buttons-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  width: 200px;
  padding: 12px 20px;
  font-size: 18px;
  cursor: pointer;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background: linear-gradient(135deg, #0056b3, #004494);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .welcome-text {
    font-size: 28px;
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
    font-size: 24px;
  }
  .welcome-subtext {
    font-size: 14px;
  }
  button {
    width: 180px;
    font-size: 16px;
  }
}
</style>
