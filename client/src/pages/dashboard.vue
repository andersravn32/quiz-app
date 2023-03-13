<script setup>
import useAccount from "../composables/useAccount";

const account = useAccount();
</script>

<template>
  <section id="page-dashboard" class="container">
    <h1>Dashboard</h1>
    <hgroup>
      <h2>Velkommen {{ account.firstName }}!</h2>
      <h3>
        <small>Nedenfor kan du se de quizzer som du kan tage.</small>
      </h3>
    </hgroup>
    <div class="grid">
        
    </div>
  </section>
</template>
