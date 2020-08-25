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
          <p>Información</p>
        </div>
        <div class="message-body has-text-justified has-background-white content">
          <p>
            La educación es un derecho humano fundamental, que se debe garantizar en todo momento. Además, en situaciones de emergencia, la
            educación puede ser tanto para salvar vidas como para sustentarlas, brindando protección física y psicosocial. Los espacios
            seguros para el aprendizaje y apoyo para niñas, niños y adolescentes mitigan las repercusiones psicosociales de los conflictos y
            los desastres al ofrecer un sentimiento de normalidad, estabilidad, estructura y esperanza para el futuro.
          </p>
          <p>
            Para tomar decisiones informadas en el sector educativo que permitan organizar la respuesta a la emergencia, preparar la fase de
            recuperación y reducir futuros riesgos, es crucial contar con evidencia actualizada desde las comunidades educativas a través de
            un sistema de información.
          </p>
          <p>
            Por ello, el Fondo de Naciones Unidas para la Infancia (UNICEF) y la Secretaría de Educación Pública (SEP) desarrollaron
            conjuntamente este <em><strong>Tablero de Análisis Integral para el Seguimiento al Regreso a Clases</strong></em> en el contexto
            de la pandemia de COVID-19. Esta herramienta brinda información, de acuerdo con los marcos y estándares internacionales, para
            guiar intervenciones en las fases de prevención y preparación, respuesta y recuperación ante un desastre o emergencia.
          </p>
          <p>
            El tablero está dirigido a tomadores de decisión del sector, a las comunidades educativas y a padres, madres de familia y niñas,
            niños y adolescentes y al público en general. Les permite acceder a información actualizada sobre la reapertura de escuelas, las
            condiciones de agua, saneamiento e higiene y las causas, si las hubiera, para postergar el regreso a clases. Pero lo más
            importante, brinda por primera vez información sobre docentes, personal de la escuela y matricula desagregada por niñas, niños y
            adolescentes que regresa a clases desde preescolar hasta secundaria a nivel nacional. Es fundamental que el estatus de
            recuperación de actividades sea de acceso público y transparente y que tome en cuenta las circunstancias particulares de cada
            una de las comunidades educativas.
          </p>
          <p>
            Esta herramienta es un esfuerzo sin precedentes y pone a México en la vanguardia en la gestión de la información en caso de
            emergencias en el sector educativo. La información aquí contenida permitirá una mejor coordinación, planeación, asignación de
            recursos y el desarrollo de mecanismos de respuesta más rápidos y efectivos.
          </p>
          <p><strong>Leyenda</strong></p>
          <p>
            <span class="ml-1"><i class="square-danger-darker"></i> 0% - 70%</span>
          </p>
          <p>
            <span class="ml-1"><i class="square-danger"></i> 70% - 80%</span>
          </p>
          <p>
            <span class="ml-1"><i class="square-warning"></i> 80% - 90%</span>
          </p>
          <p>
            <span class="ml-1"><i class="square-success"></i> 90% - 95%</span>
          </p>
          <p>
            <span class="ml-1"><i class="square-success-darker"></i> 95% - 100%</span>
          </p>
          <p>
            <span class="ml-1"><i class="square-grey"></i> Desconocido</span>
          </p>
        </div>
      </article>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./InfoModal.component.ts"></script>
