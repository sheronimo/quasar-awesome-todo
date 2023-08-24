<template>
  <q-card>
    <modal-header>Add Task</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name
          :name.sync="taskToSubmit.name"
          ref="modalTaskName"
        ></modal-task-name>

        <modal-due-date
          :dueDate.sync="taskToSubmit.dueDate"
          @clear="clearDueDate"
        ></modal-due-date>

        <modal-due-time
          :dueTime.sync="taskToSubmit.dueTime"
          v-if="taskToSubmit.dueDate"
        ></modal-due-time>
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit-task";

export default {
  props: ["task", "id"],
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {},
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitTask() {
      this.updateTask({ id: this.id, updates: this.taskToSubmit });
      this.$emit("close");
    },
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  },
};
</script>
