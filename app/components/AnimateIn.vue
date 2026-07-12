<script setup lang="ts">
type Preset = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'flip-up' | 'slide-left'

const {
  preset = 'fade-up',
  delay = 0,
  as = 'div',
  asChild = false,
  immediate = false,
} = defineProps<{
  preset?: Preset
  /** Seconds. Stagger a list by passing index * 0.08 or so. */
  delay?: number
  /** Tag to render. Pass a heading (`h1`..`h6`) where the slotted text is one:
      the text-h* classes only look like headings, they don't announce as one. */
  as?: string
  /** Animate the slotted element itself instead of wrapping it in a div.
      Needed where a wrapper would break layout, e.g. a v-col inside a v-row. */
  asChild?: boolean
  /** Animate on load in CSS instead of on scroll in JS. Use this for anything
      above the fold. motion-v server-renders its `initial` state, so a JS-driven
      element ships as opacity:0 and stays invisible until the bundle has loaded
      and hydrated — which pins FCP and LCP to the whole bundle. A CSS animation
      starts as soon as the stylesheet parses. Nothing above the fold wants a
      scroll trigger anyway: it's already in view. */
  immediate?: boolean
}>()

// Named after the direction the element travels *toward*, matching the AOS
// names these replaced, so `fade-up` starts low and rises. Keep in sync with the
// @keyframes below, which are the same five presets for the `immediate` path.
const presets: Record<Preset, Record<string, number>> = {
  'fade-up': { opacity: 0, y: 40 },
  'fade-down': { opacity: 0, y: -40 },
  'fade-left': { opacity: 0, x: 40 },
  'fade-right': { opacity: 0, x: -40 },
  'flip-up': { opacity: 0, rotateX: -50, transformPerspective: 1000 },
  // No opacity on purpose — see the .animateIn--slide-left note below.
  'slide-left': { x: 40 },
}
</script>

<template>
  <component
    :is="as"
    v-if="immediate"
    class="animateIn"
    :class="`animateIn--${preset}`"
    :style="{ animationDelay: delay ? `${delay}s` : undefined }"
  >
    <slot />
  </component>

  <motion
    v-else
    :as="as"
    :as-child="asChild"
    :initial="presets[preset]"
    :while-in-view="{ opacity: 1, x: 0, y: 0, rotateX: 0 }"
    :in-view-options="{ once: true, amount: 0.2 }"
    :transition="{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </motion>
</template>

<style scoped lang="scss">
.animateIn {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: both;
}

.animateIn--fade-up {
  animation-name: animateInFadeUp;
}
.animateIn--fade-down {
  animation-name: animateInFadeDown;
}
.animateIn--fade-left {
  animation-name: animateInFadeLeft;
}
.animateIn--fade-right {
  animation-name: animateInFadeRight;
}
.animateIn--flip-up {
  animation-name: animateInFlipUp;
}
/* Moves without fading. Chrome will not settle an LCP candidate while the
   element is still animating its opacity, so fading the LCP element in costs
   you the whole animation duration in LCP. Use this preset on it instead. */
.animateIn--slide-left {
  animation-name: animateInSlideLeft;
}

/* No `to`: it defaults to the element's own computed style, i.e. fully visible. */
@keyframes animateInFadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
}
@keyframes animateInFadeDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
}
@keyframes animateInFadeLeft {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
}
@keyframes animateInFadeRight {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
}
@keyframes animateInFlipUp {
  from {
    opacity: 0;
    transform: perspective(1000px) rotateX(-50deg);
  }
}
@keyframes animateInSlideLeft {
  from {
    transform: translateX(40px);
  }
}

/* motion-config reduced-motion="user" covers the motion-v path; this is the
   same courtesy for the CSS one. */
@media (prefers-reduced-motion: reduce) {
  .animateIn {
    animation: none;
  }
}
</style>
