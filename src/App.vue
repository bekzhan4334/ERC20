<template>
  <div class="app-container">
    <navbar class="navbar"></navbar>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>


<style scoped>
.app-container {
  background-color: #1e1e1e;
  color: #e5e5e5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
}

.navbar {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #444;
}

.navbar a {
  color: #18c6a6;
  text-decoration: none;
  font-weight: bold;
  margin-right: 15px;
}

.navbar a:hover {
  color: #14a089;
}

.content-container {
  flex: 1;
  padding: 20px;
}
</style>