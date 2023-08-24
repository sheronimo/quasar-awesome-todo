<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header bgColor="bg-orange-4">Todo</list-header>
      <q-list bordered separator>
        <task
          v-for="(task, key) in tasksTodo"
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
  props: ["tasksTodo"],
  components: {
    task,
    ListHeader,
  },
};
</script>

<style lang="scss" scoped></style>
