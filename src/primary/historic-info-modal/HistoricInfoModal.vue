<template>
  <div class="is-inline">
    <a href="#" @click.stop.prevent="active = true">
      <span class="icon has-text-primary">
        <i class="mdi mdi-24px mdi-information-outline"></i>
      </span>
    </a>
    <b-modal :active="active" @close="active = false">
      <article class="message px-2 has-no-background">
        <div class="message-header has-background-secondary">
          <p>Lorem ipsum</p>
        </div>
        <div class="message-body has-text-justified has-background-white content">
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>
      </article>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./HistoricInfoModal.component.ts"></script>
