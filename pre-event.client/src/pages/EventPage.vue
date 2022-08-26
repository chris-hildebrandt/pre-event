<template>
  <div class="events" v-if="event">
    
    <h1>{{ event.name }}</h1>
    <div v-if="event.capacity < 1" class="bg-danger">SOLD OUT</div>
    <div v-if="event.isCanceled" class="bg-danger">Cancelled</div>
  </div>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-event">
  Create Event
</button>
<EventForm />
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import EventForm from "../components/EventForm.vue"

export default {

name: 'Event',
components: {EventForm},

  setup() {

    const route = useRoute()

    async function getEvents() {
      try {
        await eventsService.getEvents();
      }
      catch (error) {
        logger.error("[getting events]", error);
        Pop.error(error);
      }
    }



    onMounted(() => {
      getEvents()
    })

    return {

      event: computed(() => AppState.events.find(e => e.id == route.params.eventId))

    }

  }
}
</script>
