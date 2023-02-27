Vue.component('program-title', {
    template: `
        <div class="m-title1">{{ programTitle }}</div>
    `,
    props : {
        programTitle : { type : String, required : true }
    }
  })
  