<template>
  <nav class="navbar">
    <router-link to="/">Welcome</router-link> |
    <router-link to="/list">List</router-link> |
    <router-link to="/favorites">Favorites</router-link>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.navbar {
  background-color: #333;
  padding: 10px;
  text-align: center;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

.navbar a:hover {
  text-decoration: underline;
}
</style>
