<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot name="moren"></slot>
        <!--<slot name="second"></slot>-->

      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        name: "bread"
    }
</script>
