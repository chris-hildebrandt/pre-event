<template>
  <div class="container-fluid event-img" v-if="event">
    <div class="row">
      <div class="col-8 offset-1">
        <p><h1>{{ event.name }}</h1></p>
      </div>
      <button v-if="event.creatorId == account.id" type="button" class="m-2 btn btn-primary col-1"
        data-bs-toggle="modal" data-bs-target="#create-event">
        Edit
      </button>
      <button v-if="event.creatorId == account.id" type="button" class="m-2 btn btn-danger col-1"
        @click="cancelEvent(`${event.id}`)">
        Cancel
      </button>
      <div v-if="event.capacity < 1" class="bg-danger">SOLD OUT</div>
      <div v-if="event.isCanceled" class="col-12 p-5 bg-danger text-center">
        <h4>Event Cancelled</h4>
      </div>
      <div class="col-6 offset-1">
        <p class="elevation-2 p-2">{{ event.description }}</p>
      </div>
      <div class="col-3 offset-1">
        <p class="elevation-2 p-2"><div>Location:<h5>{{ event.location}}</h5>
        </div>
        <div>Date:<h5>{{ new Date(event.startDate).toLocaleDateString('en-US', {
              month: 'short', day: '2-digit'}) }}</h5>
        </div>
        <div>Seats Remaining:<h5>{{ event.capacity }}</h5>
        </div>
        </p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="card col-12">{{}}</div>
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

    async function getTickets(eventId){
      try {
      await eventsService.getTickets(eventId)
      } catch (error) {
      logger.error('[getting event tickets]', error);
      Pop.error(error);
      }
    }

        async function getComments(eventId){
      try {
      await eventsService.getComments(eventId)
      } catch (error) {
      logger.error('[getting event tickets]', error);
      Pop.error(error);
      }
    }

    onMounted(() => {
      getEvents()
      getComments(AppState.activeEvent.id)
      getTickets(AppState.activeEvent.id)
    })

    return {
      cover: computed(() => `url(${AppState.activeEvent.coverImg || 'https://i.pinimg.com/originals/b5/94/6e/b5946e195cdff505e697a8dad43ae5fe.jpg'})`),
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
  height: 50vh;
}
p{
  background-color: rgb(0, 0, 0, .5);
}
</style>