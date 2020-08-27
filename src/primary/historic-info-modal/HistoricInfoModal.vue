<template>
  <div class="is-inline">
    <a href="#" @click.stop.prevent="active = true">
      <span class="icon has-text-primary">
        <i class="mdi mdi-24px mdi-information-outline"></i>
      </span>
    </a>
    <b-modal :active="active" @close="active = false">
      <article class="message px-2 has-no-background">
        <div class="message-body has-text-justified has-background-white content">
          <p>
            Coloque el cursor en la barra marrón ubicada bajo el gráfico y mueva a derecha o izquierda sus extremos circulares para elegir
            el periodo de interés.
          </p>
        </div>
      </article>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./HistoricInfoModal.component.ts"></script>
