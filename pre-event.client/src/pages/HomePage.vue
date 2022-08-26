<template>
  <div class="container-fluid">
      <div class="col-12 text-center text-light bg-gray">
        <div class="row bg-gray text-light">
          <h5 v-if="filterTerm == ''">pre-view... pre-pay... pre-pare... Pre-EVENT</h5>
          <h5 v-if="filterTerm == 'concert'">maybe we should have gone with "congregate" or "eventneve" or 'STEVENT'...</h5>
          <h5 v-if="filterTerm == 'convention'">Life is better together! pick an event and socialize!</h5>
          <h5 v-if="filterTerm == 'sport'">absolutely legitimate! no hidden fees! zero sales tax! absolutely free tickets! totally legal!</h5>
          <h5 v-if="filterTerm == 'digital'">Fight the power, leave the Tower!</h5>
          <div class="col-12 text-light bg-gray">Filter <i class="mdi mdi-filter mdi-24px"></i>
          </div>
          <div class="col-2 px-0 mt-3 tab rounded-top btn btn-success" @click="filterTerm = ''">All</div>
          <div class="col-2 px-0 mt-3 tab rounded-top btn btn-success" @click="filterTerm = 'concert'">Concerts</div>
          <div class="col-2 px-0 mt-3 tab rounded-top btn btn-success" @click="filterTerm = 'convention'">Conventions</div>
          <div class="col-2 px-0 mt-3 tab rounded-top btn btn-success" @click="filterTerm = 'sport'">Sports</div>
          <div class="col-2 px-0 mt-3 tab rounded-top btn btn-success" @click="filterTerm = 'digital'">Digital</div>
          <div class="col-2 px-0 mt-3 tab rounded-top btn btn-success" @click="getCancelledEvents">Cancelled</div>
            <EventCard v-for="e in events" :key="e.id" :event="e" />
        </div>
      </div>
  </div>
</template>

<script>
import { eventsService } from "../services/EventsService.js"
import { logger } from "../utils/Logger.js";
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";

export default {
  name: "Home",

  setup() {

    const filterTerm = ref('')

    async function getEvents() {
      try {
        await eventsService.getEvents();
        AppState.events = AppState.events.filter(e => e.isCanceled == false)
      }
      catch (error) {
        logger.error("[getting events]", error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      getEvents();
    });
    return {
      filterTerm,
      events: computed(()=> AppState.events.filter(e=> filterTerm.value ? e.type == filterTerm.value : true )),

    };
  }
}

</script>

<style scoped lang="scss">

.tab{
  border-radius: 0%;
  border: 1px solid black
}

.bg-gray{
  background-color: #343a40;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
