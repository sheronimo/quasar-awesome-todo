import Vue from "vue";
import { uid } from "quasar";

const state = {
  tasks: {
    ID1: {
      name: "Go to shop",
      completed: false,
      dueDate: "2019/05/12",
      dueTime: "18:30",
    },
    ID2: {
      name: "Get bananas",
      completed: false,
      dueDate: "2019/05/13",
      dueTime: "14:00",
    },
    ID3: {
      name: "Get apples",
      completed: false,
      dueDate: "2019/05/14",
      dueTime: "18:00",
    },
  },
  search: "",
  sort: "dueDate",
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, val) {
    state.search = val;
  },
  setSort(state, val) {
    state.sort = val;
  },
};

const actions = {
  updateTask({ commit }, payload) {
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task,
    };
    commit("addTask", payload);
  },
  setSearch({ commit }, val) {
    commit("setSearch", val);
  },
  setSort({ commit }, val) {
    commit("setSort", val);
  },
};

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {};
    let keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase();
      let taskBProp = state.tasks[b][state.sort].toLowerCase();

      return taskAProp < taskBProp ? -1 : taskAProp > taskBProp ? 1 : 0;
    });

    keysOrdered.forEach((key) => {
      tasksSorted[key] = state.tasks[key];
    });

    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted;
    let tasksFiltered = {};
    if (state.search) {
      Object.keys(tasksSorted).forEach((key) => {
        let task = tasksSorted[key];

        if (task.name.toLowerCase().includes(state.search.toLowerCase())) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
