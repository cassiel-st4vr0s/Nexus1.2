<template>
  <div class="container">
    <div class="sidebar">
    </div>
    <div class="content">
      <div class="form">
        <h2>Página Não Encontrada</h2>
        <p>Desculpe, a página que você está procurando não existe.</p>
        <button class="form-button" @click="$router.push('/')">Voltar para o Início</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
}

.sidebar {
  flex: 1;
  background-color: #FF69B4;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 3;
  padding: 20px;
}

.form h2 {
  font-size: 52px;
  margin-bottom: 20px;
  color: #FF69B4; 
  font-weight: bold; 
}

.form-button {
  padding: 15px;
  font-size: 26px;
  cursor: pointer;
  background-color: #FF69B4;
  color: white;
  border: none;
  width: 100%;
  font-family: 'Arial', sans-serif; 
  transition: background-color 0.3s;
  font-weight: bold;
}

.form-button:hover {
  background-color: #FF1493;
}
</style>
