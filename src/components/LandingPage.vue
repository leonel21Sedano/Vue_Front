<template>
  <div class="landing-page">
    <div class="hero-section">
      <img src="../assets/LogoPag.png" alt="Logo" class="hero-logo">
      <h1 class="hero-title">Bienvenido a CPT</h1>
      <p class="hero-subtitle">Tu plataforma para elegir las mejores opciones gastronómicas</p>
      <div class="cta-buttons">
        <div class="box-button" @click="goToRegister">
          <div class="button-inner"><span>Crear Cuenta</span></div>
        </div>
        <div class="box-button secondary" @click="goToLogin">
          <div class="button-inner"><span>Iniciar Sesión</span></div>
        </div>
      </div>
    </div>

    <div class="info-section">
      <div class="info-card">
        <div class="card-icon">🍽️</div>
        <h2>Nuestro Propósito</h2>
        <p>Nuestro proposito es impulsar la variedad de alimentos que se ofrecen en el comedor de CUTonala.</p>
      </div>

      

      <div class="info-card">
        <div class="card-icon">👥</div>
        <h2>Para Quién Es</h2>
        <p>Va dirigido para personas de CUTonala para la eleccion de sus alimentos que se ofrecen en el comedor, para poder salir de la rutina de comer siempre lo mismo o eliegir alimentos mas saludables.</p>
      </div>
    </div>

    <div class="features-section">
      <h2 class="section-title">Características Principales</h2>
      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">🗳️</div>
          <h3>Votaciones Sencillas</h3>
          <p>Interfaz intuitiva participar en votaciones</p>
        </div>
        <div class="feature">
          <div class="feature-icon">📱</div>
          <h3>Acceso desde Cualquier Dispositivo</h3>
          <p>Usa la plataforma desde tu móvil, tablet o computadora</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔒</div>
          <h3>Seguridad de Datos</h3>
          <p>Tu información personal está protegida</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2024 CPT - Todos los derechos reservados</p>
    </footer>
  </div>

  <div class="navbar-links">
    <!-- Otros enlaces del navbar -->
    <div class="nav-link" @click="openSwaggerDocs">
      <span class="nav-icon">📚</span>
      <span class="nav-text">API Docs</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    openSwaggerDocs() {
      // Abre Swagger UI en una nueva pestaña
      window.open('http://localhost:8081/swagger-ui/index.html', '_blank');
    }
  }
};
</script>

<style scoped>
.landing-page {
  font-family: 'Poppins', sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 0;
}

.hero-logo {
  width: 250px;
  height: auto;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #6a11cb;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
  color: #555;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

/* Nuevos estilos consistentes para los botones */
.box-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: #6a11cb;
  padding-bottom: 10px;
  transition: 0.1s ease-in-out;
  user-select: none;
  width: 180px;
  text-align: center;
  margin: 0 10px;
}

.box-button.secondary {
  background-color: #a72896;
}

.box-button:hover {
  transform: translateY(-3px);
}

.button-inner {
  background-color: #dddddd;
  border: 4px solid #fff;
  padding: 8px 12px;
}

.button-inner span {
  font-size: 1.2em;
  letter-spacing: 1px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: #000;
}

.box-button:active {
  padding: 0;
  margin-bottom: 10px;
  transform: translateY(10px);
}

/* Aplicamos los mismos estilos de fuentes a los títulos de secciones */
.info-section {
  display: flex;
  gap: 30px;
  margin: 60px 0;
  justify-content: space-between;
  flex-wrap: wrap;
}

.info-card {
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 40px;
  margin-bottom: 20px;
}

.info-card h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #6a11cb;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  font-family: Arial, sans-serif;
}

.features-section {
  margin: 80px 0;
  text-align: center;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 40px;
  color: #6a11cb;
  position: relative;
  display: inline-block;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.section-title:after {
  content: '';
  position: absolute;
  width: 60%;
  height: 4px;
  background: #6a11cb;
  bottom: -10px;
  left: 20%;
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
  justify-items: center; /* Centra los elementos horizontalmente en la grid */
  max-width: 1000px; /* Limita el ancho máximo para mejor presentación */
  margin-left: auto;
  margin-right: auto;
}

.feature {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  text-align: center; /* Centra el texto dentro de cada feature */
  width: 100%; /* Asegura que todos tengan el mismo ancho */
  max-width: 300px; /* Establece un ancho máximo para cada feature */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra elementos como el ícono */
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 35px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: #f0e6ff;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
}

.feature h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #6a11cb;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  width: 100%; /* Asegura que ocupe todo el ancho disponible */
}

.feature p {
  color: #777;
  font-size: 0.9rem;
  font-family: Arial, sans-serif;
  width: 100%; /* Asegura que ocupe todo el ancho disponible */
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid #eee;
  color: #888;
  font-family: Arial, sans-serif;
}

@media (max-width: 768px) {
  .info-section {
    flex-direction: column;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .box-button {
    margin-bottom: 15px;
  }
  
  .features-grid {
    grid-template-columns: 1fr; /* Una sola columna en móviles */
  }
  
  .feature {
    max-width: 100%; /* Ocupa todo el ancho disponible en móviles */
  }
}
</style>
