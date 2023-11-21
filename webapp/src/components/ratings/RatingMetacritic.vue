<template>
  <span v-if="isValid">
    <span :class="'badge ' + color">{{ rating }}</span>
    <!--img src="/src/img/mt-logo.svg" />-->
  </span>
</template>

<script src="./RatingMetacritic.ts" lang="ts"></script>

<style lang="scss" scoped>
img {
  width: 24px;
  margin-left: 6px;
  vertical-align: middle;
}
.badge {
  display: inline-block;
  padding: 1px 4px;
  margin-right: 4px;
  border-radius: 4px;
  font-weight: bold;
}
.badge.green {
  background-color: #66cc33;
  color: white;
}
.badge.orange {
  background-color: #ffcc33;
  color: white;
}
.badge.red {
  background-color: #ff0000;
  color: white;
}
</style>
