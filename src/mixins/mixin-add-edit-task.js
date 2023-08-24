import ModalHeader from "components/Tasks/Modals/Shared/ModalHeader.vue";
import ModalTaskName from "components/Tasks/Modals/Shared/ModalTaskName.vue";
import ModalDueDate from "components/Tasks/Modals/Shared/ModalDueDate.vue";
import ModalDueTime from "components/Tasks/Modals/Shared/ModalDueTime.vue";
import ModalButtons from "components/Tasks/Modals/Shared/ModalButtons.vue";

export default {
  methods: {
    submitForm() {
      this.$refs.modalTaskName.$refs.name.validate();
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = "";
      this.taskToSubmit.dueTime = "";
    },
  },
  components: {
    ModalHeader,
    ModalTaskName,
    ModalDueDate,
    ModalDueTime,
    ModalButtons,
  },
};
