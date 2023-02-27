Vue.component('my-dashboard', {
    template: `
        <div>
            <div class="nl_dv1">
              <ul>
                <li v-for="(item,rowIndex) in mainCnts">
                  <dashboard-summary
                    :imgSrc="item.fileSaveNm"
                    :imgAlt="item.svcNm"
                    :count="item.cnt"
                    :svcNm="item.svcNm"
                    :svcDesc="item.svcDesc"
                  />
                </li>
              </ul>
            </div>

            <div class="m-title2">Contents</div>
            <dashboard-table
              tableTitle="test"
              tableUnit="Unit : container"
              :tableHead="table1_header"
              :tableData="table1_data"
            />
            <dashboard-table
              tableTitle="test"
              tableUnit="Unit : container"
              :tableHead="table1_header"
              :tableData="table1_data"
            />
            <dashboard-table
              tableTitle="test"
              tableUnit="Unit : container"
              :tableHead="table1_header"
              :tableData="table1_data"
            />
        </div>
    `,
    data() {
      return {
        mainCnts : [
          {"regnCd5":null,"condSprCd":">","regnCd3":null,"routCd":null,"regnCd4":null,"regnCd1":null,"regnCd2":null,"cond":" AND CHK_VAL > 7","svcDesc":"Arrival is expected to be delayed  7 days.","incotCd":"","trcMst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_BILG_BIZPTNR_CD":[],"and_CNEE_CD":[],"and_SHPP_CD":[],"and_FWDR_CD":[],"and_NTPR_CD":[],"and_CARR_CD":[],"and_CNEE_CD_OR_NTPR_CD_OR_SHPP_CD":[]},"trcDtl":{"lg_GRP":"LG","and_FDEST_NATN_CD":[],"and_POD_NATN_CD":[],"and_POL_NATN_CD":[],"and_FDEST_CD":[],"and_POD_CD":[],"and_POL_CD":[]},"exceptResn":"2","locNm4":null,"fileSaveNm":"/../img/common/ds_img03.png","locNm3":null,"locNm5":null,"locNm2":null,"exceptDcnt":"7","locNm1":null,"portStr1":"","cnt":0,"rout":"","portStr3":"","portStr2":"","portStr5":"","portStr4":"","userId":"47448","svcNm":"POD Arrival Delay","svcSeq":"1","custKey":"LGE0000001","trcCst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_INBND_HQ_DEPT_CD":[],"and_CUST_KEY_ID":[],"and_CST_KIND_CD":[],"and_HQ_DEPT_CD":[]},"exctSprCd":"OC","link":"Y","multiYn":"N","bkmkYn":"N"},{"regnCd5":null,"condSprCd":"A","regnCd3":null,"routCd":null,"regnCd4":null,"regnCd1":null,"regnCd2":null,"cond":" AND CHK_VAL  <   3","svcDesc":"Expected to arrive at POD within 3 days.","incotCd":"","trcMst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_BILG_BIZPTNR_CD":[],"and_CNEE_CD":[],"and_SHPP_CD":[],"and_FWDR_CD":[],"and_NTPR_CD":[],"and_CARR_CD":[],"and_CNEE_CD_OR_NTPR_CD_OR_SHPP_CD":[]},"trcDtl":{"lg_GRP":"LG","and_FDEST_NATN_CD":[],"and_POD_NATN_CD":[],"and_POL_NATN_CD":[],"and_FDEST_CD":[],"and_POD_CD":[],"and_POL_CD":[]},"exceptResn":"6","locNm4":null,"fileSaveNm":"/../img/common/ds_img07.png","locNm3":null,"locNm5":null,"locNm2":null,"exceptDcnt":"3","locNm1":null,"portStr1":"","cnt":0,"rout":"","portStr3":"","portStr2":"","portStr5":"","portStr4":"","userId":"47448","svcNm":"Arrival Cargo","svcSeq":"2","custKey":"LGE0000001","trcCst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_INBND_HQ_DEPT_CD":[],"and_CUST_KEY_ID":[],"and_CST_KIND_CD":[],"and_HQ_DEPT_CD":[]},"exctSprCd":"OC","link":"Y","multiYn":"N","bkmkYn":"N"},{"regnCd5":null,"condSprCd":"A","regnCd3":null,"routCd":null,"regnCd4":null,"regnCd1":null,"regnCd2":null,"cond":" AND CHK_VAL  <   24","svcDesc":"Expected to arrive at POD within 24 hours.","incotCd":"","trcMst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_BILG_BIZPTNR_CD":[],"and_CNEE_CD":[],"and_SHPP_CD":[],"and_FWDR_CD":[],"and_NTPR_CD":[],"and_CARR_CD":[],"and_CNEE_CD_OR_NTPR_CD_OR_SHPP_CD":[]},"trcDtl":{"lg_GRP":"LG","and_FDEST_NATN_CD":[],"and_POD_NATN_CD":[],"and_POL_NATN_CD":[],"and_FDEST_CD":[],"and_POD_CD":[],"and_POL_CD":[]},"exceptResn":"6","locNm4":null,"fileSaveNm":"/../img/common/ds_img15.png","locNm3":null,"locNm5":null,"locNm2":null,"exceptDcnt":"24","locNm1":null,"portStr1":"","cnt":0,"rout":"","portStr3":"","portStr2":"","portStr5":"","portStr4":"","userId":"47448","svcNm":"Arrival Cargo","svcSeq":"3","custKey":"LGE0000001","trcCst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_INBND_HQ_DEPT_CD":[],"and_CUST_KEY_ID":[],"and_CST_KIND_CD":[],"and_HQ_DEPT_CD":[]},"exctSprCd":"AR","link":"Y","multiYn":"N","bkmkYn":"N"},{"regnCd5":null,"condSprCd":"B","regnCd3":null,"routCd":null,"regnCd4":null,"regnCd1":null,"regnCd2":null,"cond":" AND CHK_VAL > 0 ","svcDesc":"Ongoing Irregularity registered within 3 months.","incotCd":"","trcMst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_BILG_BIZPTNR_CD":[],"and_CNEE_CD":[],"and_SHPP_CD":[],"and_FWDR_CD":[],"and_NTPR_CD":[],"and_CARR_CD":[],"and_CNEE_CD_OR_NTPR_CD_OR_SHPP_CD":[]},"trcDtl":{"lg_GRP":"LG","and_FDEST_NATN_CD":[],"and_POD_NATN_CD":[],"and_POL_NATN_CD":[],"and_FDEST_CD":[],"and_POD_CD":[],"and_POL_CD":[]},"exceptResn":"8","locNm4":null,"fileSaveNm":"/../img/common/ds_img09.png","locNm3":null,"locNm5":null,"locNm2":null,"exceptDcnt":"3","locNm1":null,"portStr1":"","cnt":0,"rout":"","portStr3":"","portStr2":"","portStr5":"","portStr4":"","userId":"47448","svcNm":"Irregularity","svcSeq":"4","custKey":"LGE0000001","trcCst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_INBND_HQ_DEPT_CD":[],"and_CUST_KEY_ID":[],"and_CST_KIND_CD":[],"and_HQ_DEPT_CD":[]},"exctSprCd":"OC","link":"Y","multiYn":"N","bkmkYn":"N"},{"regnCd5":null,"condSprCd":">","regnCd3":null,"routCd":null,"regnCd4":null,"regnCd1":"-1","regnCd2":null,"cond":" AND CHK_VAL > 24","svcDesc":"Staying at T/S Port more than 24 hours.","incotCd":"","trcMst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_BILG_BIZPTNR_CD":[],"and_CNEE_CD":[],"and_SHPP_CD":[],"and_FWDR_CD":[],"and_NTPR_CD":[],"and_CARR_CD":[],"and_CNEE_CD_OR_NTPR_CD_OR_SHPP_CD":[]},"trcDtl":{"lg_GRP":"LG","and_FDEST_NATN_CD":[],"and_POD_NATN_CD":[],"and_POL_NATN_CD":[],"and_FDEST_CD":[],"and_POD_CD":[],"and_POL_CD":[]},"exceptResn":"0","locNm4":null,"fileSaveNm":"/../img/common/ds_img10.png","locNm3":null,"locNm5":null,"locNm2":null,"exceptDcnt":"24","locNm1":null,"portStr1":"","cnt":1,"rout":"","portStr3":"","portStr2":"","portStr5":"","portStr4":"","userId":"47448","svcNm":"Aging in T/S Port","svcSeq":"5","custKey":"LGE0000001","trcCst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_INBND_HQ_DEPT_CD":[],"and_CUST_KEY_ID":[],"and_CST_KIND_CD":[],"and_HQ_DEPT_CD":[]},"exctSprCd":"AR","link":"Y","multiYn":"N","bkmkYn":"N"},{"regnCd5":null,"condSprCd":">=","regnCd3":null,"routCd":null,"regnCd4":null,"regnCd1":"-1","regnCd2":null,"cond":" AND CHK_VAL >= 3","svcDesc":"Ongoing Irregularity registered within 3 months.","incotCd":"","trcMst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_BILG_BIZPTNR_CD":[],"and_CNEE_CD":[],"and_SHPP_CD":[],"and_FWDR_CD":[],"and_NTPR_CD":[],"and_CARR_CD":[],"and_CNEE_CD_OR_NTPR_CD_OR_SHPP_CD":[]},"trcDtl":{"lg_GRP":"LG","and_FDEST_NATN_CD":[],"and_POD_NATN_CD":[],"and_POL_NATN_CD":[],"and_FDEST_CD":[],"and_POD_CD":[],"and_POL_CD":[]},"exceptResn":"9","locNm4":null,"fileSaveNm":"/../img/common/ds_img00.png","locNm3":null,"locNm5":null,"locNm2":null,"exceptDcnt":"3","locNm1":null,"portStr1":"","cnt":25,"rout":"","portStr3":"","portStr2":"","portStr5":"","portStr4":"","userId":"47448","svcNm":"Aging in Rail F.station","svcSeq":"6","custKey":"LGE0000001","trcCst":{"cust_KEY_ID":"LGE0000001","lg_GRP":"LG","and_INBND_HQ_DEPT_CD":[],"and_CUST_KEY_ID":[],"and_CST_KIND_CD":[],"and_HQ_DEPT_CD":[]},"exctSprCd":"RL","link":"Y","multiYn":"N","bkmkYn":"N"}
        ],

        table1_header : [
          { headerValue : "header1", headerStyle : "width:50%" },
          { headerValue : "header2", headerStyle : "width:50%" }
        ],

        table1_data : [
          ["row1-col1", "row1-col2"],
          ["row2-col1", "row2-col2"]
        ]
      }
    },
  })