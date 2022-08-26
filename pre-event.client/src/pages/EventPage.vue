<template>
  <div class="container-fluid event-img" v-if="event">
    <div class="row">
      <div class="col-8">
      <h1>{{ event.name }}</h1>
      </div>
      <button v-if="event.creatorId == account.id" type="button" class="btn btn-primary col-2" data-bs-toggle="modal"
        data-bs-target="#create-event">
        Edit Event
      </button>
      <button v-if="event.creatorId == account.id" type="button" class="btn btn-danger col-2"
        @click="cancelEvent(`${event.id}`)">
        Cancel Event
      </button>
      <div v-if="event.capacity < 1" class="bg-danger">SOLD OUT</div>
      <div v-if="event.isCanceled" class="col-12 p-5 bg-danger text-center">
        <h4>Event Cancelled</h4>
      </div>
    </div>
  </div>
  <EventForm />
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import EventForm from "../components/EventForm.vue"
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {

  name: 'Event',
  components: { EventForm },

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
      cover: computed(() => `url(${AppState.activeEvent.coverImg})`),
      event: computed(() => AppState.events.find(e => e.id == route.params.eventId)),
      account: computed(() => AppState.account),
      async cancelEvent(eventId) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this event? This action cannot be undone!')
          if (!yes) { return }
          await eventsService.cancelEvent(eventId)
        } catch {
          logger.error('[canceling event]', error)
          Pop.error(error)
        }
      },

    }

  }
}
</script>

<style lang="scss" scoped>
.event-img {
  background-position: center;
  background-size: cover;
  background-image: v-bind(cover);
  height: 30vh;
}
</style>