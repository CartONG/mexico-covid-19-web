<template>
  <div class="is-inline">
    <a href="#" @click.stop.prevent="active = true">
      <span class="icon has-text-primary-bis">
        <i class="mdi mdi-36px mdi-information-outline"></i>
      </span>
    </a>
    <b-modal :active="active" @close="active = false">
      <article class="message px-2 has-no-background">
        <div class="message-body has-text-justified has-background-white content">
          <p>
            Haga click con el cursor sobre la flecha marrón (
            <span class="icon has-text-primary-bis"><i class="mdi mdi-24px mdi-chevron-up"></i></span>
            ) para obtener más información y estadísticas. Haga click de nuevo sobre la flecha (
            <span class="icon has-text-primary-bis"><i class="mdi mdi-24px mdi-chevron-down"></i></span>
            ) para ocultar la tarjeta de información.
          </p>
        </div>
      </article>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./DetailsInfoModal.component.ts"></script>
