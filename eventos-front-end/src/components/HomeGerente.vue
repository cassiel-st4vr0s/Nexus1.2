  <template>
    <div class="container">
      <div class="sidebar">
        <div class="welcome-message">BEM VINDO, {{ user.name }}</div>
        <button @click="selectOption('requestEventCreation')" class="sidebar-button">SOLICITAR CRIAÇÃO DE EVENTO</button>
        <button @click="logout" class="sidebar-button">SAIR</button>
      </div>
      <div class="content">
        <div v-if="selectedOption === 'requestEventCreation'" class="form">
          <h2>SOLICITAR CRIAÇÃO DE EVENTO</h2>
          <label>Nome:</label>
          <input type="text" placeholder="Nome" v-model="eventName" />
          <label>Descrição:</label>
          <textarea placeholder="Descrição" v-model="eventDescription" class="form-textarea"></textarea>
          <label>Data:</label>
          <input type="date" placeholder="Data" v-model="eventDate"/>
          <label>Local:</label>
          <input type="text" placeholder="Local" v-model="eventLocation"/>
          <label>Tipo de Evento:</label>
          <select v-model="eventType">
            <option value="conferencia">Conferência</option>
            <option value="seminario">Seminário</option>
            <option value="workshop">Workshop</option>
            <option value="festa">Festa</option>
          </select>
          <button class="form-button" @click="requestEventCreation">Solicitar</button>
        </div>
      </div>
      
      <div class="popup" v-if="showPopup">
        {{ popupMessage }}
        <button @click="closePopup">Fechar</button>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import moment from 'moment';


  export default {
    data() {
      return {
        selectedOption: 'none',
        showPopup: false,
        user: {
          name: ''
        },
        eventName: '',
        eventDate: '',
        eventLocation: '',
        eventType: '',
        eventDescription: '',
      };
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      closePopup() {
        this.showPopup = false;
      },
      getUserInfo() {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo) {
          this.user.name = userInfo.name;
        }
      },
      selectOption(option) {
        this.selectedOption = option;
      },
      async requestEventCreation() {
        const formattedDate = moment(this.eventDate).toISOString();
        try {
            await axios.post('http://localhost:8080/evento', {
            name: this.eventName,
            date: formattedDate,
            local: this.eventLocation,
            tipoEvento: this.eventType,
            descricao: this.eventDescription,
            });
            this.popupMessage = 'Evento cadastrado com sucesso';
            this.showPopup = true;

            this.eventName = '';
            this.eventDate = '';
            this.eventLocation = '';
            this.eventType = '';
            this.eventDescription = '';
        } catch (error) {
        this.popupMessage = error.response.data;
        this.showPopup = true;
        }
        },


      logout() {
        this.$router.push('/');
      }
    },
  };
  </script>
  
  <style>
  .form textarea {
  width: 100%; 
  padding: 5px; 
  font-size: 18px; 
  margin-bottom: 20px; 
  resize: vertical;
  height: 60px;
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

  .welcome-message {
    font-size: 30px;
    margin-bottom: 20px;
    color: white;
    font-weight: bold;
  }

  .form select {
  width: 20%;
  padding: 5px;
  margin-bottom: 20px;
  font-size: 18px;
}

.sidebar-button {
  font-size: 22px;
}
  </style>
  