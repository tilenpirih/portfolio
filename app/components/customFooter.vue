<script setup lang="ts">
import { mdiCopyright, mdiEmail, mdiFacebook, mdiGithub, mdiLinkedin, mdiPhone } from '@mdi/js'

const discordIcon = 'm22 24l-5.25-5l.63 2H4.5A2.5 2.5 0 0 1 2 18.5v-15A2.5 2.5 0 0 1 4.5 1h15A2.5 2.5 0 0 1 22 3.5V24M12 6.8c-2.68 0-4.56 1.15-4.56 1.15c1.03-.92 2.83-1.45 2.83-1.45l-.17-.17c-1.69.03-3.22 1.2-3.22 1.2c-1.72 3.59-1.61 6.69-1.61 6.69c1.4 1.81 3.48 1.68 3.48 1.68l.71-.9c-1.25-.27-2.04-1.38-2.04-1.38S9.3 14.9 12 14.9s4.58-1.28 4.58-1.28s-.79 1.11-2.04 1.38l.71.9s2.08.13 3.48-1.68c0 0 .11-3.1-1.61-6.69c0 0-1.53-1.17-3.22-1.2l-.17.17s1.8.53 2.83 1.45c0 0-1.88-1.15-4.56-1.15m-2.07 3.79c.65 0 1.18.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27m4.17 0c.65 0 1.17.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27Z'

const socials = [
  { label: 'GitHub', icon: mdiGithub, href: 'https://github.com/tilenpirih' },
  { label: 'LinkedIn', icon: mdiLinkedin, href: 'https://www.linkedin.com/in/tilen-pirih-292797320/' },
  { label: 'Discord', icon: discordIcon, href: 'https://discordapp.com/users/254138818351988737' },
  { label: 'Facebook', icon: mdiFacebook, href: 'https://www.facebook.com/tilen.pirih/' },
]
</script>

<template>
  <v-divider />

  <v-footer class="flex justify-center py-6">
    <div>
      <nav class="flex justify-center" aria-label="Social links">
        <v-btn
          v-for="social in socials"
          :key="social.href"
          class="mx-1"
          :icon="social.icon"
          variant="outlined"
          :href="social.href"
          target="_blank"
          rel="noopener"
          :aria-label="`${social.label} (opens in a new tab)`"
        />
      </nav>
      <div class="flex justify-center mt-3">
        <v-icon class="mr-2" color="primary" :icon="mdiPhone" aria-hidden="true" />
        <a href="tel:+38651731371">(+386) 51 731 371</a>
      </div>
      <div class="flex justify-center">
        <v-icon class="mr-2" color="primary" :icon="mdiEmail" aria-hidden="true" />
        <a href="mailto:tilen.pirih@gmail.com">tilen.pirih@gmail.com</a>
      </div>
      <div class="flex justify-center items-center mt-2">
        Tilen Pirih
        <v-icon :icon="mdiCopyright" size="small" class="ml-1" />2024
      </div>
    </div>
  </v-footer>
</template>