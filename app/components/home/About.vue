<script setup lang="ts">
import { mdiOpenInNew } from '@mdi/js'
</script>

<template>
  <div class="bg-background">
    <v-container class="py-12 text-center flex justify-center">
      <div>
        <animate-in as="h2" preset="fade-down" class="text-h3 text-primary pb-4">
          About
        </animate-in>
        <div style="max-width: 1200px;">
          <animate-in preset="fade-down">
            My name is Tilen Pirih, and I'm a full-stack developer from Slovenia. Over the years, I've had the opportunity to work on a wide variety of projects for different clients, from smaller applications to larger and more complex systems.
            <br>
            Working across such diverse projects has given me experience adapting to different requirements, codebases, teams, and ways of working. It has also allowed me to grow beyond simply implementing features, taking on responsibilities such as technical decision-making, architecture, problem solving, and improving existing systems.
            <br>
            As a self-employed developer, I've worked with both local and international clients and have often been involved throughout the development process, from understanding requirements and planning solutions to implementation and delivery.
            <br>
            I enjoy challenging projects, learning new things along the way, and finding practical solutions to complex problems. I'm always interested in opportunities where I can contribute my experience while continuing to grow as a developer.
          </animate-in>
          <animate-in preset="fade-up" class="mt-3">
            <v-btn
              variant="outlined"
              class="rounded-full"
              href="/resume_Tilen_Pirih.pdf"
              target="_blank"
              rel="noopener"
              aria-label="See my resume (opens a PDF in a new tab)"
            >
              See my resume
              <v-icon :icon="mdiOpenInNew" size="large" class="ml-2" aria-hidden="true" />
            </v-btn>
          </animate-in>
        </div>
      </div>
    </v-container>
  </div>
</template>