<template>
  <img :src="`https://image.tmdb.org/t/p/original${movie.path}`" /><br />
  {{ movie.title }}<br />
  {{ dateday(movie.date) }}
</template>
<script>
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
  methods: {
    dateday: function (date) {
      let u = "";
      for (let i = 0; i < 10; i++) {
        u = u.concat(date[i]);
      }
      return u;
    },
  },
};
</script>
<style scoped>
img {
  width: 15em;
}
</style>
