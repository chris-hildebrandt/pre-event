<template>
  <div class="col-3 card btn selectable selectable-none elevation-3">
    <div class="p-2">
      <img class="img-fluid" :src="towerEvent.coverImg" alt="event image">
    </div>
  </div>
</template>

<script>
import { Event } from "../models/Event.js";

export default {
  props: { towerEvent: { type: Event, required: true } },

  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>