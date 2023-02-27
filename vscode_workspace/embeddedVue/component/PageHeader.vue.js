Vue.component('page-header', {
    template: `
      <div class="m-header">
        <h1><a href="#"></a></h1>
        <div class="left">
          <a id="btn_menu" href="#" class="btn-menu" @click="btn_menu_onclick"></a>
        </div>
        <div class="right">
          <a id="btn_srch" href="#" class="btn-srch" @click="btn_srch_onclick"></a>
        </div>
      </div>
    `,
    data() {
      return {
        message: 'this is header'
      }
    },
    methods: {
      btn_srch_onclick() {
        console.log(">>> PageHeader.vue.js : btn_srch clicked");
        this.$store.commit('toggleSrch');
      },
      btn_menu_onclick() {
        console.log(">>> PageHeader.vue.js : btn_menu clicked");
        this.$store.commit('toggleMenu');
      },
    }
})
  