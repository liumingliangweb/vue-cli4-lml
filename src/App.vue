<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'slide-left',
      lastPath: ''
    }
  },
  watch: {
    /**
     * 由于视频存放在 app 组件中，所以需要在切换路由时停止对应组件播放的音频内容
     */
    $route(to, from) {
      /**
       * 路由切换动画效果
       */
      // debugger
      let toDepth = to.path.split('/').length
      let fromDepth = from.path.split('/').length
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      // this.transitionName = 'slide-left';
      if (to.path.charAt(to.path.length - 1) !== '/') {
        toDepth += 1
      }
      if (from.path.charAt(from.path.length - 1) !== '/') {
        fromDepth += 1
      }
      this.transitionName = toDepth > fromDepth ? 'slide-left' : 'slide-right'

      // 深度相同
      if (toDepth === fromDepth) {
        if (this.lastPath === to.path) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }

        // 深度相同时禁用动画
        // this.transitionName = '';
        this.lastPath = from.path
      }

      // 首次进入无效果
      if (to.path === from.path && to.path === this.lastPath) {
        this.transitionName = 'first'
      }
    }
  },
  mounted() { },
  methods: {
  }
}
</script>

<style>
.slide-right-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-active {
  transition: all 0.3s ease-out;
}

.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
