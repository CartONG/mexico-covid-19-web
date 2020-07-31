<template>
  <div class="popup">
    <div class="is-clearfix">
      <div class="is-pulled-right">
        <button class="button is-white" @click="close">
          <span class="icon">
            <i class="mdi mdi-close"></i>
          </span>
        </button>
      </div>
      <div class="popup-title is-size-4">Escuelas</div>
    </div>
    <div class="popup-content">
      <nav class="panel">
        <a v-for="item in items" :key="item.id" href="#" class="panel-block" @click.prevent.stop="$emit('pick', item)">
          {{ item.name }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" src="./Popup.component.ts"></script>
