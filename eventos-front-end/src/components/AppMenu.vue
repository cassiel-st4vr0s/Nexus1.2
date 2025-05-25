<template>
  <router-view></router-view>
  <div class="container">
    <div class="sidebar">
      <button @click="selectOption('registerUser')" class="sidebar-button">CADASTRAR USUÁRIO</button>
      <button @click="selectOption('loginUser')" class="sidebar-button">LOGIN COMO USUÁRIO</button>
      <button @click="selectOption('registerGerente')" class="sidebar-button">CADASTRAR GERENTE DE EVENTOS</button>
      <button @click="selectOption('loginGerente')" class="sidebar-button">LOGIN COMO GERENTE</button>
    </div>
    <div class="content">
      <div v-if="selectedOption === 'registerUser'" class="form">
        <h2>CADASTRAR USUÁRIO</h2>
        <label>Nome:</label>
        <input type="text" placeholder="Nome" v-model="name" />
        <label>Celular:</label>
        <input type="text" placeholder="Celular" v-model="celular"/>
        <label>Email:</label>
        <input type="text" placeholder="Email" v-model="email"/>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="password"/>
        <button class="form-button" @click="cadastrarUsuario">Cadastrar</button>
      </div>
      <div v-if="selectedOption === 'registerGerente'" class="form">
        <h2>CADASTRAR GERENTE</h2>
        <label>Nome:</label>
        <input type="text" placeholder="Nome" v-model="name" />
        <label>Celular:</label>
        <input type="text" placeholder="Celular" v-model="celular"/>
        <label>Email:</label>
        <input type="text" placeholder="Email" v-model="email"/>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="password"/>
        <button class="form-button" @click="cadastrarGerente">Cadastrar</button>
      </div>
      <div v-if="selectedOption === 'loginUser'" class="form">
        <h2>LOGIN COMO USUÁRIO</h2>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="usuario.login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="usuario.password"/>
        <button class="form-button" @click="loginUser">Realizar Login</button>
      </div>
      <div v-if="selectedOption === 'loginGerente'" class="form">
        <h2>LOGIN COMO GERENTE</h2>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="usuario.login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="usuario.password"/>
        <button class="form-button" @click="loginGerente">Realizar Login</button>
      </div>
    </div>
    <div v-if="showPopup" class="popup">
      {{ popupMessage }}
      <button @click="showPopup = false">Fechar</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default({
  data() {
    return {
      selectedOption: 'none',
      userType: 'none',
      popupMessage: '',
      showPopup: false,
      usuario:{
        name: '',
        celular: '',
        email: '',
        login: '',
        password: ''
      }
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },

    loginUser () {
      const loginUsuario = {
        login: this.usuario.login,
        password: this.usuario.password
      }

      axios.post('http://localhost:8080/user/login', loginUsuario)
        .then(response => {
          this.popupMessage = 'Login efetuado!';
          this.showPopup = true;
          localStorage.setItem('user', JSON.stringify({ name: response.data.name, email: response.data.email, id: response.data.id }))
          this.$router.push({ path: '/user' });
        })
        .catch(() => {
          this.popupMessage = 'Login/Senha foram inseridos incorretamente.';
          this.showPopup = true;
        })
    },

    loginGerente () {
      const loginGerente = {
        login: this.usuario.login,
        password: this.usuario.password
      }

      axios.post('http://localhost:8080/gerente/login', loginGerente)
        .then(response => {
          this.popupMessage = 'Login efetuado!';
          this.showPopup = true;
          localStorage.setItem('user', JSON.stringify({ name: response.data.name, email: response.data.email, id: response.data.id }))
          this.$router.push({ path: '/gerente' });
        })
        .catch(() => {
          this.popupMessage = 'Login/Senha foram inseridos incorretamente.';
          this.showPopup = true;
        })
    },
    
    async cadastrarUsuario() {
      try {
        await axios.post('http://localhost:8080/user', {
          name: this.name,
          celular: this.celular,
          email: this.email,
          login: this.login,
          password: this.password
        });
        this.popupMessage = 'Usuário cadastrado com sucesso';
        this.showPopup = true;

        this.name = '';
        this.celular = '';
        this.email = '';
        this.login = '';
        this.password = '';
      } catch (error) {
        this.popupMessage = error.response.data;
        this.showPopup = true;
      }
    },


    async cadastrarGerente() {
      try {
        await axios.post('http://localhost:8080/gerente', {
          name: this.name,
          celular: this.celular,
          email: this.email,
          login: this.login,
          password: this.password
        });
        this.popupMessage = 'Usuário cadastrado com sucesso';
        this.showPopup = true;

        this.name = '';
        this.celular = '';
        this.email = '';
        this.login = '';
        this.password = '';
      } catch (error) {
        this.popupMessage = error.response.data;
        this.showPopup = true;
      }
    },
  },
});
</script>

<style>
body {
  overflow-y: hidden;
}

.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  width: 25%;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}

.popup button {
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
  background-color: #FF69B4;
  color: white;
  border: none;
  width: 100%;
  transition: background-color 0.3s;
  font-weight: bold;
  margin-top: 20px;
}

.popup button:hover {
  background-color: #FF1493;
}



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

.sidebar-button {
  width: 80%;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 18px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #ccc;
  transition: background-color 0.3s;
  text-align: center;
  font-family: 'Arial', sans-serif; 
  font-weight: bold;
}


.sidebar-button:hover {
  background-color: #f0f0f0;
}

.content {
  flex: 3;
  padding: 20px;
}

.form h2 {
  font-size: 80px;
  margin-bottom: 20px;
  color: #FF69B4; 
  font-weight: bold; 
  font-family: 'Arial', sans-serif;
}

.form label {
  font-size: 22px;
  display: block;
  margin: 10px 0;
  font-family: 'Arial', sans-serif;
}


input {
  width: 100%;
  padding: 10px;
  font-size: 22px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  font-family: 'Arial', sans-serif; 
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
