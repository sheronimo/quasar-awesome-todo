<template>
  <q-select
    filled
    v-model="sortBy"
    :options="options"
    map-options
    label="Sort by"
    stack-label
    class="col q-ml-sm"
    emit-value
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          label: "Name",
          value: "name",
        },
        {
          label: "Date",
          value: "dueDate",
        },
      ],
    };
  },
  computed: {
    ...mapState("tasks", ["sort"]),
    sortBy: {
      get() {
        return this.sort;
      },
      set(value) {
        this.setSort(value);
      },
    },
  },
  methods: {
    ...mapActions("tasks", ["setSort"]),
  },
};
</script>

<style lang="scss" scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
