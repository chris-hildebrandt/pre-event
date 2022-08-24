<template>
<div class="container-fluid">
  <div class="row justify-content-center">
    <div class="col-12 text-center">
      <h3>PreEvent</h3>
      <div class="col-10">
        <h5>Blurb about how awesome this website is blah blah blah</h5>
        <div class="row">
          <EventCard />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home'
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
