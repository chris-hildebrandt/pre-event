<template>

  <div class="modal fade" id="create-event" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <form @submit.prevent="handleSubmit" class="row">
          <div class="mb-3 col-12">
            <input v-model="editable.name" required type="text" class="form-control" id="name" aria-describedby="name"
              placeholder="Name of Event">
          </div>
          <div class="mb-3 col-12">
            <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
              placeholder="Cover Image">
          </div>
          <div class="mb-3 col-12">
            <input v-model="editable.location" required type="text" class="form-control" id="location"
              aria-describedby="location" placeholder="Location of Event">
          </div>
          <div class="mb-3 col-12">
            <label for="capacity">How many can attend?</label>
            <input v-model="editable.capacity" required type="number" class="form-control" id="capacity">
          </div>
          <div class="d-flex justify-content-evenly align-items-center">
            <div class="m-3 col-3">
              <input v-model="editable.startDate" required type="date" class="" id="date" :min="(new Date().toISOString().slice(0,10))">
            </div>
            <div class="form-group m-3 col-3">
              <select v-model="editable.type" name="" id="" class="custom-select">
                <option disabled value="">Event Category</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sporting Event</option>
                <option value="digital">Digital Event</option>
              </select>
            </div>
          </div>
          <div class="mb-3 col-12">
            <label for="description" class="form-label ">Description:</label>
            <textarea v-model="editable.description" required minlength="3" maxlength="500" rows="8" class=""
              id="description"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { ref } from "vue";
import { router } from "../router.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({ type: '' })
    return {
      editable,
      async handleSubmit() {
        try {
          const eventData = await eventsService.createEvent(editable.value)
          Pop.success('Event Created Successfully!')
          router.push('/events/'+eventData.id)
          Modal.getOrCreateInstance(document.getElementById('create-event')).hide()
        }
        catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#description {
  width: inherit;
}
</style>