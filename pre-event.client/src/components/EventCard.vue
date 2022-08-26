<template>
  <div class="col-3 card btn selectable selectable-none elevation-3" @click="navigateToEvent(`${event.id}`)">
    <div class="p-2">
      <img class="img-fluid" :src="event.coverImg" alt="event image">
      <h5 class="text-light mb-0 pb-1 pt-2">{{event.name}}</h5>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { router } from "../router.js";

export default {
  props: { event: { type: Event, required: true } },

  setup() {
    return {
      events: computed(()=> AppState.events),
      navigateToEvent(eventId){
        router.push('/events/'+ eventId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-gray{
  background-color: #343a40;
}
</style>