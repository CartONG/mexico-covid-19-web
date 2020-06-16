<template>
  <div class="main">
    <section class="section">
      <div class="container is-fluid">
        <h1 class="has-text-primary main-title">COVID19 DASHBOARD - Simulación Servicio Educativo</h1>
        <BreadcrumbVue />
        <div class="columns">
          <div class="column is-9">
            <ChoroplethMapVue />
          </div>
          <div class="column is-3">
            <IndicatorsVue />
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <RateListVue />
          </div>
          <div class="column is-6"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./Main.component.ts"></script>
