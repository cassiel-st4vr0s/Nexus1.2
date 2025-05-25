<template>
  <div class="container">
    <div class="sidebar">
      <div class="welcome-message">BEM VINDO, {{ user.name }}</div>
      <button @click="selectOption('selectEvent')" class="sidebar-button">SELECIONAR EVENTO</button>
      <button @click="selectOption('myEvents')" class="sidebar-button">MEUS EVENTOS</button>
      <button @click="logout" class="sidebar-button">SAIR</button>
    </div>
    <div class="content">
      <div v-if="selectedOption === 'selectEvent'" class="form">
        <h2>SELECIONAR EVENTO</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Data</th>
              <th>Local</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td><input type="radio" :value="event.id" v-model="selectedEvent"></td>
              <td>{{ event.name }}</td>
              <td>{{ formatDate(event.date) }}</td>
              <td>{{ event.local }}</td>
              <td>{{ event.descricao }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="selectEvent" class="form-button">Selecionar</button>
      </div>
      <div v-if="selectedOption === 'myEvents'" class="form">
        <h2>MEUS EVENTOS</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Local</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in myEvents" :key="event.id">
              <td>{{ event.name }}</td>
              <td>{{ formatDate(event.date) }}</td>
              <td>{{ event.local }}</td>
              <td>{{ event.descricao }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="showPopup" class="popup">
      {{ popupMessage }}
      <button @click="closePopupAndReload">Fechar</button> 
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedOption: 'none',
      user: {
        name: '',
        id: '',
      },
      myEvents: [],
      events: [],
      selectedEvent: null,
      showPopup: false,
      popupMessage: '',
    };
  },
  mounted() {
    this.getUserInfo();
    this.getMyEvents().then(() => this.getEvents());
    
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getUserInfo() {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (userInfo) {
        this.user.name = userInfo.name;
        this.user.id = userInfo.id;
      }
    },
    closePopupAndReload() {
      this.showPopup = false;
      location.reload(); // Recarrega a página aqui
    },
    getEvents() {
      axios.get('http://localhost:8080/evento')
        .then(response => {
          this.events = response.data.filter(event => 
            event.status === true && !this.myEvents.some(myEvent => myEvent.id === event.id)
          );
        })
        .catch(error => {
          console.error('Erro ao buscar eventos:', error);
        });
    },
    getMyEvents() {
      return axios.get(`http://localhost:8080/evento/user/${this.user.id}`)
        .then(response => {
          this.myEvents = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar meus eventos:', error);
        });
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    async selectEvent() {
      if (this.selectedEvent == null) {
        this.popupMessage = 'Por favor, selecione um evento.';
        this.showPopup = true;
        return;
      }
      try {
        await axios.post('http://localhost:8080/user/selectEvent', {
          userId: this.user.id,
          eventId: this.selectedEvent 
        });
        this.popupMessage = 'Evento selecionado com sucesso';
        this.showPopup = true;
      } catch (error) {
        this.popupMessage = error.response.data;
        this.showPopup = true;
      }
    },
    logout() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
.sidebar-button {
  font-size: 22px;
}

.container {
  display: flex;
  font-family: Arial, sans-serif;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
}

.form button {
  margin-top: 20px;
}


table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.3em;
}

th, td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  font-size: 1.5em;
}

tr:nth-child(even) {
  background-color: #f5f5f5;
}

input[type="radio"] {
  transform: scale(2);
  align-items: center;
}

</style>




