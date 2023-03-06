Vue.component("my-component-name", {
    template : `
        <div>
            <h1>HTML tag declaration</h1>
            <p>{{ myData2 | toUppercase }}</p>
        </div>
    `,

    // data declared in current component
    data() {
        // must return an object;
        return {
            myData1 : 1,
            myData2 : 'potter',
        }
    },

    // data descended from parent component
    props : {
        propA : Number,
        propB : [String, Number],
        propC : { type : String, required : true },
        propD : { type : Number, default : 100 },
        propE : { type : Object, default : () => { key1 : "data1" /* ... */} },
        propF : { validator : (value) => value > 100 },
        propG : { type : Function, default : () => { console.log("myFunction") } }
    },

    // read-only, no data change made.
    // caching the result, evaluated upon data change
    computed : {
        computedFunc1 : () => { return this.propA + 100; },
        /* ... */
    },

    // read-and-write, data value can change.
    // no caching technique, evaluated in each execution.
    methods : {
        methodFunc1 : (arg1) => { console.log(arg1) },
        methodFunc2 : (arg2) => { this.myData1 += 100; }
        /* ... */
    },

    // function executed on dedicated data value change, w/o return
    watch : {
        myData1 : (newValue, oldValue) => { console.log("myData1 changed!") },
        myData2 : (newValue, oldValue) => { console.log("myData2 changed!") },
    },

    styles : "",

    // hooks
    // - creation
    beforeCreate : () => {}, // before the component is created. At this stage, the component's data and methods are not yet available.
    created : () => {}, // after the component is created. At this stage, the component's data and methods are available, but the template has not yet been rendered.
    // - mounting
    beforeMount : () => {}, // before the component is added to the DOM. At this stage, the template has been compiled, but the component has not yet been rendered.
    mounted : () => {}, // after the component has been added to the DOM. At this stage, the template has been rendered, and the component's data and methods are available to interact with the DOM.
    // - updating
    beforeUpdate :() => {}, 
    updated : () => {},
    // - destruction
    beforeDestroy : () => {}, // before the component is destroyed. At this stage, the component is still accessible, and its data and methods can be manipulated.
    destroyed : () => {}, // after the component is destroyed. At this stage, the component is no longer accessible, and all of its event listeners and data bindings have been removed. 


    // local component
    components : {
        'local-component1' : { /* ... */ },
        'local-component2' : { /* ... */ },
    },

    // decided whether this component apply the attributes assigned in parent component
    // - default : true
    inheritAttrs : true,

    // local filter
    // - modify data for display purpose mainly.
    filters : {
        'toUppercase' : (value) => { return value.toUppercase() }
    },

    // adding common features by using "Vue.mixin"
    mixins : ["myMixin1", "myMixin2" /* , ... */],

    // todo
    model : {},
    provide : () => { return {}},
    inject : [],
});