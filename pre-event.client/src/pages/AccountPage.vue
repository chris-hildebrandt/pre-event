<template>
  <div class="container-fluid">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
    </div>
    <div class="row">
      <div class="col-6 text-center">
        <h3>My Events</h3>
        <div class="row">
          <button class="btn btn-info" @click="" data-bs-toggle="modal" data-bs-target="#create-event">Create
            Event</button>
          <EventCard v-for="e in events" :key="e.id" :event="e" />
        </div>
      </div>
      <div class="col-6 text-center">
        <h3>My Tickets</h3>
        <div class="row"></div>
        <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" />
      </div>
    </div>
  </div>
  <EventForm />
</template>

<script>
import { ticketsService } from "../services/TicketsService.js";
import { eventsService } from "../services/EventsService.js";
import TicketCard from "../components/TicketCard.vue";
import { logger } from "../utils/Logger.js";
import { computed, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { AppState } from '../AppState'
import Pop from "../utils/Pop.js";

export default {
  name: "Account",
  setup() {

    const route = useRoute()

    async function getEventsByAccountId() {
      try {
        await eventsService.getEventsByAccountId(route.userInfo.id);
      }
      catch (error) {
        logger.error("[getting event by account id]", error);
        Pop.error(error);
      }
    }
    async function getTickets() {
      try {
        await ticketsService.getTickets()
      } catch (error) {
        logger.error('[getting event tickets]', error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getEventsByAccountId();
      getTickets();
    });
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      tickets: computed(()=> AppState.tickets),
      async handleSubmit() {
        try {
          const eventData = await eventsService.createEvent(editable.value);
          Pop.success("Event Created Successfully!");
          router.push("/event/" + eventData.eventId);
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
  components: { TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
