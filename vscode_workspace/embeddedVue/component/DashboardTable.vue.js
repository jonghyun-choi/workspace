Vue.component('dashboard-table', {
    template: `
        <div class="main1">
            <div class="main-tit1">
                {{ tableTitle }}
                <span>
                    {{ tableUnit }}
                </span>
            </div>

            <div v-if="!isValidProps" class="error-message">
                Invalid props format!
            </div>

            <div v-else class="nl_dv2_con">
                <table>
                    <colgroup>
                        <col v-for="(col, index) in tableHead" :style="col.headerStyle" :key="'col-' + index"></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th v-for="(col, index) in tableHead" :key="'head-' + index">{{ col.headerValue }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in tableData" :key="'row-' + rowIndex">
                            <td v-for="(col, colIndex) in row" :key="'col-' + colIndex">{{ col }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    props : {
        tableTitle : { type : String, required : true },
        tableUnit : { type : String },
        
        /*
            [
                { headerValue : "header1", headerStyle : "width:25%" },
                { headerValue : "header2", headerStyle : "width:25%" },
                ...
            ]
        */
        tableHead : { 
            type : Array,
            required : true,
            validator: function(value) {
                // Validate the tableHead prop format
                return value.every(function(col) {
                    return col.headerValue && col.headerStyle;
                });
            }
        },


        /*
            [
                ["row1-col1", "row1-col2" ...],
                ["row2-col1", "row2-col2" ...],
                ...
            ]
        */
        tableData : { 
            type : Array,
            required : true,
            validator: function(value) {
                // Validate the tableData prop format
                return value.every(function(row) {
                    return Array.isArray(row);
                });
            }
        },
    },
    computed: {
        isValidProps: function() {
            // Check if all the required props are given with a valid format
            return this.tableTitle && this.tableHead && this.tableData;
        }
    }
})
