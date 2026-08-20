<script setup lang="ts">
// Scroll-spy: reflect the section crossing the viewport's upper-middle line into
// the URL hash, and clear it back to "/" at the top. Raw replaceState — not
// router.replace or `location.hash =`, both of which re-fire scrollBehavior and
// jump the page; this only rewrites the address bar. history.state is preserved
// so vue-router's own scroll state survives.
let observer: IntersectionObserver | undefined

onMounted(() => {
  const sections = ['top', 'about', 'skills', 'projects', 'contact']
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)

  observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting)
        continue
      const hash = e.target.id === 'top' ? '' : `#${e.target.id}`
      if (hash !== location.hash)
        history.replaceState(history.state, '', location.pathname + location.search + hash)
    }
    // ponytail: a short final section may never reach the line near page-bottom,
    // so its hash could stick — harmless; add a scroll-end fallback only if seen.
  }, { rootMargin: '-45% 0px -55% 0px' })

  sections.forEach(el => observer!.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div>
    <!-- Keep this single root element: app.pageTransition wraps pages in
         <Transition>, which cannot animate a fragment. A comment counts as a
         node too, so it has to stay inside the root rather than above it. -->
    <lazy-home-top id="top" hydrate-on-visible />
    <lazy-home-about id="about" hydrate-on-visible />
    <lazy-home-skills id="skills" hydrate-on-visible />
    <lazy-home-projects id="projects" hydrate-on-visible />
    <lazy-home-contact id="contact" hydrate-on-visible />
  </div>
</template>
