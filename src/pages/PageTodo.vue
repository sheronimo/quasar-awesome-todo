<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <div class="row q-mb-lg">
        <search></search>
        <sort></sort>
      </div>

      <p
        v-if="
          search &&
          !Object.keys(tasksTodo).length &&
          !Object.keys(tasksCompleted).length
        "
      >
        No search results.
      </p>

      <q-scroll-area class="q-scroll-area-tasks relative-position">
        <no-tasks v-if="!Object.keys(tasksTodo).length && !search"></no-tasks>

        <tasks-todo
          :tasksTodo="tasksTodo"
          v-if="Object.keys(tasksTodo).length"
        ></tasks-todo>

        <tasks-completed
          :tasksCompleted="tasksCompleted"
          v-if="Object.keys(tasksCompleted).length"
          class="q-mt-lg q-mb-xl"
        ></tasks-completed>
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          @click="showAddTask = true"
          class="all-pointer-events"
          round
          color="primary"
          size="24px"
          icon="add"
        />
      </div>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task-modal @close="showAddTask = false"></add-task-modal
    ></q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import task from "../components/Tasks/Task.vue";
import NoTasks from "../components/Tasks/NoTasks.vue";
import TasksTodo from "../components/Tasks/TasksTodo.vue";
import TasksCompleted from "../components/Tasks/TasksCompleted.vue";
import AddTaskModal from "../components/Tasks/Modals/AddTask.vue";
import Search from "../components/Tasks/Tools/Search.vue";
import Sort from "../components/Tasks/Tools/Sort.vue";

export default {
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["search"]),
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  },
  components: {
    task,
    AddTaskModal,
    TasksTodo,
    TasksCompleted,
    NoTasks,
    Search,
    Sort,
  },
};
</script>

<style lang="scss" scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;

  .mobile & {
    flex-basis: 100px;
  }
}
</style>
