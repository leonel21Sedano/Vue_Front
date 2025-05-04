<template>
  <div id="app">
    <nav class="navbar" :class="{ 'scrolled': hasScrolled }">
      <div class="navbar-container">
        <div class="navbar-logo" @click="goToHome">
          <img alt="Logo" src="./assets/LogoPag.png" class="logo">
        </div>
        
        <div class="navbar-links" :class="{ 'active': menuOpen }">
          <div class="nav-link" @click="goToHome">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Inicio</span>
          </div>
          
          <!-- Links condicionales según autenticación -->
          <template v-if="!currentUser">
            <div class="nav-link" @click="goToLogin">
              <span class="nav-icon">🔑</span>
              <span class="nav-text">Iniciar Sesión</span>
            </div>
            <div class="nav-link" @click="goToRegister">
              <span class="nav-icon">👤</span>
              <span class="nav-text">Registrarse</span>
            </div>
          </template>
          
          <!-- Información del usuario y botón de logout -->
          <template v-else>
            <div class="user-greeting">
              <span class="greeting-text">¡Hola, {{ currentUser.nombre }}!</span>
            </div>
            <div class="nav-link logout" @click="logout">
              <span class="nav-icon">🚪</span>
              <span class="nav-text">Cerrar Sesión</span>
            </div>
          </template>
          
          <!-- Links condicionales según rol -->
          <div v-if="currentUser" class="nav-link" @click="goToLiveVoting">
            <span class="nav-icon">📋</span>
            <span class="nav-text">Votaciones</span>
          </div>
          <div v-if="isEncargadoOrAdmin" class="nav-link" @click="goToPost">
            <span class="nav-icon">⭐</span>
            <span class="nav-text">Administrar</span>
          </div>
          <div v-if="isAdmin" class="nav-link" @click="goToUserManagement">
            <span class="nav-icon">👥</span>
            <span class="nav-text">Usuarios</span>
          </div>
        </div>
        
        <div class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>

    <div class="content-container">
      <router-view @login-success="updateCurrentUser" />
    </div>
  </div>
</template>

<script>
import AuthService from './services/AuthService';

export default {
  name: 'App',
  data() {
    return {
      hasScrolled: false,
      menuOpen: false,
      currentUser: null
    }
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.rol === 'ADMIN';
    },
    isEncargadoOrAdmin() {
      return this.currentUser && (this.currentUser.rol === 'ADMIN' || this.currentUser.rol === 'ENCARGADO');
    }
  },
  created() {
    // Intentar cargar el usuario actual del localStorage al iniciar
    this.updateCurrentUser();
    
    // Escuchar eventos de almacenamiento (si se inicia sesión en otra pestaña)
    window.addEventListener('storage', (event) => {
      if (event.key === 'user') {
        this.updateCurrentUser();
      }
    });
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('storage', this.updateCurrentUser);
  },
  methods: {
    updateCurrentUser() {
      console.log('Actualizando datos de usuario actual...');
      this.currentUser = AuthService.getCurrentUser();
      console.log('Usuario actual:', this.currentUser);
    },
    logout() {
      AuthService.logout();
      this.updateCurrentUser();
      this.$router.push('/');
    },
    handleScroll() {
      this.hasScrolled = window.scrollY > 50;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToHome() {
      this.$router.push('/');
      this.menuOpen = false;
    },
    goToLogin() {
      this.$router.push('/login');
      this.menuOpen = false;
    },
    goToPost() {
      this.$router.push('/post-food');
      this.menuOpen = false;
    },
    goToRegister() {
      this.$router.push('/register');
      this.menuOpen = false;
    },
    goToLiveVoting() {
      this.$router.push('/live');
      this.menuOpen = false;
    },
    goToUserManagement() {
      this.$router.push('/users');
      this.menuOpen = false;
    }
  },
};
</script>

<style>
#app {
  font-family: 'Poppins', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.content-container {
  padding-top: 80px; /* Space for fixed navbar */
  min-height: calc(100vh - 80px);
}

/* Navbar styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  height: 60px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-logo {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.logo {
  height: 50px;
  width: auto;
  transition: height 0.3s ease;
}

.scrolled .logo {
  height: 40px;
}

.navbar-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(106, 17, 203, 0.1);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 3px;
}

.nav-text {
  font-size: 0.8rem;
  font-weight: 500;
  color: #555;
  transition: color 0.2s ease;
}

.nav-link:hover .nav-text {
  color: #6a11cb;
}

/* Hamburger menu for mobile */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: #6a11cb;
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  
  .navbar-links {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: row;
    padding: 0;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    justify-content: space-around;
  }
  
  .navbar-links.active {
    height: 60px;
    padding: 10px 0;
    opacity: 1;
  }
  
  .nav-link {
    padding: 5px;
  }
  
  .nav-text {
    font-size: 0.7rem;
  }
  
  .navbar.scrolled + .content-container {
    padding-top: 60px;
  }
  
  .navbar.scrolled .navbar-links {
    top: 60px;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 15px;
  }
  
  .logo {
    height: 40px;
  }
  
  .scrolled .logo {
    height: 35px;
  }
  
  .nav-icon {
    font-size: 1.2rem;
  }
}

/* Agregar estilos para la información del usuario */
.user-greeting {
  display: flex;
  align-items: center;
  background-color: rgba(106, 17, 203, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
  margin-right: 10px;
}

.greeting-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6a11cb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.nav-link.logout {
  color: #e53935;
}

.nav-link.logout .nav-text {
  color: #e53935;
}

/* Mantener los estilos responsivos */
@media (max-width: 768px) {
  .user-greeting {
    padding: 4px 8px;
    margin-right: 5px;
  }
  
  .greeting-text {
    font-size: 0.75rem;
    max-width: 100px;
  }
}
</style>
