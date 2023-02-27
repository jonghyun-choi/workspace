Vue.component('dashboard-summary', {
    template: `
        <div>
            <div class="w1">
                <img :src="imgSrc" :alt="imgAlt" style="width:50px"/>
            </div>
            <div class="w2">
                <p class="e1 pointer">{{ count }}</p>
                <p class="e2">{{ svcNm }}</p>
                <p class="e3">{{ svcDesc }}</p>
            </div>
        </div>
    `,
    props : {
        imgSrc : { type : String },
        imgAlt : { type : String, required : true },
        count : { type : Number, required : true },
        svcNm : { type : String, required : true},
        svcDesc : { type : String, required : true}
    }
  })
  