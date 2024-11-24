<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <div class="logo-container">
        <img src="@/assets/MDC Logo.png" alt="Mater Dei College Logo" class="logo" />
      </div>
      <form @submit.prevent="login" class="login-form">
        <h1>Mater Dei College</h1>
        <h2>Login</h2>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
 <div class="form-group password-group">
  <label for="password">Password:</label>
  <input
    :type="showPassword ? 'text' : 'password'"
    id="password"
    v-model="password"
    required
  >
  <span @click="togglePasswordVisibility" class="eye-icon">
    <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
  </span>
</div>
  <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    login() {
      // Simulating login check
      if (this.username === 'admin' && this.password === 'password') {
        localStorage.setItem('user', JSON.stringify({ username: this.username }));
        this.$router.push('/home');
      } else {
        alert('Invalid credentials');
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  filter: brightness(0.7);
  z-index: 1;
}

.login-card {
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  z-index: 2;
}

.logo-container {
  background-color: #4169E1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
}

.logo {
  max-width: 250px;
  height: auto;
}

.login-form {
  padding: 2rem;
  width: 80%;
}

h1 {
  text-align: center;
  color: black;
  margin-bottom: 1rem;
}

h2 {
  color: black;
  margin-bottom: 1.0rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.password-group {
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4169E1;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4169E1;
  border-radius: 4px;
  font-size: 1rem;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4169E1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-align: center;
}

button:hover {
  background-color: #3a5cd0;
}

@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    max-width: 500px;
  }

  .logo-container {
    width: 100%;
    padding: 1rem;
  }

  .login-form {
    width: 90%;
  }
}
.password-group {
  position: relative;
}

input {
  width: 100%;
  padding: 0.75rem;
  padding-right: 2.5rem; /* Space for the eye icon */
  border: 1px solid #4169E1;
  border-radius: 4px;
  font-size: 1rem;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #4169E1; /* Color of the eye icon */
}

.eye-icon i {
  font-size: 1.2rem; /* Make sure the icon is the right size */
}


</style>
