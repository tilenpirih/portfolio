<script setup lang="ts">
type Preset = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'flip-up'

const {
  preset = 'fade-up',
  delay = 0,
  asChild = false,
} = defineProps<{
  preset?: Preset
  /** Seconds. Stagger a list by passing index * 0.08 or so. */
  delay?: number
  /** Animate the slotted element itself instead of wrapping it in a div.
      Needed where a wrapper would break layout, e.g. a v-col inside a v-row. */
  asChild?: boolean
}>()

// Named after the direction the element travels *toward*, matching the AOS
// names these replaced, so `fade-up` starts low and rises.
const presets: Record<Preset, Record<string, number>> = {
  'fade-up': { opacity: 0, y: 40 },
  'fade-down': { opacity: 0, y: -40 },
  'fade-left': { opacity: 0, x: 40 },
  'fade-right': { opacity: 0, x: -40 },
  'flip-up': { opacity: 0, rotateX: -50, transformPerspective: 1000 },
}
</script>

<template>
  <motion
    :as-child="asChild"
    :initial="presets[preset]"
    :while-in-view="{ opacity: 1, x: 0, y: 0, rotateX: 0 }"
    :in-view-options="{ once: true, amount: 0.2 }"
    :transition="{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </motion>
</template>
