<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      class="col"
      :rules="[(val) => !!val || 'Field is required']"
      ref="name"
      v-select-all
      v-autofocus
    >
      <template v-slot:append>
        <q-icon
          v-if="name"
          name="close"
          @click="$emit('update:name', '')"
          class="cursor-pointer"
        /> </template
    ></q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";
import { autofocus } from "src/directives/directive-autofocus";

export default {
  props: ["name"],
  directives: {
    selectAll,
    autofocus,
  },
};
</script>
