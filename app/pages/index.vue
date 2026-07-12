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
