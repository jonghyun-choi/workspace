Vue.component('search-bar', {
    template: `
    <div class="m-search" :style="isSrchOpened">
        <input type="text" class="inp-srch" placeholder="Please enter B/L No. or Container No. or Invoice No.">
    </div>
    `,
    data() {
      return {
        message: 'this is header'
      }
    },
    methods: {
      increment() {
        this.count++
      }
    },
    computed: {
      isSrchOpened() { return this.$store.state.isSrchOpened ? 'display : block' : 'display : none'; }
    }
  })
  