Vue.component('aside-menu', {
  template: `
    <div class="m-gnb">
      <a href="#" class="btn-close" @click="btn_close_onclick"></a>
      <div class="body">
        <div class="nav">
          <a href="/mobile/dsh" class="btn-dep1">My Dashboard</a>
          <a href="/mobile/trackingList" class="btn-dep1">Tracking List</a>
        </div>
        <div class="bottom">
          <div class="img"><img src="../img/mobile/img_tmp.png"></div>
          <div class="welcome">
            <p>{{this.$store.state.userNm || "username unavailable"}}</p>
            <input type="button" class="btn-logout" value="Logout" onclick="location.href='/logout.jsp'">
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {}
  },
  methods: {
    btn_close_onclick() {
      console.log(">>> AsideMenu.vue.js : btn_close clicked");
      this.$store.commit('toggleMenu');
    }
  }
})
