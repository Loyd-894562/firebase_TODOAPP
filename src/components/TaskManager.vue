<template>
  <div>
    <h1>Task Manager</h1>
    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Enter a task" />
      <button type="submit">Add Task</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button @click="toggleTask(task)">Toggle</button>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default {
  setup() {
    const tasks = ref([]);
    const newTask = ref('');

    const loadTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      tasks.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    const addTask = async () => {
      if (!newTask.value) return;
      const docRef = await addDoc(collection(db, 'tasks'), {
        title: newTask.value,
        completed: false,
      });
      tasks.value.push({ id: docRef.id, title: newTask.value, completed: false });
      newTask.value = '';
    };

    const toggleTask = async task => {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, { completed: !task.completed });
      task.completed = !task.completed;
    };

    const deleteTask = async id => {
      await deleteDoc(doc(db, 'tasks', id));
      tasks.value = tasks.value.filter(task => task.id !== id);
    };

    onMounted(loadTasks);

    return { tasks, newTask, addTask, toggleTask, deleteTask };
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
