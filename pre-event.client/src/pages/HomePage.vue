<template>
<div class="container-fluid">
  <div class="row justify-content-center">
    <div class="col-12 text-center">
      <h3>PreEvent</h3>
      <div class="col-10">
        <h5>Blurb about how awesome this website is blah blah blah</h5>
        <!-- <div class="col-3" v-for="e in events" :key="e.id">
          <EventCard :event="e"/> -->
        </div>
      </div>
    </div>
  </div>
<!-- </div> -->
</template>

<script>
import { eventsService } from "../services/EventsService.js"
import { computed, onMounted, ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import EventCard from "../components/EventCard.vue";

export default {
    name: "Home",
    Setup() {
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
            getEvents();
        });
        return {
            events: computed(() => AppState.events)
        };
    },
    components: { EventCard }
}

</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
