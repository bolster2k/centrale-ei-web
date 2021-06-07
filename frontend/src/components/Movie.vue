<template>
  {{ movie.title }}<br>
  {{ movie.release_date}}<br>
  <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"/>
</template>
<script>
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
};
</script>
<style scoped>
img {
    width: 200px
}
</style>