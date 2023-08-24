<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div>
      <list-header bgColor="bg-green-4">Completed</list-header>
      <q-list bordered separator>
        <task
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import task from "../Tasks/Task.vue";
import ListHeader from "../Shared/ListHeader.vue";

export default {
  props: ["tasksCompleted"],
  components: {
    task,
    ListHeader,
  },
};
</script>

<style lang="scss" scoped></style>
