<template>
  <q-item
    clickable
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    v-ripple
    v-touch-hold:1000.mouse="showEditTaskModal"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs"></q-icon>
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">
            {{ task.dueDate | niceDate }}
          </q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />
        <q-btn
          @click.stop="confirmDelete(id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task-modal
        @close="showEditTask = false"
        :task="task"
        :id="id"
      ></edit-task-modal
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EditTaskModal from "./Modals/EditTask.vue";
import { date } from "quasar";
const { formatDate } = date;

export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false,
    };
  },
  computed: {
    ...mapState("tasks", ["search"]),
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    confirmDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete this item?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
    showEditTaskModal() {
      this.showEditTask = true;
    },
  },
  filters: {
    niceDate(val) {
      return formatDate(val, "MMM D");
    },
    searchHighlight(val, search) {
      if (search) {
        let searchRegex = new RegExp(search, "ig");
        return val.replace(searchRegex, (match) => {
          return `<span class="bg-yellow-6">${match}</span>`;
        });
      }
      return val;
    },
  },
  components: {
    EditTaskModal,
  },
};
</script>

<style></style>
