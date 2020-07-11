<template>
  <div>
    <a href="#" @click.stop.prevent="active = true">
      <span class="icon has-text-primary">
        <i class="mdi mdi-24px mdi-information-outline"></i>
      </span>
    </a>
    <b-modal :active="active" @close="active = false">
      <article class="message px-2 has-no-background">
        <div class="message-header has-background-secondary">
          <p>Información</p>
        </div>
        <div class="message-body has-text-justified has-background-white content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
            nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
            Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula,
            id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
            nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
            Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula,
            id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
            nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
            Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula,
            id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
          </p>
        </div>
      </article>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./InfoModal.component.ts"></script>
