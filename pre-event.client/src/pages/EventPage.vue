<template>
  <section v-if="event">
    <div class="container event-img">
      <div class="row">
        <div class="col-8 offset-1">
          <p>
          <h1>{{ event.name }}</h1>
          </p>
        </div>
        <button v-if="event.creatorId == account.id" type="button" class="m-2 btn btn-primary col-1"
          data-bs-toggle="modal" data-bs-target="#create-event">
          Edit
        </button>
        <button v-if="event.creatorId == account.id && event.isCanceled == false" type="button"
          class="m-2 btn btn-danger col-1" @click="cancelEvent(`${event.id}`)">
          Cancel
        </button>
        <button v-if="event.creatorId == account.id && event.isCanceled == true" type="button"
          class="m-2 btn btn-danger col-1" @click="cancelEvent(`${event.id}`)">
          Un-Cancel
        </button>
        <div v-if="event.capacity < 1" class="bg-danger">SOLD OUT</div>
        <div v-if="event.isCanceled" class="col-12 p-5 bg-danger text-center">
          <h4>Event Cancelled</h4>
        </div>
        <div class="col-6 offset-1">
          <p class="elevation-2 p-2">{{ event.description }}</p>
        </div>
        <div class="col-3 offset-1">
          <p class="elevation-2 p-2">
          <div>Location:<h5>{{ event.location }}</h5>
          </div>
          <div>Date:<h5>{{ new Date(event.startDate).toLocaleDateString('en-US', {
              month: 'short', day: '2-digit'
            })
          }}</h5>
          </div>
          <div class="row justify-content-evenly">
            <div class="col-6">Seats Remaining:<h5>{{ event.capacity }}</h5>
            </div>
            <button v-if="!hasTicket" class="btn btn-success col-4" @click="createTicket">Claim Ticket</button>
            <button v-if="hasTicket" class="btn btn-warning col-4" @click="removeTicket">Refund Ticket</button>
          </div>
          <span v-if="hasTicket">You are attending this event</span>
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row bg-dark">
        <div class="col-12 d-flex p-2">
          <div v-for="t in tickets" :key="t.id"><img class="profile-img m-1" :title="t.profile?.name"
              :src="t.profile?.picture" alt="profile-img">
          </div>
        </div>
      </div>
      <div class="col-12 m-2">
        <form class="card p-3" @submit.prevent="handleSubmit">
          <div><img class="profile-img" :src="account.picture" alt="profile-img" :title="account.name">
          </div>
          <label for="" class="form-label">Comment Below:</label>
          <textarea type="text" required v-model="editable.body" name="comment" rows="6"></textarea>
          <button type="submit" class="btn btn-primary rounded-pill">post</button>
        </form>
      </div>
      <div v-for="c in comments" :key="c.id">
        <div class="row">
          <div class="card p-2 elevation-2">
            <div class="col-2 d-flex align-items-center"><img class="profile-img-lg" :src="c.creator?.picture" :title="c.creator?.name"
                alt="profile-picture">
              <p class="px-4 mt-3">{{ c.creator?.name }}</p>
            </div>
            <div class="col-8 p-3">
              <p>{{ c.body }}</p>
            </div>
            <button v-if="c.creatorId == account.id" class="btn btn-danger" @click="deleteComment(c.id)">delete comment</button>
          </div>
        </div>
      </div>
    </div>


    <EventForm />
  </section>
  <section v-else>loading...</section>
</template>

<script>
import { ticketsService } from "../services/TicketsService.js";
import { eventsService } from "../services/EventsService.js";
import EventForm from "../components/EventForm.vue"
import { logger } from "../utils/Logger.js";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";

export default {

  name: 'Event',
  components: { EventForm },

  setup() {

    const route = useRoute()
    const editable = ref({})

    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        logger.error('[getting event by id]', error);
        Pop.error(error);
      }
    }

    async function getTickets() {
      try {
        await eventsService.getTickets(route.params.eventId)
      } catch (error) {
        logger.error('[getting event tickets]', error);
        Pop.error(error);
      }
    }

    async function getComments() {
      try {
        await eventsService.getComments(route.params.eventId)
      } catch (error) {
        logger.error('[getting event comments]', error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      getEventById()
      getComments()
      getTickets()
    })

    return {
      editable,
      hasTicket: computed(() => {
        if (AppState.tickets.find(t => t.accountId == AppState.account?.id)) {
          return true
        }
        return false
      }),
      event: computed(() => AppState.activeEvent),
      cover: computed(() => `url(${AppState.activeEvent?.coverImg || 'https://i.pinimg.com/originals/b5/94/6e/b5946e195cdff505e697a8dad43ae5fe.jpg'})`),
      // event: computed(() => AppState.events.find(e => e.id == route.params.eventId)),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
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
      async createTicket() {
        try {
          let newTicket = {
            eventId: AppState.activeEvent.id,
            accountId: AppState.account.id
          }
          await ticketsService.createTicket(newTicket)
          this.event.capacity--
        } catch (error) {
          logger.error('[making ticket]', error);
          Pop.error(error);
        }
      },
      async removeTicket() {
        try {
          let ticket = AppState.tickets.find(t => t.accountId == AppState.account.id)
          await ticketsService.removeTicket(ticket)
          this.event.capacity++
        } catch (error) {
          logger.error('[remove ticket]', error);
          Pop.error(error);
        }
      },

      async handleSubmit() {
        try {
          editable.value.eventId = route.params.eventId
          editable.value.creatorId = this.account.id
          await eventsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          logger.error('[]', error);
          Pop.error(error);
        }
      },

      async deleteComment(commentId) {
        try {
        await eventsService.deleteComment(commentId)
        getComments()
        } catch (error) {
        logger.error('[deleting comment]', error);
        Pop.error(error);
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
  height: 60vh;
}

p {
  background-color: rgb(0, 0, 0, .5);
}

.profile-img {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}

.profile-img-lg {
  height: 48px;
  width: 48px;
  border-radius: 50%;
}
</style>