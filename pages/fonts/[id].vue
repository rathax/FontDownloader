<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo(to.path.replace("/fonts/", "/font/"), { redirectCode: 301 })
    },
  ],
});
</script>