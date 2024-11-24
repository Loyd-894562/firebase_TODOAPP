<template>
  <div class="home-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><router-link to="/users">Users</router-link></li>
        <li><router-link to="/logs">Logs</router-link></li>
        <li><router-link to="/classes">Classes</router-link></li>
        <li><router-link to="/grades">Grades</router-link></li>
      </ul>
    </aside>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Header with Profile and Logout -->
      <header class="header">
        <div class="profile">
          <i class="fa fa-user-circle"></i> {{ user.username }}
        </div>
        <button @click="logout" class="logout-btn">Logout</button>
      </header>

      <!-- Main Content -->
      <div class="content">
        <h1>Welcome, {{ user.username }}!</h1>

        <div class="crud-container">
          <h2>Item Manager</h2>
          <form @submit.prevent="addItem" class="item-form">
            <input type="text" v-model="newItem" placeholder="Enter item name" required>
            <button type="submit">Add Item</button>
          </form>

          <ul class="item-list">
            <li v-for="item in items" :key="item.id" class="item">
              <template v-if="editingItem?.id === item.id">
                <input v-model="editingItem.name" @keyup.enter="updateItem">
                <button @click="updateItem" class="save-btn">Save</button>
              </template>
              <template v-else>
                {{ item.name }}
                <div class="item-actions">
                  <button @click="startEditing(item)" class="edit-btn">Edit</button>
                  <button @click="deleteItem(item.id)" class="delete-btn">Delete</button>
                </div>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      items: JSON.parse(localStorage.getItem('items')) || [],
      newItem: '',
      editingItem: null
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/')
    },
    addItem() {
      const item = {
        id: Date.now(),
        name: this.newItem
      }
      this.items.push(item)
      this.newItem = ''
      this.saveItems()
    },
    startEditing(item) {
      this.editingItem = { ...item }
    },
    updateItem() {
      const index = this.items.findIndex(item => item.id === this.editingItem.id)
      this.items[index] = this.editingItem
      this.editingItem = null
      this.saveItems()
    },
    deleteItem(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveItems()
    },
    saveItems() {
      localStorage.setItem('items', JSON.stringify(this.items))
    }
  }
}
</script>

<style scoped>
/* Sidebar */
.home-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  background-color: #4169E1;
  color: white;
  width: 250px;
  padding: 1rem;
}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 1rem;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.sidebar ul li a:hover {
  text-decoration: underline;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.profile i {
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.crud-container {
  margin-top: 2rem;
}

.item-form {
  display: flex;
  margin-bottom: 1rem;
}

.item-form input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.item-form button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.item-list {
  list-style-type: none;
  padding: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn, .save-btn {
  padding: 0.25rem 0.5rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #2196F3;
}

.delete-btn {
  background-color: #f44336;
}

.save-btn {
  background-color: #4CAF50;
}
</style>
