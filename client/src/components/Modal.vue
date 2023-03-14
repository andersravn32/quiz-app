<script setup>
import useModal from "../composables/useModal";

const modal = useModal();

const handle = (e) => {
  if (!(e.target.localName == "dialog")) {
    return;
  }

  return modal.toggle();
};
</script>

<template>
  <dialog :open="modal.show.value" @click="handle">
    <article>
      <Suspense>
        <component
          v-if="modal.getComponent()"
          :is="modal.getComponent()"
          @close="modal.toggle()"
        />
        <template #fallback> Loading... </template>
      </Suspense>
    </article>
  </dialog>
</template>
