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
          <div v-for="e in events" :key="e.id">
            
          </div>
      </div>
    </div>
    <div class="col-6 text-center">
      <h3>My Tickets</h3>
      <div class="row"></div>
    </div>
  </div>
</div>
<EventForm/>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  name: 'Account',
  setup() {

    async function getEventsByAccountId(accountId){
      try {
      await eventsService.getEventsByAccountId(accountId)
      } catch (error) {
      logger.error('[]', error);
      Pop.error(error);
      }
    }

    onMounted(()=>{
      getEventsByAccountId(AppState.account.id)
    })

    return {
      account: computed(() => AppState.account),
      events: computed(()=> AppState.events),
      async handleSubmit() {
        try {
          const eventData = await eventsService.createEvent(editable.value)
          Pop.success('Event Created Successfully!')

          router.push('/event/' + eventData.eventId)
        }
        catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
