<template>
  <div class="col-3 card btn selectable selectable-none elevation-3" @click="navigateToEvent(`${ticket.eventId}`)">
    <div class="p-2">
      <img class="img-fluid" :src="ticket.event?.coverImg" alt="event image">
      <h5 class="text-light mb-0 pb-1 pt-2">{{ticket.event?.name}}</h5>
      <h5 class="text-light mb-0 pb-1 pt-2">{{new Date(ticket.event?.startDate).toLocaleDateString('en-US', {
              month: 'short', day: '2-digit'
            })}}</h5>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { router } from "../router.js";

export default {
  props: { ticket: { type: Object, required: true } },

  setup() {
    
    return {
      events: computed(()=> AppState.events),
      async navigateToEvent(eventId){
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