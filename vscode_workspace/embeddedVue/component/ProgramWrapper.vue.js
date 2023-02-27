Vue.component('program-wrapper', {
    template: `
        <div id="wrap-m">
            <program-title :program-title="title"/>
            <component :is="currentPage"/>
        </div>
    `,
    data() {
      return {
        title : "My DashBoard",
        currentPage : "my-dashboard",
      }
    }
  })
  