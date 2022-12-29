"use strict";

/**
 * WebSquare용 Utility
 * MRJ
 * June S/W
 * 2014.11.11
 */

/**
 * @type webUtil
 * @class webUtil
 */

var webUtil = {};
var gcom = {
  "callbackFuncList": {},
  "MESSAGE_IDX": 1,
  "DEBUG_MODE": true

  // 공통 xml 폴더
  ,
  "comXmlPath": "/cm/xml"

  // windowContainer ID
  ,
  "MAIN_TAB_ID": "win_main",
  "BASE_URL": location.protocol + "//" + location.host,
  "authorization": "",
  "loginInfo": {
    "userId": "",
    "userNm": ""
  }

  // 통신용 data format 정의
  ,
  "header": {
    "type": "",
    "message": "",
    "action": ""
  },
  "body": {}

  // 아래 설정값은 메인화면이 실행될때 websquare.xml에서 읽어 온다.
  // 파일업로드시 기본 디렉토리
  ,
  "fileBaseDir": "C:/MyProjectSP4/RESOURCE/upload/up"
  // 업로드시 허용하는 파일 확장자
  ,
  "fileExt": "doc, docx, ppt, pptx, xls, xlsx, pdf, txt, text, hwp, png, jpeg, gif, jpg, tif, bmp, zip, csv, xml"
  // 파일 1개당 최대 사이즈 (100 MB)
  ,
  "maxUploadSize": 104857600

  // 공통코드 정보
  ,
  "_cmCodeInfo": {
    "lnkCodeNm": "lnkCode_",
    "grpCdNm": "clasCd",
    "cmCd": "dtlCd",
    "cmNm": "dtlCdNm"
  }
  // 페이지 정보 (그리드 및 버튼그룹의 높이)
  ,
  "_pageInfo": {
    "pageHeight": 0 // 페이지가 load될때 height
    ,
    "gridHeight": 0 // 그리드 height
    ,
    "grpBtnTop": 0 // 버튼을 감싸고 있는 그룹의 top
    ,
    "grpBtnHeight": 0 // 버튼을 감싸고 있는 그룹의 height
    ,
    "remainHeight": 0 // 버튼밑의 나머지 height
  }
  // 다국어 관련 라벨 및 메시지
  ,
  "labelList": {},
  "msgList": {}
};

/*
(function() {
    // 이전 페이지 이동 방지
    WebSquare.event.addListener(WebSquare.document, "onkeydown", function(event) {

        if (event.keyCode == 116) {
            WebSquare.event.stopEvent(event);
        } else if (event.keyCode == 8) {
            var object  = WebSquare.event.getTarget(event);
            var tagName = object.tagName.toLowerCase();
            var type    = object.type || "";

            if (tagName == "textarea") {
                if (object.readOnly)  WebSquare.event.stopEvent(event);
            } else if (tagName == "input") {
                if (type == "text" || type == "password") {
                    if (object.readOnly)  WebSquare.event.stopEvent(event);
                } else {
                    WebSquare.event.stopEvent(event);
                }
            } else {
                WebSquare.event.stopEvent(event);
            }
        }
    });

    // 운영서버일 경우만 오른쪽 마우스 버튼 클릭 금지 (config.xml에 등록)
    var mode = WebSquare.core.getConfiguration("/WebSquare/operation/@value");
    if (mode == "OPR") {
        WebSquare.event.addListener(WebSquare.document, "oncontextmenu", function(event) {
            var contMenu = document.getElementById("_contextMenuLayer");

            if (contMenu != null) {
                contMenu.style.display = "none";
            }
            WebSquare.event.stopEvent(event);
            return  false;
        });
    }
})();

// 뒤로가기 방지
window.history.forward(1);
*/

/*
 * MRJ : namespace: date 
 */

/**
 * 서버날짜 반환 (default format: yyyyMMdd)
 * @memberOf webUtil
 * @param {String:N} sDateFormat 날짜 포맷<br/>
 * y Year 1996; 96<br/>
 * M Month in year 07<br/>
 * d Day in month 10<br/>
 * H Hour in day (0-23) 0<br/>
 * m Minute in hour 30<br/>
 * s Second in minute 55<br/>
 * S Millisecond 978<br/>
 * @return  String 현재날짜
 * @example
 *     getServerDate("yyyy-MM-dd HH:mm:ss SSS")
 */
webUtil.getServerDate = function (sDateFormat) {
  var sFormat = sDateFormat;
  var sDate;
  if (comUtil.isNull(sFormat)) {
    sFormat = "yyyyMMdd";
  }
  sDate = WebSquare.date.getCurrentServerDate(sFormat);
  return sDate;
};

/**
 * 현재날짜 (밀리세컨드단위)
 * @memberOf webUtil
 * @param N/A
 * @return  String 현재날짜(년월일시분초밀리초)
 * @example
 *      getLocalTimeStamp()
 */
webUtil.getLocalTimeStamp = function () {
  var objDate = new Date();
  var sDate = WebSquare.date.toTimestampString(objDate);
  return sDate;
};

/**
 * 날짜 더하기
 * @memberOf webUtil
 * @param {String:Y} sInDate 기준일자
 * @param {Number:Y} day 증가/감소할 일수
 * @return  String 날짜
 * @example
 *     ex1) getAddDate('20120301', 1)  =>  20120302
 *     ex2) getAddDate('20120301', -1) =>  20120229
 */
webUtil.getAddDate = function (sInDate, day) {
  var sDate = comUtil.getNumberOnly(sInDate);
  if (sDate.length != 8) return sInDate;
  return WebSquare.date.dateAdd(sDate, day);
};

/**
 * 한글로 된 요일 반환
 * @memberOf webUtil
 * @param {String:Y} sInDate 기준일자
 * @return  String 요일
 * @example
 *      getWeek('20120301')  =>  목요일
 */
webUtil.getWeek = function (sInDate) {
  var sDate = comUtil.getNumberOnly(sInDate);
  if (sDate.length != 8) return sInDate;
  return WebSquare.date.getDay(sDate);
};

/**
 * 음력일자 반환
 * @memberOf webUtil
 * @param {String:Y} sInDate 기준일자
 * @return  String 음력일자
 * @example
 *     getLunar('20120307')  =>  20120215
 */
webUtil.getLunar = function (sInDate) {
  var sDate = comUtil.getNumberOnly(sInDate);
  if (sDate.length != 8) return sInDate;
  return WebSquare.date.toLunar(sDate);
};

/**
 * 두 날짜의 차이 계산 (시간까지 주어졌을때는 날짜의 차이만 계산, 종료일시가 시작일시보다 작을때는 -1 return)
 * @memberOf webUtil
 * @param {String:Y}  fromdate  시작일자
 * @param {String:Y}  todate    종료일자
 * @example
 *   var day = diffDate("20150101", "20151231");
         day < 0:  종료일이 시작일 보다 작음
         day = 0:  종료일이 시작일과 같음
         day > 0:  종료일과 시작일의 차이 리턴
 */
webUtil.diffDate = function (fromdate, todate) {
  var sDt = fromdate;
  var eDt = todate;
  var sTm = "",
    eTm = "";
  if (sDt.length == 0 && eDt.length == 0) return 0;
  if (sDt.length < 8 || eDt.length < 8) {
    return -1;
  }
  if (sDt.length >= 8) {
    sDt = fromdate.substring(0, 8);
    sTm = fromdate.substring(8);
  }
  if (eDt.length >= 8) {
    eDt = todate.substring(0, 8);
    eTm = todate.substring(8);
  }
  var diffdate = WebSquare.date.dateDiff(sDt, eDt);
  if (sTm.length > 0 && eTm.length > 0) {
    if (diffdate == 0) {
      // 시작일,  종료일이 같을때
      if (parseInt(sTm) > parseInt(eTm)) return -1;
    }
  }
  return diffdate;
};

/*
 * MRJ : namespace: util 
 */

/**
 * 문자길이(Byte) 반환
 * @memberOf webUtil
 * @param {String:Y} str 문자열
 * @return  Number 문자길이(Byte)
 * @example
 *     getStringByte("12가나")  => 6
 */
webUtil.getStringByte = function (str) {
  return WebSquare.util.getStringByteSize(str);
};

/**
 * 수치문자열을 3자리 단위마다 콤마붙임
 * @memberOf webUtil
 * @param {String:Y} str 수치문자열
 * @return  String 콤마포함한 문자열
 * @example
 *     setNumber("1234567")  => 1,234,567
 */
webUtil.setNumber = function (str) {
  if (typeof str == "number") str = "" + str;
  if (comUtil.isNull(str)) return "";
  var ret = webUtil.getNumber(str.trim());
  return WebSquare.util.setNumber(ret);
};

/**
 * 수치문자열을 콤마제거후 반환
 * @memberOf webUtil
 * @param {String:Y} str 문자열
 * @return  String 콤마제거한 문자열
 * @example
 *     getNumber("1,234,567")  => 1234567
 */
webUtil.getNumber = function (str) {
  return WebSquare.util.getNumber(str.trim());
};

/**
 * 페이지 정보 초기화
 * @memberOf webUtil
 * @param {Number:N}  recQty 1페이지당 건수 (default: 10)
 * @return  Object 페이지정보 object
 * @example
 *     var pageInfo = webUtil.initPageInfo(20); ==> 1페이지당 건수: 20
 */
webUtil.initPageInfo = function (recQty) {
  var pgInfo = {
    "curPage": 1,
    "recPerPage": recQty || 10,
    "totCount": 0
  };
  return pgInfo;
};

/**
 * 페이지 정보 계산
 * @memberOf webUtil
 * @param {Object:Y} pageList1 페이지콤포넌트 object
 * @param {Number:Y} totalCount 총건수
 * @param {Object:Y} pageInfo 페이지정보 Object
 * @return 없음
 * @example
 *     setPageInfo(pageList1, totalCount, pageInfo);
 */
webUtil.setPageInfo = function (pageCom, total, pgInfo) {
  var page = parseInt(total / pgInfo.recPerPage);
  if (total % pgInfo.recPerPage != 0) page++;
  pageCom.setCount(page);
};

/**
 * 브라우져 종류 반환
 * @memberOf webUtil
 * @param N/A
 * @return  String 브라우져종류(IE, FF, CR, SA, OP중 하나: comUtil.getBrowser()과는 다름)
 * @example
 *     getBrowserCheck();
 */
webUtil.getBrowserCheck = function () {
  if (WebSquare.util.isIEAllVersion()) return "IE";
  if (WebSquare.util.isFF()) return "FF";
  if (WebSquare.util.isChrome()) return "CR";
  if (WebSquare.util.isSafari()) return "SA";
  if (WebSquare.util.isOpera()) return "OP";
  return "";
};

/**
 * 모바일 여부 판단
 * @memberOf webUtil
 * @param N/A
 * @return Boolean
 * @example
 *      isMobile();
 */
webUtil.isMobile = function () {
  return WebSquare.util.isMobile();
};

/**
 * 아이폰 여부 판단
 * Mac : navigator.userAgent.indexOf("Mac")  != -1
 * @memberOf webUtil
 * @param N/A
 * @return Boolean
 * @example
 *      _isIphone();
 */
webUtil._isIphone = function () {
  if (navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("iPod") != -1 || navigator.userAgent.indexOf("iPad") != -1) {
    return true;
  } else {
    return false;
  }
};

/**
 * 안드로이드 여부 판단
 * @memberOf webUtil
 * @param N/A
 * @return Boolean
 * @example
 *      _isAndroid();
 */
webUtil._isAndroid = function () {
  if (navigator.userAgent.indexOf("Android") != -1) return true;else return false;
};

/**
 * 해당 그룹 안의 컴포넌트에서 엔터키가 발생하면 해당 컴포넌트의 값을 DataColletion에 저장하고 objFunc 함수를 실행한다.
 * @memberOf webUtil
 * @param {Object:Y} grpObj 그룹ID
 * @param {Object:Y} objFunc 실행될 함수
 * @param {Number:N} rowIndex grid인경우 row index
 * @return 없음
 * @example setEnterKeyEvent(grp_AuthorityDetail, webUtil.search);
 *          setEnterKeyEvent(grp_AuthorityDetail, webUtil.search, gridView1.getFocusedRowIndex());
 */
webUtil.setEnterKeyEvent = function (grpObj, objFunc, rowIndex) {
  var grpId = typeof grpObj == "string" ? $p.getComponentById(grpObj) : grpObj;
  var objArr = WebSquare.util.getChildren(grpId, {
    excludePlugin: "group trigger textbox output calendar image span",
    recursive: true
  });
  try {
    for (var i = 0; i < objArr.length; i++) {
      try {
        if (typeof objFunc === "function") {
          objArr[i].bind("onkeyup", function (e) {
            if (e.keyCode === 13) {
              if (typeof this.getRef === "function") {
                var ref = this.getRef(); // ref="data:dmt_searchParam.menuId"
                var refArray = ref.substring(5).split(".");
                if (typeof refArray !== "undefined" && refArray.length === 2) {
                  var dataCollectionName = refArray[0];
                  var columnId = refArray[1];
                  var dataCollection = $p.getComponentById(dataCollectionName);
                  var dataType = dataCollection.getObjectType().toLowerCase();
                  if (dataType === "datamap") {
                    dataCollection.set(columnId, this.getValue());
                  } else if (dataType === 'datalist' && typeof rowIndex !== "undefined") {
                    dataCollection.setCellData(rowIndex, columnId, this.getValue());
                  }
                }
                objFunc();
              }
            }
          });
        }
      } catch (e) {
        $p.log("### webUtil.setEnterKeyEvent Exception ==> " + e.message);
      } finally {
        dataCollection = null;
      }
    }
  } catch (e) {
    $p.log("### webUtil.setEnterKeyEvent Exception ==> " + e.message);
  } finally {
    objArr = null;
  }
};

/**
 * 화면의 파일명 반환 (.xml 제외)
 * @memberOf webUtil
 * @param N/A
 * @return String xml이름
 * @example
 *      ex) var xmlId = getXMLFileName()
 */
webUtil.getXMLFileName = function () {
  var srcId = "";
  var src = $p.getParameter("w2xPath");
  if (!comUtil.isNull(src)) {
    srcId = src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
  }

  // windowContainer 일때
  if (srcId.indexOf("index") == -1 || srcId.indexOf("login") == -1) {
    var menuId = $p.top().win_main.getSelectedWindowId();
    var menuInfo = $p.top().dlt_AllMenu.getMatchedJSON("menuId", menuId, true);
    if (menuInfo.length == 1) {
      var url = menuInfo[0].menuUrl;
      srcId = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
    }
  }
  return srcId;
};

/**
 * 해당화면의 마우스 우클릭 동작이벤트 방지
 * @memberOf webUtil
 * @example
 *      addBlockEvent();
 */
webUtil.addBlockEvent = function () {
  _addEvent(document, "selectstart", _stopEvent);
  _addEvent(document, "contextmenu", _stopEvent);
  function _addEvent(element, eventType, handler) {
    if (window.addEventListener) {
      element.addEventListener(eventType, handler, false);
    } else {
      if (window.attachEvent) {
        element.attachEvent("on" + eventType, handler);
      }
    }
  }
  function _stopEvent(e) {
    if (window.event) {
      window.event.cancelBubble = true;
      window.event.returnValue = false;
    }
    // DOM 레벨 2
    if (e && e.stopPropagation && e.preventDefault) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  if (document.body && document.body.style.MozUserSelect != "undefined") {
    document.body.style.MozUserSelect = "none";
  }
};
webUtil.textEncode = function (s) {
  var re1 = /&/g;
  var re2 = /</g;
  var re3 = />/g;
  //var re5 = /"/g;
  var re6 = /\r\n/g; // CR LF
  var re7 = /\n/g; // LF
  var re8 = /\r/g; // CR
  var re9 = / /g;
  var re10 = /\t/g;
  return s.replace(re1, "&amp;amp;").replace(re2, "&amp;lt;").replace(re3, "&amp;gt;").replace(re9, "&nbsp;").replace(re10, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(re6, "<br />").replace(re7, "<br />").replace(re8, "<br />");
};

/**
 * object 유형 반환
 * @memberOf webUtil
 * @param {Object:Y} obj object
 * @return object type (json, array, string, null)
 * @example
 *     var json = {};
 *     var ret = webUtil.getObjectType(json)
 */
webUtil.getObjectType = function (obj) {
  var objType = typeof obj;
  if (objType !== 'object') {
    return objType;
  } else if (obj.constructor === {}.constructor) {
    return 'json';
  } else if (obj.constructor === [].constructor) {
    return 'array';
  } else {
    return 'null';
  }
};
webUtil.getObject = function (_objectId, _scopeObj) {
  var scopeObj = _scopeObj || "";
  if (scopeObj == "parent") {
    scopeObj = $p.parent().$p;
  } else if (scopeObj == "top") {
    scopeObj = $p.top().$p;
  } else if (scopeObj == "") {
    scopeObj = $p;
  } else {
    var isComp;
    if (scopeObj.indexOf("mf_") > -1) {
      isComp = WebSquare.util.getComponentById(scopeObj);
    } else {
      isComp = WebSquare.util.getComponentById("mf_" + scopeObj);
    }
    if (isComp) {
      scopeObj = isComp.getWindow().$p;
    }
  }
  var objectId = _objectId || "";
  var objectComp;
  try {
    if (objectId != "" && scopeObj.id && scopeObj.id.indexOf("mf") == 0) {
      if (objectId == "scwin") {
        objectComp = $w.getComponentById(scopeObj.getRuntimeId("scwin"));
      } else {
        objectComp = scopeObj.getComponentById(objectId);
      }
    } else if (objectId != "" && objectId.id.indexOf("mf") == 0) {
      objectComp = WebSquare.util.getComponentById(objectId);
    } else {
      objectComp = $p.getComponentById(objectId);
    }
  } catch (e) {}
  return objectComp;
};

/**
 * 파일 업로드시 확장자 검사<br/>
 * 확장자가 변경되는 경우 /websquare_home/config/websquare.xml 파일도 같이 변경 해야 함<br/>
 * websquare.xml: websquare 환경파일로 허용하지 않는 파일은 업로드 하지 않는다. 단, was의 rebooting 필요함
 * @memberOf webUtil
 * @param {String:Y} fileName 파일이름
 * @return Boolean
 * @example
 *     ex) checkFileExt("guide.docx")
 */
webUtil.checkFileExt = function (fileName) {
  var ext = gcom.fileExt.replaceAll(" ", "").split(",");
  var idx = fileName.lastIndexOf(".");
  if (idx > -1) {
    for (var i = 0; i < ext.length; i++) {
      if (fileName.toLowerCase().indexOf(ext[i]) != -1) {
        // 허용하는 파일 확장자
        return true;
      }
    }
  }
  return false;
};

/**
 * 파일 업로드시 확장자 검사 (그리드)
 * @memberOf webUtil
 * @param {Object:Y} grdName grid ID
 * @param {String:N} colNm 그리드컬럼이름 (파일이름이 들어있는 컬럼)
 * @return Boolean
 * @example
 *     ex) getFileExtCheck("gridView1", "fileName");
 */
webUtil.getFileExtCheck = function (grdName, colNm) {
  var colName = colNm || "FILE_NAME";
  var objGrid = typeof grdName == "string" ? $p.getComponentById(grdName) : grdName;
  var dataList = webUtil.getDataListObject(objGrid); // or dataList = objGrid.dataList;
  if (dataList == null) {
    webUtil.showAlert(_error_msg.DEV_NO_DATALIST);
    return false;
  }
  for (var i = 0; i < dataList.getTotalRow(); i++) {
    var value = dataList.getCellData(i, colName);
    if (!webUtil.checkFileExt(value.trim())) {
      return false;
    }
  }
  return true;
};

/**
 * [내부함수] xml 화면 내의 Object의 값을 검사시 에러가 발생할 경우 object에 저장
 * @memberOf webUtil
 * @param {Object:Y} valStat  json형태의 변수
 * @param {String:Y} objId  콤포넌트의 ID or dataMap의 column ID
 * @param {String:Y} msg  에러메시지
 * @param {String:N} value  입력한값
 */
webUtil._errorResult = function (valStat, objId, msg, value) {
  var len = valStat.colInfo.length;
  valStat.isValid = false;
  valStat.colInfo[len] = {};
  valStat.colInfo[len].colId = objId;
  valStat.colInfo[len].msg = msg;
  valStat.colInfo[len].value = value;
};

/**
 * xml 화면 내의 Object의 값을 검사한다. (WebSquare Ver 5.0용)
 * @memberOf webUtil
 * @param {Object:Y} opt 항목들의 속성
 * @example
 *   속성           설명
 * ==========================================================================
 * mandatory    필수입력여부
 * display      에러시 alert에 출력될 메시지
 * alphabet     대/소문자 허용
 * upper        대문자 허용
 * lower        소문자 허용
 * numeric      숫자 허용
 * hangul       한글허용
 * other        허용하는 특수문자 리스트
 * minLength    최소길이(Byte)
 * maxLength    최대길이(Byte)
 * zero         숫자인경우 0 허용여부 (0 허용불가시 numeric: "y"로 해야함)
 * digit        소수점이하 자리수
 * trim         앞뒤 스페이스 제거(y)
 * ltrim        앞 스페이스 제거
 * rtrim        뒤 스페이스 제거
 * type         DATE(날짜), REG_NO(주민등록번호), EMAIL(E-Mail), TEL_NO(전화번호) 검사
 * var option = [ { id: "edNumber", mandatory: "y", display: "금액", numeric: "y", maxlength: 11 }
 *              , { id: "input2", display: "대문자", upper: "y" }
 *              , { id: "inputCalendar1", type: "DATE", mandatory: "y", display: "날짜" }
 * ];
 * var ret = webUtil.inputValidCheckJSON(option);
 */
// TODO: 그룹내 데이터 유효성 검사 (JSON)
webUtil.inputValidCheckJSON = function (opt) {
  var valStat = {
    "isValid": true,
    "colInfo": []
  };
  var tmpTelNo = "";
  var tmpRegNo = "";
  var tmpTelNoId = "";
  var tmpRegNoId = "";
  for (var row = 0; row < opt.length; row++) {
    var con = opt[row];
    var type = con.type || "";
    var mandatory = (con.mandatory || "n").toLowerCase();
    var display = con.display || "";
    var alphabet = (con.alphabet || "n").toLowerCase();
    var upper = (con.upper || "n").toLowerCase();
    var lower = (con.lower || "n").toLowerCase();
    var numeric = (con.numeric || "n").toLowerCase();
    var hangul = (con.hangul || "n").toLowerCase();
    var other = con.other || "";
    var minLength = parseInt(con.minLength) || 0;
    var maxLength = parseInt(con.maxLength) || 0;
    var zero = (con.zero || "y").toLowerCase();
    var digit = parseInt(con.digit) || 0;
    var is_trim = (con.trim || "y").toLowerCase();
    var is_ltrim = con.ltrim || "";
    var is_rtrim = con.rtrim || "";
    var id = "";
    var colNm = "";
    var value = "";
    var mapObj = null;
    var isDataMap = false;
    var obj = $p.getComponentById(con.id);
    if (comUtil.isNull(obj)) {
      webUtil._errorResult(valStat, con.id, _error_msg.DEV_COM_ID_NONE, "");
      continue;
    }
    //        var dataObj = webUtil.getDataCollectionId(con.id);
    //        if (!comUtil.isNull(dataObj)) {  // dataMap과 bind됨
    //            mapObj = $p.getComponentById(dataObj.dataMapId);
    //            if (comUtil.isNull(mapObj)) {
    //                webUtil._errorResult(valStat, dataObj.dataMapId, _error_msg.DEV_DATAMAP_NONE, "");
    //                continue;
    //            }
    //            isDataMap = true;
    //            id = dataObj.columnId;
    //            colNm = mapObj.getName(id);
    //            value = mapObj.get(id);
    //        } else {
    id = obj.getID();
    var pluginName = obj.getPluginName();
    if (comUtil.isNull(pluginName)) {
      webUtil._errorResult(valStat, id, _error_msg.DEV_COM_ERR, "");
      continue;
    } else {
      if (pluginName == "editor") {
        value = obj.getHTML();
      } else if (pluginName == "body") {
        continue;
      } else {
        value = obj.getValue();
      }
    }
    //        }
    /*
            $p.log("===================== Start ==========================");
            $p.log("ID(" + (row+1) + ") : " + id);
            $p.log("    type: " + type);
            $p.log("    mandatory: " + mandatory);
            $p.log("    display: " + display);
            $p.log("    alphabet: " + alphabet);
            $p.log("    upper: " + upper);
            $p.log("    lower: " + lower);
            $p.log("    numeric: " + numeric);
            $p.log("    hangul: " + hangul);
            $p.log("    other: " + other);
    //        $p.log("    minLength: " + minLength);
    //        $p.log("    maxLength: " + maxLength);
    //        $p.log("    zero: " + zero);
    //        $p.log("    digit: " + digit);
    //        $p.log("    is_trim: " + trim);
    //        $p.log("    is_ltrim: " + ltrim);
    //        $p.log("    is_rtrim: " + rtrim);
            $p.log("    value: [" + value + "]");
            $p.log("===================== End ==========================");
    */
    if (typeof value == "number") {
      value = "" + value;
    }
    if (is_trim == 'y') {
      value = value.trim();
    } else {
      if (is_ltrim == 'y') value = value.ltrim();
      if (is_rtrim == 'y') value = value.rtrim();
    }
    if (typeof value != "number") {
      if (pluginName != "editor") {
        if (isDataMap) {
          mapObj.set(id, value);
        } else {
          obj.setValue(value);
        }
      }
    }

    // ID가 textbox의 앞3문자를 제외하고 동일할때 textbox의 label를 사용
    if (display == "") {
      var tmpId = id.substring($p.id.length);
      var index = tmpId.indexOf('_');
      var cmObj = $p.getComponentById($p.id + "tbx_" + tmpId.substring(index + 1));
      if (comUtil.isNull(cmObj)) {
        display = colNm.length > 0 ? colNm : id;
      } else {
        display = cmObj.getValue();
      }
    }
    var hNm = display.split("<span>*</span>");
    if (hNm.length == 2) {
      display = hNm[1];
    }
    display = "[" + display + "] ";
    if (mandatory == "y" && value.length == 0) {
      webUtil._errorResult(valStat, id, display + _error_msg.ERR_IN_MAND_ITEM, value);
      continue;
    }

    // 숫자타입이 아님
    if (numeric == "n" && (zero == "y" || digit > 0)) {
      zero = "n";
      digit = 0;
    }
    var period = value.indexOf(".");
    var numVal = value;
    var isNum = false; // 숫자만 입력

    // 숫자만 입력받는 경우
    if (numeric == 'y' && alphabet == 'n' && hangul == 'n' && upper == 'n' && lower == 'n') {
      if (value.length > 0 && !comUtil.isNumeric(value, true)) {
        webUtil._errorResult(valStat, id, display + _error_msg.ERR_IN_NUM_RIGHT, value);
        continue;
      }
      isNum = true;
    }
    if (period > -1 && isNum) {
      // 정수
      numVal = value.substring(0, period);
    }
    if (minLength > 0 && numVal.length > 0) {
      if (numVal.length < minlength) {
        if (isNum) {
          // 숫자만 입력받는 경우
          webUtil._errorResult(valStat, id, display + comUtil.getDynamicMessage(_error_msg.ERR_IN_NUM_MIN, minLength), value);
        } else {
          webUtil._errorResult(valStat, id, display + comUtil.getDynamicMessage(_error_msg.ERR_IN_MIN, minLength), value);
        }
        continue;
      }
    }
    if (maxLength > 0) {
      if (numVal.length > maxLength) {
        if (isNum) {
          // 숫자만 입력받는 경우
          webUtil._errorResult(valStat, id, display + comUtil.getDynamicMessage(_error_msg.ERR_IN_NUM_MAX, maxLength), value);
        } else {
          webUtil._errorResult(valStat, id, display + comUtil.getDynamicMessage(_error_msg.ERR_IN_MAX, maxLength), value);
        }
        continue;
      }
    }
    // 숫자타입이고 0은 허용안함
    if (numeric == 'y' && zero == 'n' && parseInt(value, 10) == 0) {
      webUtil._errorResult(valStat, id, display + _error_msg.ERR_IN_UP_ZERO, value);
      continue;
    }

    // 숫자타입이고 소숫점이하 자리수 초과
    if (numeric == 'y' && digit > 0 && period > -1) {
      numVal = value.substring(period + 1, value.length);
      if (other.indexOf(".") == -1) other += ".";
      if (numVal.length > digit) {
        webUtil._errorResult(valStat, id, display + comUtil.getDynamicMessage(_error_msg.ERR_IN_DIGIT_LEN, digit), value);
        continue;
      }
    }
    var errCheck = true;
    if (type == "DATE" && value.length > 0) {
      errCheck = comUtil.checkValidDate(value);
    } else if (type == "EMAIL" && value.length > 0) {
      errCheck = comUtil.checkMail(value);
    } else if (type == "TEL_NO" && value.length > 0) {
      tmpTelNo += value;
      if (tmpTelNo.length >= 9) {
        errCheck = comUtil.checkTelNo(tmpTelNo);
        tmpTelNo = "";
      }
      tmpTelNoId = id;
    } else if (type == "REG_NO" && value.length > 0) {
      tmpRegNo += value;
      if (tmpRegNo.length >= 13) {
        errCheck = comUtil.regCheck(tmpRegNo);
        tmpRegNo = "";
      }
      tmpRegNoId = id;
    }
    if (!errCheck) {
      webUtil._errorResult(valStat, id, display + _error_msg.ERR_IN_RIGHT, value);
      continue;
    }

    //        var validFormat = {
    //              alphabet: false
    //            , upper: false
    //            , lower: false
    //            , numeric: false
    //            , hangul: false
    //            , other: ""
    //        };
    var validFormat = "";
    if (alphabet == 'y') {
      validFormat += "alphabet;upper;lower;";
    } else {
      if (upper == 'y') validFormat += 'upper;';
      if (lower == 'y') validFormat += 'lower;';
    }
    if (numeric == 'y') validFormat += 'numeric;';
    if (hangul == 'y') validFormat += 'hangul;';
    if (other.length > 0) validFormat += 'other=' + other + ';';
    if (validFormat.length > 0 && value.length > 0) {
      var errMsg = comUtil.checkValidForInput(validFormat, value, display, id);
      if (errMsg != "OK") {
        if (errMsg == _error_msg.ERR_UNKNOWN) {
          webUtil.showAlert(errMsg);
          return false;
        } else {
          webUtil._errorResult(valStat, id, errMsg, value);
        }
      }
    }
    // 에러가 없이 정상일때 원래 색깔로 변경
    var obj = $p.getComponentById(id);
    if (obj) {
      var pluginName = obj.getPluginName().toLowerCase();
      if (pluginName == "inputcalendar" || pluginName == "calendar") {
        obj.removeClass("redBorder");
      } else {
        obj.removeClass("inRedBorder");
      }
    }
  }
  // 전화번호: 9자리미만, 주민등록번호: 13자리미만 입력시 체크
  if (tmpTelNo.length > 0) {
    var errCheck = comUtil.checkTelNo(tmpTelNo);
    if (!errCheck) {
      webUtil._errorResult(valStat, tmpTelNoId, "전화번호 " + _error_msg.ERR_IN_RIGHT, tmpTelNo);
    }
  }
  if (tmpRegNo.length > 0) {
    var errCheck = comUtil.regCheck(tmpRegNo);
    if (!errCheck) {
      webUtil._errorResult(valStat, tmpRegNoId, "주민등록번호 " + _error_msg.ERR_IN_RIGHT, tmpRegNo);
    }
  }
  if (!valStat.isValid) {
    var msg = "";
    for (var i = 0; i < valStat.colInfo.length; i++) {
      var colInfo = valStat.colInfo[i];
      if (i > 0) msg += "\n";
      var tmpId = colInfo.colId.split($p.id);
      //msg += tmpId[1] + ": " + colInfo.msg;
      msg += colInfo.msg;
      var obj = $p.getComponentById(colInfo.colId);
      if (obj) {
        var pluginName = obj.getPluginName().toLowerCase();
        if (pluginName == "inputcalendar" || pluginName == "calendar") {
          obj.addClass("redBorder");
        } else {
          obj.addClass("inRedBorder");
        }
      }
    }
    //webUtil.showAlert(msg, "webUtil.inputValidCheckJSONCallback", valStat.colInfo[0].colId);
    webUtil.showAlert(msg, function () {
      webUtil.inputValidCheckJSONCallback(valStat.colInfo[0].colId);
    });
  }
  return valStat.isValid;
};

/*
 * [내부함수] 입력 유효성 검사시 실패한 object에 focus 이동 콜백 함수
 * @memberOf webUtil
 * @param {String:Y} objId  object ID
 * @return  N/A
 */
webUtil.inputValidCheckJSONCallback = function (objId) {
  if (typeof objId != "undefined") {
    var obj = $p.getComponentById(objId);
    if (obj) {
      obj.focus();
    }
  }
};

/**
 * 다국어 처리시 !~key~! => 용어사전에 맞게 변환 (/common/langpack/ko.properties)
 */
webUtil._getI18NUrl = function () {
  var locale = WebSquare.cookie.getCookie("locale");
  if (locale == null || locale == '') {
    return "/websquare/engine/servlet/I18N.jsp?locale=ko&w2xPath=";
  } else {
    return "/websquare/engine/servlet/I18N.jsp?locale=" + unescape(locale) + "&w2xPath=";
  }
};

/**
 * 입력받은 object가 존재(undefined or null) 하는지 여부
 * @memberOf webUtil
 * @param {Object:Y} obj  object
 * @return  boolean
 * @example
 *      getLocalTimeStamp()
 */
webUtil.isNull = function (obj) {
  if (typeof obj == "number") return false;
  if (typeof obj == "undefined" || obj == null || obj == "" || obj == "null") {
    return true;
  }
  return false;
};

/**
 * textbox의 내용을 클립보드로 복사한다.
 * @date 2015.07.01
 * @memberOf webUtil
 * @param {Object:Y} obj  클립보드로 복사할 object
 * @return  N/A
 * @example
 *      webUtil.toClipBoardPaste(tbx_msg)
 */
webUtil.toClipBoardPaste = function (obj) {
  if (typeof obj != "undefined") {
    obj.select();
    document.execCommand("copy");
  }
};
webUtil.wframePostScript = function () {
  console.log(" webUtil.wframePostScript ");

  // 메인 화면 WFrame이 로딩된 경우에만 setCSSTopMenu() API가 실행되도록 함 (RWIS)
  //    if (typeof $p.parent().dlt_AllMenuList !== "undefined") {
  //        $p.top().wf_header.getWindow().scwin.setCSSTopMenu();
  //    }
};

/*
 * 전화번호를 지역번호, 국번, 번호 3개로 나눈후 콤포넌트에 셋팅한다
 * @memberOf webUtil
 * @param {String:Y} telNo 전화번호
 * @param {Object:Y} telObj 전화번호 inputbox ID
 * @example
 *   var telObj = {"no1": "obj1", "no2": "obj2", "no3": "obj3" }
 *   webUtil.divideTelNo("01012345678", telObj);
 */
webUtil.divideTelNo = function (telNo, telObj) {
  var tel = comUtil.divideTelNo(telNo);
  var obj = $p.getComponentById(telOpt.no1);
  if (obj) {
    obj.setValue(tel.no1);
  }
  obj = $p.getComponentById(telOpt.no2);
  if (obj) {
    obj.setValue(tel.no2);
  }
  obj = $p.getComponentById(telOpt.no3);
  if (obj) {
    obj.setValue(tel.no3);
  }
};

/**
 * 현재 페이지를 새로고침 한다.
 * @memberOf webUtil
 * @param N/A
 * @return  N/A
 * @example
 *      webUtil.reloadPage()
 */
webUtil.reloadPage = function () {
  if ($p.top().win_main.currentWindowNum > 0) {
    var menuId = $p.top().win_main.getSelectedWindowId();
    setTimeout(function (menuId) {
      var page = $p.top().win_main.getFrame(menuId);
      page.reload();
    }, 100, menuId);
  }
};

/**
 * xml에 get방식으로 넘기는 파라메터를 json 형태로 변환한다
 * @memberOf webUtil
 * @param N/A
 * @return  json
 * @example
 *      보내는쪽: http://localhost:7701/websquare/websquare.html?w2xPath=/ui/sample/index.xml&id=a&nm=b&age=20
 *      받는쪽: var param = webUtil.paramToJSON()
 */
webUtil.paramToJSON = function () {
  var curl = location.href;
  var arrParam = curl.substring(curl.indexOf('?') + 1).split('&');
  var toJson = {};
  for (var i = 1; i < arrParam.length; i++) {
    var param = arrParam[i].split('=');
    toJson[param[0]] = param[1];
  }
  return toJson;
};

/*
 * MRJ : namespace: win
 */

webUtil.showClose = function (msg) {
  webUtil._showMessagePopup("close", msg);
};

/**
 * alert창 띄우기
 * @memberOf webUtil
 * @param {String:Y} msg 메시지
 * @param {String:N} callBackFunc 콜백함수
 * @param {String:N} objId focus로 이동할 object ID
 * @param {Object:N} opt 팝업창 정보 (팝업창 크기조절시 사용 width, height)
 * @return 없음
 * @example
 *     ex1) showAlert("출력할 메시지");
 *     ex2) showAlert("출력할 메시지", "callback");
 *     ex3) showAlert("출력할 메시지", "callback", "", option);
 *          objId는 공통에서 사용하는 콤포넌트의 ID이다 (focus를 주기위함)
 *          width, height를 조정하기 위해 option 사용
 */
webUtil.showAlert = function (msg, callBackFunc, opt) {
  webUtil._showMessagePopup("alert", msg, callBackFunc, opt);
};

/**
 * confirm창 띄우기
 * @memberOf webUtil
 * @param {String:Y} msg 메시지
 * @param {String:N} callBackFunc 콜백함수
 * @param {Object:N} opt 컨펌창에 넘길 옵션 (title, parameter)
 * @return 없음
 * @example
 *     ex) showConfirm("출력할 메시지", "callback");
 */
webUtil.showConfirm = function (msg, callBackFunc, opt) {
  webUtil._showMessagePopup("confirm", msg, callBackFunc, opt);
};

/**
 * 에러메시지 팝업, 공통에서 처리
 * @memberOf webUtil
 * @param {String:Y} msg 타이틀
 * @param {String:Y} detail 상세 메시지
 * @param {String:N} callBack 콜백함수
 * @return 없음
 */
webUtil.errorMessagePopup = function (msg, callBack) {
  var json = {
    "type": "json",
    "userCallBack": callBack || "",
    "name": "popInfo",
    "data": {
      "detail": {
        "message": msg
      }
    }
  };
  var obj = {
    "id": "errorMsgPopup",
    "type": "wframePopup",
    "title": "서버에러",
    "url": gcom.comXmlPath + "/errorMsgPop.xml",
    "className": "type3",
    "width": 500,
    "height": 320,
    "resizable": false,
    "useMaximize": false,
    "popupParam": json
  };
  webUtil.openCommonPopup(obj);
};

/**
 * [내부함수] 메세지창 띄우기
 * @memberOf webUtil
 * @param {String:Y} type message popup type
 * @param {String:Y} msg 메시지
 * @param {String:N} callBackFunc 콜백함수
 * @param {Object:N} opt 컨펌창에 넘길 옵션 (title, parameter)
 * @return N/A
 * @example
 *     ex) webUtil._showMessagePopup("alert", "출력할 메시지", "callback");
 */
webUtil._showMessagePopup = function (type, msg, callBack, opt) {
  var btnList = {};
  if (typeof opt != "undefined" && opt.btnList) {
    btnList = {
      "confirm": opt.btnList.confirm ? opt.btnList.confirm : "확인",
      "cancel": opt.btnList.cancel ? opt.btnList.cancel : "취소",
      "close": opt.btnList.close ? opt.btnList.close : "닫기"
    };
  }
  var json = {
    "type": "json",
    "name": "popInfo",
    "data": {
      "detail": {
        "type": type,
        "message": msg
      },
      "button": btnList,
      "param": typeof opt != "undefined" && opt.param ? opt.param : {},
      "isClose": true
    },
    "title": typeof opt != "undefined" && opt.title ? opt.title : "알림창",
    "width": 500,
    "height": 320,
    "param": typeof opt != "undefined" && opt.param ? opt.param : ""
  };
  var obj = {
    "id": "_commonMessagePopup_",
    "type": "wframePopup",
    "title": json.title,
    "url": gcom.comXmlPath + "/messagePop.xml",
    "className": "type3",
    "width": json.width,
    "height": json.height,
    "resizable": false,
    "useMaximize": false,
    "popupParam": json
  };
  webUtil.openCommonPopup(obj, callBack);
};

/**
 * 에러메시지 팝업에서 사이즈 조정 (에러발생시 자동 실행)
 * @memberOf webUtil
 * @param {String:Y} id 팝업창의 ID
 * @param {Number:Y} width 팝업창의 width
 * @param {Number:Y} height 팝업창의 height
 * @return 없음
 */
webUtil.errorPopupResize = function (id, width, height) {
  var popObj = eval(id);
  popObj.setSize(width, height);
};

/**
 * 팝업 호출
 * @memberOf webUtil
 * @param {Object:Y} option  팝업 option
 * @return 없음
 * @example
 *     var obj = {
 *             width: 600
 *           , height: 400
 *           , url: "/sample/screen/popup_open.xml"
 *           , modal: true
 *           , title: "임시팝업"
 *           , id: "pop1"
 *           , popupParam: { data: "send data ..." }
 *     };
 *
 *     webUtil.openCommonPopup(obj);<br/>
 * 아래는 options들의 속성값이다.
 * 팝업: $p.openPopup( url , options , params , target )
 * - String url popup창의 url
 * - Object options popup의 options.
 *     <string:n> options.id  : [defalut: ppo1] popup의 id
 *     <string:n> options.type : [defalut: browser] popup의 type으로  window, browser을 설정할 수있다.  browser type의 경우 useIFrame 속성과 상관없이 window.open으로 열립니다.
 *     <string:n> options.width : [defalut: 500px] popup의 width 설정  값
 *     <string:n> options.height : [defalut: 500px] popup의 height 설  정값
 *     <string:n> options.top : [defalut: 100px] popup의 top 설정값. top은 useIframe이 true인 경우 브라우져를 기준, false인 경우 모니터를 기준으로 한다.
 *     <string:n> options.left : [defalut: 100px] popup의 left 설정값.   left는 useIframe이 true인 경우 브라우져를 기준, false인 경우 모니터를 기준으로 한다.
 *     <string:n> options.popupName : [defalut: WebSquarePopup]   popup 객체의 이름으로 popup 프레임의 표시줄에 나타난다.
 *     <string:n> options.modal : [defalut: false] modal을 이용해서 뒤쪽 배경을 동작하지 않도록 만들기 위한 인자 이다. false이면 뒤쪽의 컴퍼넌트가 사용 가능함.
 *     <string:n> options.useIFrame : [defalut: false] window type의 경우, [true : IFrame 을 사용하는 WebSquare popup,false: window.open 을 사용하는 popup]
 *     <string:n> options.style : [defalut: ""] popup의 스타일을 지정값. 값이 있으면 left top width height는 적용되지 않음.
 *     <string:n> options.srcData : [defalut: null] popup 객체의 type이 window 일 때 Parent 에서 넘길 xpath.
 *     <string:n> options.destData : [defalut: null] popup 객체의 type이 window 일 때 popup 에 설정할 xpath.
 *     <object:n> options.dataObject : popup에 설정할 변수의 데이터타입과 , 데이터, 변수 명을 입력하는 객체 dataObject{ dataType: ["xml","string","json","array"], data: "전달 데이터" , name :"변수명"}
 *     <string:n> options.xml : [defalut: null] popup에 넘길xmlDocument의 string popup창에서 WebSquare.uiplugin.popup.getPopupParam() api를 사용하여 가져올수 있음.
 *     <string:n> options.resizable : [defalut: false] size조절을 유무 (useIfrmae false인 경우 적용)
 *     <string:n> options.status : [defalut: false] status 출력 유무   (useIfrmae false인 경우)
 *     <string:n> options.menubar : [defalut: false] menubar 출력 유무 (useIfrmae false인 경우)
 *     <string:n> options.scrollbars : [defalut: false] scrollbar 출력 유무 (useIfrmae false인 경우)
 *     <string:n> options.title : [defalut: false] title 출력 유무  (useIfrmae false인 경우)
 *     <string:n> options.useMaximize : [defalut: true] useIFrame:true  설정시 상단 title 영역을 더블클릭 할 경우 최대화 시킬지 유무
 *     <string:n> options.closeAction : [defalut: ""] useIFrame:true 설정시 닫기 버튼을 클릭 할 경우 팝업을 닫기전 호출된 사용자 정의 funcion 이름. 사용자정의 함수 에서 return true;시 팝업을 닫는다.
 * - Object params popup창에 넘길 parameter
 * - Object target window객체. default로 window
 */
// TODO: 팝업 오픈
webUtil.openCommonPopup = function (popOpt, objCallBack) {
  //requires("uiplugin.popup");
  if (comUtil.isNull(popOpt)) {
    comUtil.errorMessageDisplay("### webUtil.openCommonPopup: popOpt is not found");
    return;
  }
  var popObj = typeof popOpt == "string" ? JSON.parse(popOpt) : popOpt;
  var id = popObj.id || "";
  //var popType = popObj.type || "litewindow";  // browser, window, litewindow
  var popType = popObj.type || "wframePopup"; // iframePopup, wframePopup, browserPopup
  var title = popObj.title || " ";
  var url = popObj.url;
  var width = popObj.width || 400;
  var height = popObj.height || 400;
  var top = popObj.top || -1;
  var left = popObj.left || -1;
  var isModal = typeof popObj.modal == "undefined" || popObj.modal == true ? true : false;
  var useIFrame = popType != "browserPopup" ? true : false;
  if (url == null) {
    comUtil.errorMessageDisplay("### webUtil.openCommonPopup: url is not found");
    return;
  }
  if (typeof popObj.popupParam == "undefined") {
    popObj.popupParam = {};
  }
  if (typeof popObj.popupParam.data == "undefined") {
    popObj.popupParam.data = {};
  }
  popObj.popupParam.data.id = id;
  popObj.popupParam.data.type = "json";
  if (popType == "wframePopup") {
    //popObj.popupParam.data.userCallBack = $p.id + (popObj.popupParam.userCallBack || "");
    popObj.popupParam.data.mode = "W";
  } else if (popType == "iframePopup") {
    //popObj.popupParam.data.userCallBack = $p.id + (popObj.popupParam.userCallBack || "");
    popObj.popupParam.data.mode = "I";
  } else {
    //popObj.popupParam.data.userCallBack = popObj.popupParam.userCallBack || "";
    popObj.popupParam.data.mode = "B";
  }
  popObj.popupParam.data.frameId = $p.id;

  // callback 함수가 object일때
  if (typeof objCallBack == "function") {
    if (popType == "wframePopup") {
      var fnNm = "__close_callback_Func__" + comUtil.getLocalDateTime("YYYYMMddhhmmssn");
      gcom.callbackFuncList[$p.id + fnNm] = objCallBack;
      popObj.popupParam.data.objCallBackNm = $p.id + fnNm;
    } else {
      alert("inline(object) callback함수는 popup type이 wframePopup만 지원합니다.\n그 외는 string으로 사용하십시오.");
      return;
    }
  } else {
    if (typeof objCallBack != "undefined" && objCallBack != "") {
      if (popType == "wframePopup") {
        popObj.popupParam.data.userCallBack = $p.id + (objCallBack || "");
      } else if (popType == "iframePopup") {
        popObj.popupParam.data.userCallBack = $p.id + (objCallBack || "");
      } else {
        popObj.popupParam.data.userCallBack = objCallBack || "";
      }
    } else {
      // 이전의 호환성을 위하여 살려둠
      if (!webUtil.isNull(popObj.popupParam.userCallBack)) {
        if (popType == "wframePopup") {
          popObj.popupParam.data.userCallBack = $p.id + (popObj.popupParam.userCallBack || "");
        } else if (popType == "iframePopup") {
          popObj.popupParam.data.userCallBack = $p.id + (popObj.popupParam.userCallBack || "");
        } else {
          popObj.popupParam.data.userCallBack = popObj.popupParam.userCallBack || "";
        }
      }
    }
  }
  if (!popObj.popupParam.type) {
    popObj.popupParam.type = "json";
  }
  var jsonData = popObj.popupParam;

  // screen.width : 해상도
  // document.documentElement.clientWidth : html
  // window.innerWidth : 창 틀을 뺀 내용과 스크롤을 포함한 크기 (https://sometimes-n.tistory.com/22)
  // document.body.clientWidth : body
  // Fixes dual-screen position
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
  var brWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var brHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  if (!useIFrame) {
    if (left > 0) {
      left = left + dualScreenLeft;
    } else {
      left = brWidth / 2 - width / 2 + dualScreenLeft;
    }
    if (top > 0) {
      top = top + dualScreenTop;
    } else {
      top = brHeight / 2 - height / 2 + dualScreenTop;
    }
  } else {
    if (left > 0) {
      left = left + (window.pageXOffset || document.body.scrollLeft);
    } else {
      left = brWidth / 2 - width / 2 + (window.pageXOffset || document.body.scrollLeft);
    }
    if (top > 0) {
      top = top + (window.pageYOffset || document.body.scrollTop);
    } else {
      top = brHeight / 2 - height / 2 + (window.pageYOffset || document.body.scrollTop);
    }
  }

  // top, left를 고정시킬때
  if (popObj.fixedTop === true) {
    top = popObj.top;
    left = popObj.left;
  }
  var popupOptions = {
    "id": id,
    "type": popType,
    "width": width + "px",
    "height": height + "px",
    "top": top,
    "left": left,
    "className": popObj.className || "",
    "popupName": title,
    "modal": isModal,
    "useIFrame": useIFrame
    //, "frameMode"   : popObj.frameMode || "iframe"
    //, "style"       : popObj.style || ""
    //, "resizable"   : popObj.resizable || false
    //, "status"      : false
    //, "menubar"     : false
    //, "scrollbars"  : popObj.scrollbar || false
    //, "title"       : true
    //, "xml"         : jsonData
    //, "windowDragMove": true
    ,
    "dataObject": jsonData,
    "alwaysOnTop": popObj.alwaysOnTop || false,
    "useModalStack": popObj.useModalStack == false ? false : true,
    "resizable": popObj.resizable == false ? false : true,
    "useMaximize": popObj.useMaximize == false ? false : true
    //, "srcData"     : ""
    //, "destData"    : ""
    //, "popupUrl" : gcom.BASE_URL + "/websquare/popup.jsp?w2xPath=" + url
    //, "closeAction" : popObj.closeAction || ""  // 상단X 클릭시 팝업종료 단, 정의된 함수는 부모창에서 만들어야 함
  };

  if (typeof popupOptions.popupUrl !== "undefined" && popupOptions.popupUrl.indexOf("w2xPath") > -1) {
    $p.openPopup(null, popupOptions);
  } else {
    $p.openPopup(url, popupOptions);
  }
};

/*
 * 팝업 우측상단 X 버튼 클릭시
 */
webUtil.closeAction = function (id, info) {
  return true;
};

/**
 *  팝업창을 닫는다.
 * iframe으로 연경우 $p.closePopup()를 사용하고 window.open()으로 연경우 window.close() 사용
 * @memberOf webUtil
 * @param {String} popId  팝업ID
 */
webUtil.closePopup = function (popId, param) {
  var parentFunc = null;
  if (comUtil.isNull(scwin.popInfo)) {
    alert("팝업정보 없음: scwin.popInfo = $p.getParameter('popInfo');");
    return;
  }
  if (typeof scwin.popInfo.detail == "undefined") {
    scwin.popInfo.detail = {};
  }
  if (typeof scwin.popInfo.isClose == "undefined") scwin.popInfo.isClose = true;
  if (scwin.popInfo.isClose) {
    if (scwin.popInfo.mode == "B") {
      window.close();
    } else {
      $p.closePopup(popId);
    }
  }
  var strParam = param || "";
  if (strParam != "") {
    if (typeof strParam != "string") {
      strParam = JSON.stringify(param);
    } else {
      strParam = param;
    }
  }
  var objCallBackNm = scwin.popInfo.objCallBackNm;
  if (typeof objCallBackNm != "undefined" && objCallBackNm.indexOf("__close_callback_Func__") > -1) {
    var exeCallbackNm = gcom.callbackFuncList[objCallBackNm];
    exeCallbackNm(strParam);
    delete gcom.callbackFuncList[objCallBackNm];
  } else {
    //    	var callFunc = window.WebSquare.util.getGlobalFunction(objCallBackNm);
    //    	if (callFunc) {
    //    		callFunc(JSON.stringify(param));
    //    	} else {

    if (scwin.popInfo.userCallBack != null && scwin.popInfo.userCallBack != $p.id && scwin.popInfo.userCallBack.length > 0 && scwin.popInfo.userCallBack.length != scwin.popInfo.frameId.length) {
      //$p.log("### popupInfo ===>\n" + JSON.stringify(scwin.popInfo,null,2));
      if (scwin.popInfo.mode == "B") {
        // window.open
        parentFunc = opener.eval(scwin.popInfo.frameId + scwin.popInfo.userCallBack);
        parentFunc(strParam);
      } else if (scwin.popInfo.mode == "I") {
        // iframePopup
        parentFunc = parent.eval(scwin.popInfo.userCallBack);
        parentFunc(strParam);
      } else {
        // wframePopup
        parentFunc = eval(scwin.popInfo.userCallBack);
        if (typeof parentFunc == "function") {
          parentFunc(strParam);
        }
      }
    }
  }
};

/**
 * 팝업의 ID 반환
 * @memberOf webUtil
 * @param N/A
 * @return  popupID
 * @example
 *     webUtil.getPopupId()
 */
webUtil.getPopupId = function () {
  var parent = opener || parent;
  if ($p.getPopupId()) {
    return $p.getPopupId();
  } else {
    return window.scwin.$w.getPopupId();
  }
};

/**
 * 탭으로 화면 오픈 (window container 용)
 * @memberOf webUtil
 * @param {Object:N} tabOpt 오픈하는 탭화면의 option
 * @example
 * ex1) 호출하는쪽
 *   var option = {
 *         menuId: "9911"
 *       , title: "회원정보"
 *       , mode: "REPLACE"  // default: NEW
 *       , srcPath: "/xml/sample/memberTest.xml"
 *       , param: { mode: "1", type: "string" }
 *   };
 *   webUtil.tabOpen(option);
 * ex2) 호출 받는쪽
 *   var param = $p.getParameter("pageParam");
 *   alert(JSON.stringify(param, null, 4));
 */
webUtil.tabOpen = function (tabOpt) {
  var winType = tabOpt.mode || "NEW";
  var srcPath = !comUtil.isNull(tabOpt.srcPath) ? tabOpt.srcPath : "";
  var title = tabOpt.title || "";
  var menuId = tabOpt.menuId || title;
  var openAction = tabOpt.openAction || "selectWindow";
  var openNum = $p.top().win_main.currentWindowNum;
  if (srcPath.length == 0) {
    webUtil.showAlert(_error_msg.COM_URL_NOT_FOUND);
    return;
  }
  if (openNum > 0) {
    var winId = $p.top().win_main.getSelectedWindowId();
    if (!comUtil.isNull(winId)) {
      var menuInfo = {
        "menuId": menuId,
        "menuNm": title,
        "pgmUrl": srcPath,
        "param": tabOpt.param
      };
      var winSubId = $p.top().win_main.getWindowByWindowId(menuId);
      if (winType == "NEW") {
        if (typeof winSubId != "undefined" && winSubId != null) openAction = "existWindow";
      } else if (winType == "REPLACE") {
        $p.top().win_main.closeWindow();
      }
      $p.top().scwin.executeScreen(menuInfo, openAction);
    }
  } else {
    var menuInfo = {
      "menuId": menuId,
      "menuNm": title,
      "pgmUrl": srcPath,
      "param": tabOpt.param
    };
    $p.top().scwin.executeScreen(menuInfo, "existWindow");
  }
};

/**
 * 현재 선택한 window객체 반환
 * @memberOf webUtil
 * @param {Object:Y} tabId  windowContainer or tabControl  ID
 * @example
 * browserPopup: $p.parent(),  그 외: $p.top()
 *   webUtil.getSelectedWindowFrame($p.top().win_main);
 */
webUtil.getSelectedWindowFrame = function (mainId) {
  var winId = mainId.getSelectedWindowId();
  var winObj = mainId.getWindowByWindowId(winId);
  return winObj;
};

/**
 * 브라우저 사이즈(height) 변경시 그리드의 사이즈를 자동으로 변경</br>
 * 주의사항: 그리드 바로 밑에 버튼을 감싸고 있는 그룹은 존재해야 되며(top 위치를 알기위해)</br>
 *           그리드의 속성중 visibleRowNum를 입력해서는 안됨</br>
 *           그리드의 height는 100%, px로 입력불가</br>
 *           그리드 바로 밑에 버튼을 감싸고 있는 그룹이 있어야함 (버튼이 필요없는 경우 display:none 으로 설정)
 * @memberOf webUtil
 * @param {Object:Y} grid_obj 그리드객체
 * @param {Object:N} grpButton 그리드밑에 버튼을 감싸고 그룹객체
 * @example
 * ex)
 *   scwin.initScreen = function () {
 *       webUtil.getOrgPageSize([grd_menuList], grpWorkButton);
 *   };
 *   // 아래 함수는 각 페이지에 코딩
 *   window.onresize = function(event) {
 *       webUtil.gridHeightEvent([grd_menuList]);
 *   };
 */
webUtil.getOrgPageSize = function (grid_obj, grpButton) {
  gcom._pageInfo.pageHeight = document.body.clientHeight;
  gcom._pageInfo.gridHeight = grid_obj[0].getStyle("height").replace("px", "");
  if (!comUtil.isNull(grpButton)) {
    gcom._pageInfo.grpBtnTop = grpButton.getPosition("top");
    gcom._pageInfo.grpBtnHeight = grpButton.getSize("height");
  } else {
    //gcom._pageInfo.grpBtnTop = grid_obj[0].getPosition("top") + grid_obj[0].getSize("height") ;
    //gcom._pageInfo.grpBtnHeight = 90;
  }
  gcom._pageInfo.remainHeight = gcom._pageInfo.pageHeight - (gcom._pageInfo.grpBtnTop + gcom._pageInfo.grpBtnHeight);
  //$p.log("### ORG  P: " + gcom._pageInfo.pageHeight + "   G: " + gcom._pageInfo.gridHeight + "  remain: " + gcom._pageInfo.remainHeight);
};

/*
 * grid resize시 가감된 사이즈 만큼 페이지 크기 조절
 * @memberOf webUtil
 * @param {Object:Y} grid_obj 그리드객체ID(array)
 * @example
 *      gridHeightEvent([grd_menuList, grd_subList])
 */
webUtil.gridHeightEvent = function (grid_obj) {
  var add_height = gcom._pageInfo.pageHeight - document.body.clientHeight;
  for (var i = 0; i < grid_obj.length; i++) {
    // 늘어나거나 줄어든 브라우저 높이값에서 그리드를 제외한 나머지 값을 빼준다.
    var height = gcom._pageInfo.gridHeight - add_height;
    if (gcom._pageInfo.remainHeight > 30) {
      // 버튼밑의 나머지 높이
      height += gcom._pageInfo.remainHeight - 30;
    } else {
      height -= 30;
      gcom._pageInfo.remainHeight = 30;
    }
    if (height < 100) {
      height = 100;
    }
    height += "px";
    grid_obj[i].setStyle("height", height);

    //$p.log("###  증감: " + add_height + "   G: " + height + " => " + (gcom._pageInfo.gridHeight - add_height));
  }
};

/**
 * 메뉴 네비게이션 셋팅
 * @memberOf webUtil
 * @param {Object:Y} dataList dataListID
 * @param {String:Y} menuId 현 화면의 menuId
 * @param {String:Y} btnNav 메뉴명이 셋팅될 anchor
 * @return  N/A
 * @example
 *     webUti.setNavigatorMenu(dataList, "menuId", "btnNav");
 *     btnNav는 btnNav1, btnNav2 ... 이런식으로 숫자가 연속적으로 붙어야 함
 *     <w2:anchor id="btnNav1"><xf:label>메뉴명1</xf:label></w2:anchor>
 *     <w2:anchor id="btnNav2"><xf:label>메뉴명2</xf:label></w2:anchor>
 */
webUtil.setNavigatorMenu = function (dataList, menuId, btnNav) {
  var menuList = [];
  webUtil.searchUpperMenu(dataList, menuId, menuList);
  menuList.reverse();
  for (var i = 0; i < menuList.length; i++) {
    var navId = btnNav + (i + 1);
    var obj = $p.getComponentById(navId);
    if (obj) {
      obj.show("");
      obj.setValue(menuList[i].menuNm);
    }
  }
};

/**
 * 하위메뉴로 최상위메뉴까지 검색
 * @memberOf webUtil
 * @param {Object:Y} dataList dataListID
 * @param {String:Y} menuId 하위menuId
 * @param {Object:Y} menuList 하위메뉴부터 상위메뉴까지의 정보가 저장될 array
 * @return  N/A
 * @example
 *     webUtil.searchUpperMenu(dataList, menuId, menuList);
 */
webUtil.searchUpperMenu = function (dataList, menuId, menuList) {
  var menu = dataList.getMatchedJSON("menuId", menuId, true);
  if (menu.length == 1) {
    menuList.push(menu[0]);
    webUtil.searchUpperMenu(menu[0].parentId);
  }
};

/*
 * MRJ : namespace: datalist
 */

webUtil.createDynamicDataList = function (option) {
  if (comUtil.isNull(option.type)) {
    option.type = "dataList";
  }
  webUtil.createDynamicDataCollection(option);
};

/**
 * dataMap, dataList를 동적으로 생성, object 존재시 삭제후 생성 (default)
 * @memberOf webUtil
 * @param {Object:Y}  option  dataList에 대한 옵션
 * @return 없음
 * @example
 *      var option = {
 *            id: "dlt_DataList"
 *          , type: "dataList"
 *          , remove: false
 *          , info : [   { id: "label", name: "출력값", dataType: "text" }
 *                     , { id: "value", name: "실제값", dataType: "number" }
 *                   ]
 *      };
 *      webUtil.createDynamicDataCollection(option);
 */
webUtil.createDynamicDataCollection = function (opt) {
  var obj = $p.getComponentById(opt.id);
  var remove = typeof opt.remove == "undefined" || opt.remove == true ? true : false;
  if (!comUtil.isNull(obj) && remove) {
    $p.data.remove(opt.id);
  }
  var listOpt = {
    "id": opt.id,
    "type": opt.type
  };
  if (opt.type == "dataMap") {
    listOpt.option = {
      "baseNode": "map"
    };
  } else {
    listOpt.option = {
      "baseNode": "list",
      "repeatNode": "map",
      "saveRemovedData": "true"
    };
  }
  var colInfoList = [];
  for (var i = 0; i < opt.info.length; i++) {
    var colInfo = {};
    var info = opt.info[i];
    colInfo.id = info.id;
    colInfo.name = typeof info.name != "undefined" ? info.name : info.id;
    colInfo.dataType = typeof info.dataType != "undefined" ? info.dataType : "text";
    colInfoList.push(colInfo);
  }
  if (opt.type == "dataMap") {
    listOpt.keyInfo = colInfoList;
  } else {
    listOpt.columnInfo = colInfoList;
  }
  $p.data.create(listOpt);
};

//dataList 복사 (2022.07.01)
webUtil.copyDataList = function (fromList, toList) {
  var orgList = typeof fromList == "string" ? $p.getComponentById(fromList) : fromList;
  var dataInfo = orgList.getInfo();
  var orgInfo = [];

  // 컬럼정보
  var colInfo = dataInfo.columnInfo;
  for (var key in colInfo) {
    var columnInfo = {};
    for (var col in colInfo[key]) {
      columnInfo[col] = colInfo[key][col];
    }
    orgInfo.push(columnInfo);
  }
  var option = {
    id: toList,
    type: "dataList",
    info: orgInfo
  };
  webUtil.createDynamicDataList(option);
};

/**
 * [내부함수]  공통코드 dataMap  생성
 * @memberOf webUtil
 */
webUtil._createCommonCodeMap = function () {
  var mapID = "dma_commonCode";
  var obj = $p.getComponentById(mapID);
  if (!comUtil.isNull(obj)) {
    $p.data.remove(mapID);
  }
  if (comUtil.isNull(obj)) {
    var mapOpt = {
      "id": mapID,
      "type": "dataMap",
      "option": {
        "baseNode": "map"
      },
      "keyInfo": [{
        "id": gcom._cmCodeInfo.grpCdNm,
        "name": "그룹코드",
        "dataType": "text"
      }, {
        "id": "DATA_PREFIX",
        "name": "dlt_CommonCode",
        "dataType": "text"
      }]
    };
    $p.data.create(mapOpt);
  }
};

/**
 * [내부함수]  공통코드 dataList 생성
 * @memberOf webUtil
 */
webUtil._createCommonCodeDataList = function (listID) {
  var obj = $p.getComponentById(listID);
  if (!comUtil.isNull(obj)) {
    $p.data.remove(listID);
  }
  if (comUtil.isNull(obj)) {
    var listOpt = {
      "id": listID,
      "type": "dataList",
      "option": {
        "baseNode": "list",
        "repeatNode": "map",
        "saveRemovedData": "true"
      },
      "columnInfo": [{
        "id": gcom._cmCodeInfo.grpCdNm,
        "name": "그룹코드",
        "dataType": "text"
      }, {
        "id": gcom._cmCodeInfo.cmCd,
        "name": "공통코드",
        "dataType": "text"
      }, {
        "id": gcom._cmCodeInfo.cmNm,
        "name": "공통코드명",
        "dataType": "text"
      }]
    };
    $p.data.create(listOpt);
  }
};

/**
 * 동적 공통코드 생성 및 콤포넌트에 bind 시킴
 * @memberOf webUtil
 * @param {Object:Y} pCodeList 공통코드 리스트 및 콤포넌트정보
 * @param {String:N} callBackFunc 콜백함수
 * @param {Boolean:N} isAdd dataList에 데이터를 추가할지 여부 (default: false)
 * @return 없음
 * @example
 *   var codeOpt = [   { code: "PL01", object: "sbx_Pl01, gridView1: code", removeCode: "02, 03", "addCond": "RMK_1:Y, RMK_2:US" }
 *                   , { code: "WE90", object: "sbx_WE90, chk_WE90" }
 *                 ];
 *   webUtil.getCommonCodeList(codeOpt, "scwin.codeCallback");
 */
// TODO: 동적 공통코드 생성
webUtil.getCommonCodeList = function (pCodeList, callBackFunc, isAdd) {
  var listId = "dlt_CommonCode";
  var codeList = "";
  var dataList = [];
  webUtil._createCommonCodeMap();
  webUtil._createCommonCodeDataList(listId);
  for (var i = 0; i < pCodeList.length; i++) {
    var cdObj = pCodeList[i].code.trim();
    if (i > 0) codeList += ",";
    codeList += cdObj;
    dataList.push(listId + "_" + cdObj);
    webUtil._createCommonCodeDataList(dataList[i]);
  }
  dma_commonCode.set(gcom._cmCodeInfo.grpCdNm, codeList);
  dma_commonCode.set("DATA_PREFIX", listId);
  var option = {
    "id": "submitCommonCodeList",
    "ref": 'data:json, { id: "dma_commonCode", key: "queryData", action: "" }',
    "target": 'data:json, { id: "' + listId + '", key: "body.inqCommCodeList" }',
    "action": "/portal/com/commCode/inqCommCodeList",
    "codeCallBack": "webUtil._getCommonCodeListCallback",
    "userCallBack": callBackFunc || ""
  };
  webUtil.callSubmitJson(option, pCodeList);
};

/**
 * [내부함수]  필터링에 의한 공통코드 생성 <br/>
 * getCommonCodeList의 callback 함수
 * @memberOf webUtil
 * @param {Object:Y} e event object
 * @param {String:N} param 콜백함수에 넘길 파라메터
 * @param {String:N} callBack 콜백함수
 */
webUtil._getCommonCodeListCallback = function (e, param, callBack) {
  webUtil.setCodeObject(param);

  /*
     if (typeof callBack != "undefined" && callBack.length > 0) {
         var callFunc = eval(callBack);
         if (typeof callFunc == "function") {
             callFunc(e, param);
         } else {
             $p.log("### _getCommonCodeListCallback: " + callBack + " ==> function 이 없습니다.");
         }
     }*/

  if (typeof callBack === "function") {
    var callFunc = eval(callBack);
    callFunc(e, param);
  } else {
    $p.log("### _getCommonCodeListCallback: " + callBack + " ==> function 이 없습니다.");
  }
};

/**
 * 공통코드 dataList와 component를 셋팅한다
 * @memberOf webUtil
 * @param {Object:Y} options 공통코드 및 콤포넌트에 대한 옵션
 * @return 없음
 * @example
 *   var codeOpt = [   { code: "PL01", object: "sbx_Pl01", removeCode: "02, 03" }
 *                   , { code: "WE90", object: "sbx_WE90, chk_WE90, gridView1: code" }
 *                 ];
 *   setCodeObject(codeOpt) ==> 공통코드가 PL01이고, selectbox가 sbx_Pl01를 연결하고 공통코드중 02, 03은 삭제한다.
 *   일반적으로 getCommonCodeList 호출시 자동으로 이 함수를 호출하는데, 따로 처리할때 사용한다.
 */
webUtil.setCodeObject = function (options) {
  for (var i = 0; i < options.length; i++) {
    var cdObj = options[i];
    var dltNm = "dlt_CommonCode_" + cdObj.code;
    var cdDataList = $p.getComponentById(dltNm);
    if (cdDataList) {
      var data = dlt_CommonCode.getMatchedJSON(gcom._cmCodeInfo.grpCdNm, cdObj.code, true);
      if (data.length > 0) {
        cdDataList.setJSON(data);
      }
      var objArr = cdObj.object;
      if (!comUtil.isNull(objArr)) {
        // 연결할 콤포넌트
        var objList = objArr.split(",");
        var removeCd = cdObj.removeCode;
        for (var x = 0; x < objList.length; x++) {
          var gridObj = objList[x].split(":");
          var selObj;
          if (gridObj.length == 1) {
            selObj = $p.getComponentById(objList[x].trim());
          } else {
            selObj = $p.getComponentById(gridObj[0].trim());
          }
          if (selObj) {
            if (!comUtil.isNull(removeCd)) {
              webUtil._removeCommonCode(cdDataList, removeCd);
            }
            if (gridObj.length == 1) {
              selObj.setNodeSet("data:" + dltNm, gcom._cmCodeInfo.cmNm, gcom._cmCodeInfo.cmCd);
            } else {
              selObj.setColumnNodeSet(gridObj[1].trim(), "data:" + dltNm, gcom._cmCodeInfo.cmNm, gcom._cmCodeInfo.cmCd);
            }
          } else {
            $p.log("### webUtil.setCodeObject ==> " + cdObj.object + " not found (grid or selectbox)");
          }
        }
      }
    } else {
      $p.log("### webUtil.setCodeObject ==> " + dltNm + " not found (dataList)");
    }
  }
};

/**
 * [내부함수] 공통코드 dataList중 지정한 공통코드 삭제
 * @memberOf webUtil
 * @param {Object:Y} dltList 공통코드 DataList
 * @param {String:Y} removeCd 삭제할 공통코드 리스트
 * @example
 *     setCodeObject() 참조
 */
webUtil._removeCommonCode = function (dltList, removeCd) {
  var delCdList = removeCd.split(",");
  for (var i = 0; i < delCdList.length; i++) {
    var delList = dltList.getMatchedIndex(gcom._cmCodeInfo.cmCd, delCdList[i].trim(), true);
    if (delList.length > 0) {
      dltList.removeRows(delList);
    }
  }
};

/**
 * 콤포넌트와 binding된 dataMap과 columnID를 반환
 * @memberOf webUtil
 * @param {String:Y} comObjId  콤포넌트ID
 * @example
 *      getDataCollectionId("ica_ContDate");  ==> ica_ContDate : { "dataMapId": "dma_SearchParm", "columnId": "contDate"}
 */
webUtil.getDataCollectionId = function (comObjId) {
  var comObj = $p.getComponentById(comObjId);
  if (!comUtil.isNull(comObj) && typeof comObj.getRef == "function") {
    var ref = comObj.getRef().trim();
    if (ref != "") {
      var refArray = ref.substring(5).split(".");
      if (typeof refArray != "undefined" && refArray.length == 2) {
        var dataObjInfo = {};
        dataObjInfo.dataMapId = refArray[0];
        dataObjInfo.columnId = refArray[1];
        return dataObjInfo;
      }
    }
  }
  return null;
};

/*
 * MRJ : namespace: gridview
 */
/**
 * 그룹 내의 입력형 Object의 값을 클리어한다. (하위그룹의 컴포넌트 및 그리드 초기화)
 * @memberOf webUtil
 * @param {Object:Y} grpNm group ID
 * @param {Object:N} grdList grid list
 * @example
 *     ex) webUtil.initGroup(group1, ["gridView1", "gridView2"])
 */
webUtil.initGroup = function (grpNm, grdList) {
  var grpObj = typeof grpNm == "object" ? grpNm : $p.getComponentById(grpNm);
  webUtil._initGroupOnly(grpObj);
  if (typeof grdList != "undefined") {
    if (typeof grdList == "string") {
      alert('그리드 리스트는 string의 array 현태로 넘겨야 합니다\n(ex) initGroup(group1, ["gridView1", "gridView2"])');
    } else {
      for (var i = 0; i < grdList.length; i++) {
        var obj = $p.getComponentById(grdList[i]);
        if (obj) {
          obj.initGrid();
        } else {
          $p.log("### webUtil._initGroup ==> " + grdList[i] + " not found");
        }
      }
    }
  }
};

/**
 * [내부함수] 그룹 내의 입력형 Object의 값을 클리어한다. (하위그룹의 컴포넌트도 초기화)
 * @memberOf webUtil
 * @param {Object:Y} group ID
 */
webUtil._initGroupOnly = function () {
  for (var i = 0; i < arguments.length; i++) {
    var grpObj = arguments[i];
    var childArr = grpObj.getChildren();
    for (var nIndex in childArr) {
      var obj = childArr[nIndex];
      if (typeof obj.getPluginName() == "object") continue;
      var pluginName = obj.getPluginName().toLowerCase();
      //$p.log("### initGroup: " + pluginName + " ==> " + obj.getID());

      if (comUtil.isNull(pluginName)) {
        $p.log("### initGroup: " + obj.getID() + " is null");
      } else {
        if (pluginName == "input") {
          if (!comUtil.isNull(obj.defaultValue)) {
            obj.setValue(obj.defaultValue);
          } else {
            obj.setValue("");
          }
        } else if (pluginName == "inputcalendar" || pluginName == "calendar" || pluginName == "multiselect" || pluginName == "autocomplete" || pluginName == "secret" || pluginName == "searchbox" || pluginName == "textarea" || pluginName == "checkbox") {
          obj.setValue("");
        } else if (pluginName == "selectbox") {
          if (obj.allOption + "" == "true") {
            obj.setValue("all");
          } else {
            obj.setValue("");
          }
        } else if (pluginName == "radio") {
          obj.reset();
        } else if (pluginName == "group") {
          webUtil._initGroupOnly(obj);
        } else if (pluginName == "editor") {
          obj.setHTML("");
        }
      }
    }
  }
};

/**
 * gridView에서 바인드된 dataList 반환
 * @memberOf webUtil
 * @param {Object:Y} gridViewObj grid ID
 * @return Object dataList 객체
 * @example
 *      getDataListObject("gridView1")
 */
webUtil.getDataListObject = function (gridViewObj) {
  var grdObj = typeof gridViewObj == "string" ? $p.getComponentById(gridViewObj) : gridViewObj;
  var dataListId = grdObj.getDataList();
  if (dataListId !== "") {
    var dataList = $p.getComponentById(dataListId);
    if (comUtil.isNull(dataList)) {
      $p.log("DataList(" + dataListId + ")를 찾을 수 없습니다.");
    } else {
      return dataList;
    }
  } else {
    $p.log(grdObj.getID() + "는 DataList가 셋팅되어 있지 않습니다.");
  }
  return null;
};

/**
 * GridView의 데이터를 엑셀 파일로 다운로드한다.
 *
 * @param pGridView 엑셀 파일로 다운로드 받을 GridView 객체
 * @param userOptions JSON형태로 저장된 그리드의 엑셀 다운로드 옵션
 * @param pInfoArr 추가옵션<br/>
 * 아래는 excel download시 option의 속성<br/>
 * | options.fileName <String:Y>             : [defalut: excel.xls] 다운로드하려는 파일의 이름으로 필수 입력 값이다.<br/>
 * | options.sheetName <String:N>            : [defalut: sheet] excel의 sheet의 이름<br/>
 * | options.type <String:N>                 : [defalut: 0] type이 0인 경우 실제 데이터 1인 경우 눈에 보이는 데이터를  2이면 들어가 있는 data 그대로(filter무시 expression 타입의 셀은 나오지 않음)<br/>
 * | options.hiddenColumn                    : [defalut: false] 그리드의 숨겨진 컬럼을 엑셀로 다운받을지 여부<br/>
 * | options.removeColumns <String:N>        : [defalut: 없음]    다운로드시 excel에서 삭제하려는 열의 번호(여러 개일 경우 ,로 구분)<br/>
 * | options.removeHeaderRows <String:N>     : [defalut: 없음]    다운로드시 excel에서 삭제하려는 Header의 row index(여러 개일 경우 ,로 구분)<br/>
 * | options.foldColumns <String:N>          : [defalut: 없음] 다운로드시 excel에서 fold하려는 열의 번호(여러 개일 경우 ,로 구분)<br/>
 * | options.startRowIndex <Number:N>        : [defalut: 0] excel파일에서 그리드의 데이터가 시작되는 행의 번호(헤더 포함)<br/>
 * | options.startColumnIndex <Number:N>     : [defalut: 0] excel파일에서 그리드의 데이터가 시작되는 열의 번호(헤더 포함)<br/>
 * | options.headerColor <String:N>          : [defalut: #33CCCC] excel파일에서 그리드의 header부분의 색<br/>
 * | options.headerFontName <String:N>       : [defalut: 없음] excel파일에서 그리드의 header부분의 font name<br/>
 * | options.headerFontSize <String:N>       : [defalut: 10] excel파일에서 그리드의 header부분의 font size<br/>
 * | options.headerFontColor <String:N>      : [defalut: 없음] excel파일에서 그리드의 header부분의 font색<br/>
 * | options.bodyColor <String:N>            : [defalut: #FFFFFF] excel파일에서 그리드의 body부분의 색<br/>
 * | options.bodyFontName <String:N>         : [defalut: 없음] excel파일에서 그리드의 body부분의 font name<br/>
 * | options.bodyFontSize <String:N>         : [defalut: 10] excel파일에서 그리드의 body부분의 font size<br/>
 * | options.bodyFontColor <String:N>        : [defalut: 없음] excel파일에서 그리드의 body부분의 font색<br/>
 * | options.subTotalColor <String:N>        : [defalut: #CCFFCC] excel파일에서 그리드의 subtotal부분의 색<br/>
 * | options.subTotalFontName <String:N>     : [defalut: 없음] excel파일에서 그리드의 subtotal부분의 font name<br/>
 * | options.subTotalFontSize <String:N>     : [defalut: 10] excel파일에서 그리드의 subtotal부분의 font size<br/>
 * | options.subTotalFontColor <String:N>    : [defalut: 없음] excel파일에서 그리드의 subtotal부분의 font색<br/>
 * | options.footerColor <String:N>          : [defalut: #008000] excel파일에서 그리드의 footer부분의 색<br/>
 * | options.footerFontName <String:N>       : [defalut: 없음] excel파일에서 그리드의 footer부분의 font name<br/>
 * | options.footerFontSize <String:N>       : [defalut: 10] excel파일에서 그리드의 footer부분의 font size<br/>
 * | options.footerFontColor <String:N>      : [defalut: 없음] excel파일에서 그리드의 footer부분의 font색<br/>
 * | options.showProcess <Boolean:N>         : [defalut: true] 다운로드 시 프로세스 창을 보여줄지 여부<br/>
 * | options.massStorage <Boolean:N>         : [defalut: true] 대용량 다운로드 여부 (default는 true 이 옵션을 true로 하고 showConfirm을 false로 한 경우에 IE에서 신뢰할만한 사이트를 체크하는 옵션이 뜬다.)<br/>
 * | options.showConfirm <Boolean:N>         : [defalut: false] 다운로드 확인창을 띄울지 여부(옵션을 킨 경우 advancedExcelDownload를 호출후 사용자가 window의 버튼을 한번더 클릭해야 한다. massStorage는 자동으로 true가 된다)<br/>
 * | options.dataProvider <String:N>         : [defalut: 없음] 대량데이터 처리 및 사용자 데이터를 가공할 수 있는 Provider Package<br/>
 * | options.providerRequestXml <String:N>   : [defalut: 없음] Provider 내부에서 사용할 XML 문자열<br/>
 * | options.userDataXml <String:N>          : [defalut: 없음] 사용자가 서버모듈 개발 시 필요한 데이터를 전송 할 수 있는 변수<br/>
 * | options.bodyWordwrap <Boolean:N>        : [defalut: false] 다운로드시 바디의 줄 바꿈 기능<br/>
 * | options.useEuroLocale <String:N>        : [defalut: false] 다운로드시 유로화 처리 기능(,와 .이 반대인 경우처리)<br/>
 * | options.useHeader <String:N>            : [defalut: true] 다운로드시 Header를 출력 할지 여부( "true"인경우 출력, "false"인경우 미출력)<br/>
 * | options.useSubTotal <String:N>          : [defalut: false] 다운로드시 SubTotal을 출력 할지 여부( "true"인경우 출력, "false"인경우 미출력), expression을 지정한 경우 avg,sum,min,max,targetColValue,숫자를 지원 함.<br/>
 * | options.useFooter <String:N>            : [defalut: true] 다운로드시 Footer를 출력 할지 여부( "true"인경우 출력, "false"인경우 미출력)<br/>
 * | options.columnMove <String:N>			 : [defalut: false] 그리드 컬럼이동시 이동된 상태로 다운로드 유무 <br> "true" => 컬럼이동 순서대로 출력
 * | options.columnOrder <String:N>			 : [defalut: 없음] 엑셀 다운로드시 다운로드되는 컬럼 순서를 지정 할 수 있는 속성 ( "0,3,2,1"로 지정시 지정한 순서로 다운로드된다 )
 * | options.separator <String:N>            : [defalut: ,] 다운로드시 서버로 데이터 전송할때, 데이터를 구분짓는 구분자, default는 comma(,)<br/>
 * | options.subTotalScale <Number:N>        : [defalut: -1] 다운로드시 subTotal 평균계산시 소수점 자리수를 지정<br/>
 * | options.subTotalRoundingMode <String:N> : [defalut: 없음] 다운로드시 subTotal 평균계산시 Round를 지정 한다. ("CEILING","FLOOR","HALF_UP")<br/>
 * | options.useStyle <String:N>             : [defalut: false] 다운로드시 css를 제외한, style을 excel에도 적용할 지 여부 (배경색,폰트)<br/>
 * | options.freezePane <String:N>           : [defalut: ""] 틀고정을 위한 좌표값 및 좌표값의 오픈셋 ( ex) freezePane="3,4" X축 3, Y축 4에서 틀고정, freezePane="0,1,0,5" X축 0, Y축 1에서 X축으로 0, Y축으로 5로 틀공정  )<br/>
 * | options.autoSizeColumn <String:N>       : [defalut: false] 너비자동맞춤 설정 유무<br/>
 * | options.displayGridlines <String:N>     : [defalut: false] 엑셀 전체 셀의 눈금선 제거 유무<br/>
 * | options.colMerge <String:N>             : [defalut: false] colMerge된 컬럼을 Merge해서 출력 할 지 여부<br/>
 * | options.useDataFormat <String:N>        : [defalut: 없음] 그리드 dataType이 text인 경우, 엑셀의 표시형식 '텍스트' 출력 유무( "true"인 경우 표시형식 텍스트, "false"인 경우 표시형식 일반 출력)<br/>
 * | options.pwd <String:N>                  : [default: 없음] 엑셀 파일로 다운로드할 때 비밀번호를 설정. 사용 조건: (1) 비밀번호는 BASE64로 인코딩후 전송해야 함. (2) websquare.xml에 <encrypt tempDir>을 설정해야 함. (3) POI 3.10으로 업그레이드 필요.
 * | options.maxCellCount  <String:N>        : [default: 없음] 엑셀 다운로드를 제한할 셀 개수 ( ex) 1000 설정시 grid의 셀 개수가 1000개를 넘어가면 서버로 요청을 보내지 않는다. )
 * | options.maxRowCount  <String:N>         : [default: 없음] 엑셀 다운로드를 제한할 행 개수 ( ex) 1000 설정시 grid의 행 개수가 1000개를 넘어가면 서버로 요청을 보내지 않는다. )
 * | options.printSet <Object:N>             : JSON형태로 저장된 Excel Print관련 설정<br/>
 * | options.printSet.fitToPage <String:N>   : [defalut: false] 엑셀 프린터 출력시 쪽맞춤 사용 유무<br/>
 * | options.printSet.landScape <String:N>   : [defalut: false] 엑셀 프린터 출력시 가로 방향 출력 유무<br/>
 * | options.printSet.fitWidth <String:N>    : [defalut: 1] 엑셀 프린터 출력시 용지너비<br/>
 * | options.printSet.fitHeight <String:N>   : [defalut: 1] 엑셀 프린터 출력시 용지높이<br/>
 * | options.printSet.scale <String:N>       : [defalut: 100] 엑셀 프린터 출력시 확대/축소 배율, scale을 사용할 경우 fitToPage는 false로 설정 해야 한다.<br/>
 * | options.printSet.pageSize <String:N>    : [defalut: A4] 엑셀 프린터 출력시 인쇄용지 설정 ( ex) "A3", "A4", "A5", "B4" )<br/>
 *
 * @param pInfoArr 그리드에 대한 내용을 추가로 다른 셀에 표현하는 경우 사용하는 배열<br/>
 * | pInfoArr.rowIndex      : 내용을 표시할 행번호<br/>
 * | pInfoArr.colIndex      : 내용을 표시할 열번호<br/>
 * | pInfoArr.rowSpan       : 병합할 행의 수<br/>
 * | pInfoArr.colSpan       : 병합할 열의 수<br/>
 * | pInfoArr.text          : 표시할 내용<br/>
 * | pInfoArr.textAlign     : 표시할 내용의 정렬 방법 (left, center, right)<br/>
 * | pInfoArr.fontSize      : font size 설정 ( ex) "20px" )<br/>
 * | pInfoArr.color         : font color 설정 ( ex) "red" )<br/>
 * | pInfoArr.fontWeight    : font weight 설정 ( ex) "bold" )<br/>
 * | pInfoArr.drawBorder    : cell의 border 지정 ( ex) true )<br/>
 * | pInfoArr.wordWrap      : cell의 줄 바꿈 기능 ( ex) "true" )<br/>
 * | pInfoArr.bgColor       : cell의 배경 color 설정 ( ex) "red" )<br/>
 *
 * @example
 * var options = {
 *     fileName:           "user.xls",
 *     type:               "1",
 *     removeColumns:      "",
 *     foldColumns:        "",
 *     startRowIndex:      3,
 *     startColumnIndex:   0,
 *     headerColor:        "#DBEEF3",
 *     footerColor:        "#92CDDC",
 *     showProcess:        true,
 *     dataProvider:       "",
 *     useStyle:           true
 * };
 *
 * var infoArr = [];
 * var infoObj = {
 *     rowIndex:   1,
 *     colIndex:   0,
 *     rowSpan:    1,
 *     colSpan:    3,
 *     text:       "그리드 다운로드 샘플",
 *     textAlign:  "left"
 * };
 * infoArr.push(infoObj);
 * ex1) gridExcelDownload(gridView1, options)
 * ex2) gridExcelDownload(gridView1, options, infoArr)

 * option.providerRequestXml = scwin.setProviderData("zipCodeService", "selectZipCodeStreetByStreet", dma_search_excel);
 * <data>
 *   <service>zipCodeService</service>
 *   <method>selectZipCodeStreetByStreet</method>
 *   <param>{"STREET":"용마산","START_IDX":"201","END_IDX":"300"}</param>
 *   <keyMap>SIGUNGUCODE,STREETNUM,STREET,STREETENG,DONGSEQ,SIDO,SIGUNGU,DONGTYPE,DONGCODE,DONG,PARENTSTREETNUM,PARENTSTREET,ISUSE,CHANGEREASON,CHANGEHISTORY,SIDOENG,SIGUNGUENG,DONGENG,OPENDATE,CLOSEDATE</keyMap>
 * </data>
 */
// TODO: 엑셀 다운로드
webUtil.gridExcelDownload = function (pGridView, userOptions, pInfoArr) {
  var gridView = typeof pGridView == "string" ? $p.getComponentById(pGridView) : pGridView;
  var dataList = gridView.dataList;
  var infoArr = !comUtil.isNull(pInfoArr) ? pInfoArr : [];
  if (dataList.getTotalRow() == 0) {
    webUtil.showAlert(_error_msg.COM_EXCEL_DOWN);
    return;
  }
  var date = comUtil.getLocalDateTime("YYYYMMDD_hhmm") + ".xlsx";
  var addOpt = {
    "type": "1",
    "startRowIndex": 0,
    "startColumnIndex": 0,
    "hiddenColumn": false,
    "fileName": date,
    "autoSizeColumn": true // 너비자동맞춤 설정 유무
    //, "freezePane": "1,2"    // y축(세로)1열, x축(가로)2열 고정
    //, "rowNumVisible" : true   // 순번
    ,
    "useFooter": true,
    "useSubTotal": true,
    "useSubTotalData": true,
    "groupby": "true" // 퀀텀그리드 사용시
    ,
    "columnMove": "true",
    "maxRowCount": userOptions.maxRowCount || 1000,
    "colMerge": "true",
    "colMergeValue": "true",
    "useStyle": true,
    "showProcess": true
  };
  var options = $.extend({}, addOpt, userOptions);
  if (infoArr != null && infoArr.length > 0) {
    options.startRowIndex = infoArr[infoArr.length - 1].rowIndex + 2;
  }

  // 엑셀다운로드시 제외 컬럼
  var removeColList = "";
  var cnt = 0;
  if (!comUtil.isNull(options.removeColumns)) {
    removeColList = options.removeColumns;
    cnt++;
  }
  if (!options.hiddenColumn) {
    for (var i = 0; i < gridView.getTotalCol(); i++) {
      if (!gridView.getColumnVisible(i)) {
        if (cnt > 0) removeColList += ",";
        removeColList += i;
        cnt++;
      }
    }
  }
  options.removeColumns = removeColList;
  if (options.useProvider) {
    var colList = [];
    var delCol = removeColList.split(",");
    for (var i = 0; i < gridView.getTotalCol(); i++) {
      if (delCol.length > 0) {
        var isDel = false;
        for (var j = 0; j < delCol.length; j++) {
          if (i == parseInt(delCol[j].trim())) {
            isDel = true;
            break;
          }
        }
        if (!isDel) {
          colList.push(gridView.getColumnID(i));
        }
      } else {
        colList.push(gridView.getColumnID(i));
      }
    }
    var xmlDoc = WebSquare.xml.parse(options.providerRequestXml, false);
    WebSquare.xml.setValue(xmlDoc, "data/keyMap", colList.join(","));
    options.providerRequestXml = WebSquare.xml.serialize(xmlDoc);
    $p.log("### options.providerRequestXml ========>\n" + options.providerRequestXml);
  }
  gridView.advancedExcelDownload(options, infoArr);
};

/**
 * 엑셀을 다운로드시 여러개의 sheet를 다운로드
 *
 * @memberOf webUtil
 * @param {Object} userOptions JSON형태로 저장된 그리드의 엑셀 옵션
 * @param {String} fileNm 다운받을 파일명
 * @example
 *      var options = {
 *          excelInfo: [
 *              {
 *                    gridId : "grd_RecpList"
 *                  , sheetName : "첫번째 sheet"
 *                  , type : "1"
 *                  , removeColumns : "0"
 *                  , startRowIndex : 2
 *                  , startColumnIndex : 0
 *                  , headerColor : "#DBEEF3"
 *                  , bodyColor : "#92CDDC"
 *                  , excelTitle: "전기수납요금"
 *              },
 *              {
 *                    gridId : "grd_Orgn"
 *                  , sheetName : "두번째 sheet"
 *                  , type : "1"
 *                  , startRowIndex : 2
 *                  , startColumnIndex : 0
 *                  , headerColor : "#DBEEF3"
 *                  , bodyColor : "#92CDDC"
 *                  , excelTitle: "자재목록"
 *              }
 *          ]
 *      };
 *      webUtil.multiDownloadExcel(options, "user.xls");
 * 예제) /ui/sample/gridView/grid_multi_down.xml
 */
webUtil.multiDownloadExcel = function (userOptions, fileNm) {
  if (comUtil.isNull(userOptions)) {
    alert("option은 필수 입력입니다.");
    return false;
  }
  var info = userOptions.excelInfo;
  var sumCnt = 0;
  for (var grdCnt = 0; grdCnt < info.length; grdCnt++) {
    var grdObj = $p.getComponentById(info[grdCnt].gridId);
    var excelInfo = info[grdCnt];
    if (grdObj == null) {
      alert("그리드가 없습니다: " + info[grdCnt].gridId);
      return false;
    }
    var dataList = grdObj.dataList;
    if (dataList.getTotalRow() == 0) {
      alert("엑셀로 다운로드할 데이터가 없습니다.");
      return false;
    }
    sumCnt += dataList.getTotalRow();
    info[grdCnt].sheetName = info[grdCnt].sheetName || "sheet" + (grdCnt + 1);
    info[grdCnt].type = info[grdCnt].type || "1";
    info[grdCnt].startRowIndex = info[grdCnt].startRowIndex || (userOptions.multipleSheet === true ? 0 : 2);
    info[grdCnt].startColumnIndex = info[grdCnt].startColumnIndex || 0;
    info[grdCnt].rowsByN = dataList.getTotalRow();

    // 엑셀다운로드시 제외 컬럼
    var removeColList = "";
    var cnt = 0;
    if (typeof info[grdCnt].removeColumns != "undefined" && info[grdCnt].removeColumns != "") {
      removeColList = info[grdCnt].removeColumns;
      cnt++;
    }
    for (var i = 0; i < dataList.getTotalCol(); i++) {
      if (!grdObj.getColumnVisible(i)) {
        if (cnt > 0) removeColList += ",";
        removeColList += i;
        cnt++;
      }
    }
    info[grdCnt].removeColumns = removeColList;
    if (infoArr != null && infoArr.length > 0) {
      info[grdCnt].startRowIndex = infoArr[infoArr.length - 1].rowIndex + 2;
    }
    info[grdCnt].infoArr = infoArr;
  }
  var excelFile = comUtil.getLocalDateTime("YYYYMMDD_hhmm") + ".xlsx";
  // multipleSheet: false인경우 1개의 sheet로 다운가능
  // multipleSheet는 string 타입으로 해야 정상동작
  // https://inswave.com/confluence/pages/viewpage.action?pageId=14724861
  var options = {
    "common": {
      "fileName": fileNm || excelFile,
      "showProcess": true,
      "multipleSheet": userOptions.multipleSheet === true ? "true" : "false"
    },
    "excelInfo": info
  };
  $p.multipleExcelDownload(options);
};

/**
 * GridView에 엑셀 파일 데이터 업로드한다.
 *
 * @param {Object} grdViewObj 엑셀 파일의 데이터를 업로드할 GridView 객체
 * @param {Object} options JSON형태로 저장된 그리드의 엑셀 업로드 옵션
 * 아래는 option의 속성들 <br/>
 *     <string:n>   options.type : [default:    0] 1이면 엑셀 파일이 그리드의 보이는 결과로 만들어져있을때  0이면 엑셀 파일이 그리드의 실제 데이터로 구성되어있을때<br/>
 *     <number:n>   options.sheetNo         : [default:  0] excel파일에서 그리드의 데이터가 있는 sheet번호<br/>
 *     <number:n>   options.startRowIndex   : [default: 0] excel파일에서 그리드의 데이터가 시작되는 행의 번호(헤더 포함)<br/>
 *     <number:n>   options.startColumnIndex: [default: 0] excel파일에서 그리드의 데이터가 시작되는 열의 번호<br/>
 *     <number:n>   options.endColumnIndex  : [default: 0] excel파일에서 그리드의 데이터가 끝나는 열의 index ( 엑셀컬럼수가 그리드컬럼수 보다 작은 경우 그리드 컬러수를 설정)<br/>
 *     <string:n>   options.headerExist     : [default: 0] excel파일에서 그리드의 데이터에 header가 있는지 여부(1이면 header 존재 0이면 없음)<br/>
 *     <string:n>   options.footerExist     : [default: 1] excel파일에서 그리드의 데이터에 footer가 있는지 여부(1이면 footer 존재 0이면 없음 기본값은 1 그리드에 footer가 없으면 적용되지 않음)<br/>
 *     <string:n>   options.append          : [default: 0] excel파일에서 가져온 데이터를 그리드에 append시킬지 여부<br/>
 *                                                    (1이면 현재 그리드에 데이터를 추가로 넣어줌 0이면 현재 그리드의 데이터를 삭제하고 넣음)<br/>
 *     <string:n>   options.hidden          : [default: 0] 읽어들이려는 엑셀파일에 hidden column이 저장되어 있는지 여부를 설정하는 int형 숫자<br/>
 *                                                    (0이면  엑셀파일에 hidden 데이터가 없으므로 그리드 hidden column에 빈 데이터를 삽입  1 : 엑셀파일에 hidden 데이터가 있으므로 엑셀 파일로부터 hidden 데이터를 삽입 )<br/>
 *     <string:n>   options.fillHidden      : [default: 0] Grid에 hiddenColumn에 빈 값을 넣을지를 결정하기 위한 int형 숫자<br/>
 *                                                    (1이면 hidden Column에 빈 값을 저장하지 않음,0이면 hidden column이 저장되어있지 않은 Excel File이라 간주하고 hidden Column에 빈 값을 넣어줌)<br/>
 *                                                    (hidden이 0인 경우에는 fillhidden은 영향을 끼치지 않음)<br/>
 *     <string:n>   options.skipSpace       : [default: 0] 공백무시 여부(1이면 무시 0이면 포함)<br/>
 *     <array:n>    options.insertColumns   : radio, checkbox와 같은 컬럼을 엑셀에서 받아 오지 않고, 사용자 컬럼 설정 으로 업로드 ( 데이터 구조 : [ { columnIndex:1, columnValue:"1" } ] )<br/>
 *     <string:n>   options.popupUrl        : 업로드시에 호출할 popup의 url<br/>
 *     <string:n>  options.delim     : 업로드시 데이터를 구분하는 구분자 (default: , )<br/>
 *     <string:n>   options.status      : [default: R]업로드된 데이터의 초기 상태값, 설정하지 않으면 "R"로 설정되며 "C"값을 설정 할 수 있다.<br/>
 *     <string:n>   options.pwd     : 엑셀파일에 암호가 걸려 있는 경우, 비밀번호<br/>
 *     <string:n>  options.optionParam  : [default: 없음] DRM 연계시 사용자 정의 class에 HashMap 인자로 전달할 값. key는 "optionParam"으로 참조한다.<br/>
 *     <string:n>  options.cellDataConvertor  : [default: true] 컬럼값을 사용자가 수정할수 있는 연계 클래스의 전체 패키지명. (AbstractCellDataProvider class를 상속후 convertValue method 를 구현해야 함.<br/>
 *     <string:n>  options.decimal  : [default: 4] 셀의 데이터가 소수인 경우, 최종 소수점 자리수. (기본값: 4) (예: 3인경우 4자리에서 반올림해서 3자리를 최종 표시.)<br/>
 *     <string:n>  options.features upload화면이 뜰 때 string 형식의 스타일 정보. 지정되지 않은경우 upload창이 기본 스타일로 생성<br/>
 *
 * @example
 * var options = {};
 * options.headerExist ="1"; //헤더의 존재 여부 입니다.
 * options.startRowIndex = "3"; //excel파일에서 gird의 데이터가 시작되 row의 index입니다..(헤더 포함)
 * options.startColumnIndex = "0";  //excel파일에서 gird의 데이터가 시작되는 column의 index입니다.(헤더 포함)
 * options.sheetNo=0; //excel의 sheet번호입니다.
 * options.append ="0";  //append 여부입니다. 0이면 append하지 않고 새로 쓰고 1이면 그리드의 뒤쪽에 데이터를 추가로 붙여줍니다.
 * options.hidden ="1";  //1이면 그리드에서 엑셀 다운로드시에 hidden을 포함했다는 의미입니다. 즉 upload시에 그리드의 hidden Column에 값을 넣는다는 의미입니다.
 * ex1) gridExcelUpload(gridView)
 * ex2) gridExcelUpload(gridView, options)
 */
webUtil.gridExcelUpload = function (gridViewObj, userOptions) {
  var gridView = typeof gridViewObj === "string" ? $p.getComponentById(gridViewObj) : gridViewObj;
  if (comUtil.isNull(gridView)) {
    comUtil.errorMessageDisplay("[Grid] " + _error_msg.DEV_GRIDID_NONE);
    return;
  }
  var addOpt = {
    "type": "1",
    "headerExist": "1",
    "startRowIndex": 2,
    "startColumnIndex": 0,
    "sheetNo": 0,
    "append": "0",
    "hidden": "0"
  };
  var options = $.extend({}, addOpt, userOptions);
  gridView.advancedExcelUpload(options);
};

/**
 * 그리드 행삭제
 * 체크컬럼이 존재하는 경우 멀티 삭제, 없는경우 1건 삭제 (현재 focus가 있는 행 삭제)
 * @memberOf webUtil
 * @param {Object:Y} opt  JSON형태의 삭제정보
 * @return 없음
 * @example
 *    var option = {
 *          gridId: "grdMembersInfo"
 *        , chkColId: "chk"
 *        , userCallBack: "scwin.deleteAfterCallback"
 *        , param: { id: "MRJ" }
 *    };
 *    webUtil.deleteGridView(option);
 */
webUtil.deleteGridView = function (opt) {
  var grdObj = $p.getComponentById(opt.gridId);
  if (comUtil.isNull(grdObj)) {
    webUtil.showAlert("grid not found ==> " + opt.gridId);
    return;
  }
  var dataList = grdObj.dataList;
  var chkColNm = !comUtil.isNull(opt.chkColId) ? opt.chkColId : "chk";
  var chkList = grdObj.getCheckedIndex(chkColNm);
  if (chkList.length == 0) {
    var row = grdObj.getFocusedRowIndex();
    if (row >= 0) chkList.push(row);
  }
  if (chkList.length > 0) {
    for (var i = chkList.length - 1; i > -1; i--) {
      var stat = dataList.getRowStatus(chkList[i]);
      if (stat == 'C') {
        dataList.removeRow(chkList[i]);
      } else {
        dataList.deleteRow(chkList[i]);
      }
    }
    if (typeof opt.userCallBack != "undefined") {
      eval(opt.userCallBack)(opt.param);
    }
  } else {
    webUtil.showAlert(_error_msg.COM_DEL_SELECT_Q);
  }
};

/**
 * 그리드 행삭제 취소
 * @memberOf webUtil
 * @param {String:Y} gridViewObjId  그리드명
 * @param {String:N} chkColId   그리드의 체크컬럼ID (생략시 컬럼ID는 chk)
 * @return 없음
 * @example
 *     removeCancelGridView("gridView1");
 */
webUtil.removeCancelGridView = function (gridViewObjId, chkColId) {
  try {
    var gridObj = typeof gridViewObjId === "string" ? $p.getComponentById(gridViewObjId) : gridViewObjId;
    var _chkColId = comUtil.isNull(chkColId) ? "chk" : chkColId;
    var dltObj = gridObj.dataList;
    if (dltObj === null) {
      comUtil.errorMessageDisplay(_error_msg.DEV_NO_DATALIST);
      return;
    }
    var checkArr = gridObj.getCheckedIndex(_chkColId);
    for (var inx = checkArr.length - 1; inx >= 0; inx--) {
      var chkRowInx = checkArr[inx];
      dltObj.undeleteRow(chkRowInx);
      var chkVal = dltObj.getCellData(chkRowInx, _chkColId);
      if (chkVal == "Y") {
        // trueValue, falseValue를 사용한 경우
        dltObj.setCellData(chkRowInx, _chkColId, "N");
      } else {
        gridObj.setCellChecked(chkRowInx, _chkColId, false);
      }
    }

    // 전체행이 uncheck 인 경우 헤더값도 uncheck함
    var checkArr2 = gridObj.getCheckedIndex(_chkColId);
    if (checkArr2.length == 0) {
      var headerId = gridObj._getMatchedHeaderId(_chkColId);
      gridObj.setHeaderValue(headerId, true);
      gridObj.setHeaderValue(headerId, false);
    }
  } catch (e) {
    $p.log("[webUtil.removeCancleGridView] Exception :: " + e.message);
  }
};

/**
 * 그리드에서 데이터의 변경 여부 검사
 * @memberOf webUtil
 * @param {Object:Y} gridName grid ID List
 * @return Boolean
 * @example
 *      getGridViewModify(["gridView1", "gridView2"]);
 */
webUtil.getGridViewModify = function (grdlist) {
  for (var i = 0; i < grdlist.length; i++) {
    var grdObj = $p.getComponentById(grdlist[i]);
    if (grdObj) {
      var dataList = $p.getComponentById(grdObj.getDataList());
      if (dataList) {
        var modList = dataList.getModifiedJSON({
          DB: true
        });
        if (modList.length == 0) {
          webUtil.showAlert(_error_msg.COM_NO_CHANGE);
          return false;
        }
      } else {
        $p.log("### Grid: " + grdlist[i] + "에 bind된 dataList를 찾을 수 없습니다.");
      }
    }
  }
  return true;
};

/**
 * 그리드에서 숫자로(timestamp) 된 날짜cell의 데이터를 문자로 변환해서 자동 셋팅
 * dataList에 데이터를 셋팅후 이 함수를 호출
 * @memberOf webUtil
 * @param {String:Y} dataList dataList ID
 * @param {Object:Y} colList 날짜로된 컬럼 리스트
 * @param {Object:N} dateFormat 날짜포맷 리스트
 * @example
 *     setDateGridData("moduleListForm", ["insDtm", "modDtm"], ["yyyyMMdd", "yyyyMMddHHmmss"]);
 *     ==> 입력일시는 yyyyMMdd 포맷으로,  수정일시는 yyyyMMddHHmmss 포맷으로 셋팅 (생략시 yyyyMMddHHmmss)
 */
webUtil.setDateGridData = function (dataList, colList, dateFormat) {
  var dataNm = typeof dataList == "string" ? $p.getComponentById(dataList) : dataList;
  if (dataNm != null) {
    if (typeof colList == "undefined" || typeof colList == "string") {
      alert('컬럼ID가 없습니다.\n또는 컬럼ID는 string의 array형태로 해야 합니다\nex)webUtil.setDateGridData("moduleListForm", ["insDtm", "modDtm"])');
      return;
    }
    for (var row = 0; row < dataNm.getTotalRow(); row++) {
      for (var i = 0; i < colList.length; i++) {
        var data = dataNm.getCellData(row, colList[i]);
        var dateStr = comUtil.numberToStringDate(data);
        if (typeof dateFormat != "undefined" && dateFormat[i] != null && dateFormat[i].length > 5) {
          dateStr = dateStr.substring(0, dateFormat[i].length);
        }
        dataNm.setCellData(row, colList[i], dateStr);
      }
    }
    dataNm.reform();
  } else {
    $p.log("### webUtil.setDateGridData: " + dataList + " not found");
  }
};

/**
 * 그리드에서 입력된 데이터의 유효성 체크 (JSON 형태)
 * @memberOf webUtil
 * @param {Object:Y} gName grid ID
 * @param {Object:Y} opt 컬럼들의 속성 option
 * @example
 * var option = [ { hid: "H_ALPHABET", cid: "ALPHABET", mandatory: "y", alphabet: "y", maxlength: "10" }
 *              , { hid: "H_NUMBER",   cid: "NUMBER",   mandatory: "y", numeric: "y"}
 *              , { hid: "H_ZERO",     cid: "ZERO",     numeric: "y", zero: "n" }
 *              , { hid: "H_DIGIT",    cid: "DIGIT",    numeric: "y", digit: 3, maxlength: 5 }
 *              , { hid: "H_UPPER",    cid: "UPPER",    upper: "y", minlength: 2 }
 *              , { hid: "H_REG_NO",   cid: "REG_NO",   maxlength: 14, type: "REG_NO" }
 * ];
 * ex) var ret = webUtil.gridValidCheckJSON(grdMain, option)
 *  0: headerid
 *  1: columnid
 *  2: mandatory
 *  3: alphabet
 *  4: upper
 *  5: lower
 *  6: numeric
 *  7: hangul
 *  8: other
 *  9: minlength
 * 10: maxlength
 * 11: zero
 * 12: digit
 * 13: type: DATE(날짜), REG_NO(주민등록번호), EMAIL(E-Mail)
 * numeric:y 일때 maxlength, minlength는 정수부분만 체크
 * 기본적으로 모든문자는 허용하나 alphabet, upper, lower, numeric, hangul중 어느 한 속성이 y일때 다른 속성은 n으로 됨
 */
// TODO: 그리드내 데이터 유효성 검사 (JSON)
webUtil.gridValidCheckJSON = function (gName, opt) {
  if (comUtil.isNull(gName)) {
    comUtil.errorMessageDisplay("[Grid] " + _error_msg.DEV_GROUP_NAME);
    return false;
  }
  var gridName = typeof gName == "string" ? $p.getComponentById(gName) : gName;
  var dataName = webUtil.getDataListObject(gridName);
  if (dataName == null) {
    comUtil.errorMessageDisplay(_error_msg.DEV_NO_DATALIST);
    return false;
  }
  var updList = dataName.getModifiedIndex();
  for (var no = 0; no < updList.length; no++) {
    var row = updList[no];
    var stat = dataName.getRowStatus(row);
    if (stat == "C" || stat == "U" || stat == "1" || stat == "2") {
      // 입력, 수정
      for (var i = 0; i < opt.length; i++) {
        var chkList = {
          "hid": opt[i].hid || "",
          "cid": opt[i].cid || "",
          "mandatory": (opt[i].mandatory || "n").toLowerCase(),
          "alphabet": (opt[i].alphabet || "n").toLowerCase(),
          "upper": (opt[i].upper || "n").toLowerCase(),
          "lower": (opt[i].lower || "n").toLowerCase(),
          "numeric": (opt[i].numeric || "n").toLowerCase(),
          "hangul": (opt[i].hangul || "n").toLowerCase(),
          "other": opt[i].other || "",
          "minlength": parseInt(opt[i].minlength) || 0,
          "maxlength": parseInt(opt[i].maxlength) || 0,
          "zero": (opt[i].zero || "y").toLowerCase(),
          "digit": parseInt(opt[i].digit) || 0,
          "type": opt[i].type || ""
        };

        // body column ID의 첫문자 또는 마지막 문자가 space 일때
        if (opt[i].cid.charAt(0) == ' ' || opt[i].cid.charAt(opt[i].cid.length - 1) == ' ') {
          alert("잘못된 그리드컬럼ID(ID에 space가 포함됨: [" + opt[i].cid + "]");
          return false;
        }
        var col = chkList.cid;
        var readOnly = gridName.getReadOnly("column", row, col);

        // getColumnName 함수 사용시 dataList의 name 속성값을 가지고 옴
        //var dis = "[" + dataName.getColumnName(chkList.cid) + "] ";
        var dis = "";
        if (typeof gridName.getHeaderValue(chkList.hid) == "undefined") {
          dis = "";
        } else {
          var hNm = gridName.getHeaderValue(chkList.hid).split("* ");
          if (hNm.length == 1) {
            dis = "[" + gridName.getHeaderValue(chkList.hid) + "] ";
          } else {
            var hNm2 = hNm[1].split("</span>");
            if (hNm2.length == 1) {
              dis = "[" + hNm[1] + "] ";
            } else {
              dis = "[" + hNm2[0] + "] ";
            }
          }
        }
        var value = "" + dataName.getCellData(row, col);
        value = value.trim();
        if (chkList.mandatory == 'y' && value.length == 0) {
          webUtil.showAlert(dis + _error_msg.ERR_IN_MAND_ITEM);
          if (!readOnly) gridName.setFocusedCell(row, col, true);
          return false;
        }

        // 숫자타입이 아님
        if (chkList.numeric == "n") {
          chkList.zero = "n";
          chkList.digit = 0;
        }
        var period = value.indexOf(".");
        var numVal = value;
        var isNum = false; // 숫자만 입력

        // 숫자만 입력받는 경우
        if (chkList.numeric == 'y' && chkList.alphabet == 'n' && chkList.upper == 'n' && chkList.lower == 'n' && chkList.hangul == 'n') {
          isNum = true;
        }
        if (period != -1 && isNum) {
          numVal = value.substring(0, period);
        }
        if (chkList.minlength > 0) {
          if (numVal.length < chkList.minlength) {
            if (isNum) {
              // 숫자만 입력받는 경우
              webUtil.showAlert(dis + _error_msg.ERR_IN_NUM_RIGHT + " (Min: " + chkList.minlength + "Byte)");
            } else {
              webUtil.showAlert(dis + _error_msg.ERR_IN_RIGHT + " (Min: " + chkList.minlength + "Byte)");
            }
            if (!readOnly) gridName.setFocusedCell(row, col, true);
            return false;
          }
        }
        if (chkList.maxlength > 0) {
          if (numVal.length > chkList.maxlength) {
            if (isNum) {
              // 숫자만 입력받는 경우
              webUtil.showAlert(dis + _error_msg.ERR_IN_NUM_RIGHT + " (Max: " + chkList.maxlength + "Byte)");
            } else {
              webUtil.showAlert(dis + _error_msg.ERR_IN_RIGHT + " (Max: " + chkList.maxlength + "Byte)");
            }
            if (!readOnly) gridName.setFocusedCell(row, col, true);
            return false;
          }
        }

        // 숫자타입이고 0은 허용안함
        if (chkList.numeric == 'y' && chkList.zero == 'n' && parseInt(value, 10) == 0) {
          webUtil.showAlert(dis + _error_msg.ERR_IN_UP_ZERO);
          if (!readOnly) gridName.setFocusedCell(row, col, true);
          return false;
        }
        // 숫자타입이고 소숫점이하 자리수 초과
        if (chkList.numeric == 'y' && chkList.digit > 0 && period > -1) {
          numVal = value.substring(period + 1, value.length);
          if (chkList.other.indexOf(".") == -1) chkList.other += ".";
          if (numVal.length > chkList.digit) {
            webUtil.showAlert(dis + comUtil.getDynamicMessage(_error_msg.ERR_IN_DIGIT_LEN, chkList.digit));
            if (!readOnly) gridName.setFocusedCell(row, col, true);
            return false;
          }
        }
        var errCheck = true;
        if (chkList.type == "DATE" && value.length > 0) {
          errCheck = comUtil.checkValidDate(value);
        } else if (chkList.type == "REG_NO" && value.length > 0) {
          errCheck = comUtil.regCheck(value);
        } else if (chkList.type == "EMAIL" && value.length > 0) {
          errCheck = comUtil.checkMail(value);
        }
        if (!errCheck) {
          webUtil.showAlert(dis + _error_msg.ERR_IN_RIGHT);
          if (!readOnly) gridName.setFocusedCell(row, col, true);
          return false;
        }
        var validFormat = "";
        if (chkList.alphabet == 'y') {
          validFormat += "alphabet;upper;lower;";
        } else {
          if (chkList.upper == 'y') validFormat += 'upper;';
          if (chkList.lower == 'y') validFormat += 'lower;';
        }
        if (chkList.numeric == 'y') validFormat += 'numeric;';
        if (chkList.hangul == 'y') validFormat += 'hangul;';
        if (chkList.other.length > 0) validFormat += 'other=' + chkList.other + ';';
        if (validFormat.length > 0 && value.length > 0) {
          var errMsg = comUtil.checkValidForInput(validFormat, value, dis);
          if (errMsg != "OK") {
            webUtil.showAlert(errMsg);
            if (!readOnly) gridName.setFocusedCell(row, col, true);
            return false;
          }
        }
      }
    }
  }
  return true;
};

/**
 * [내부함수] 그리드 높이 조절
 * @memberOf webUtil
 * @param N/A
 * @return  N/A
 */
webUtil._initPage = function (grdId) {
  var h_screen = document.body.clientHeight;
  var grid_edge_hi = $p.$('#' + grdId).offset().top;
  var grid_edge_fix = h_screen - grid_edge_hi - 50;
  $p.$('#' + grdId).css("height", grid_edge_fix);
};

/**
 * 브라우져의 높이가 변경될때마다 그리드의 높이를 브라우져의 높이에 맞게 조절
 * @memberOf webUtil
 * @param {String:Y} grdId 그리드ID
 * @return  N/A
 * @example
 *     scwin.onpageload = function () {
 *         webUti.initGridPage("gridView1");
 *     };
 */
webUtil.initGridPage = function (grdId) {
  // xml이 로딩될때 그리드의 height가 먼저 적용되기에 setTimeout 으로 조정 
  setTimeout(function () {
    webUti.initPage(grdId);
  }, "50");
  window.resize = function () {
    webUtil._initPage(grdId);
  };
};

/**
 * 그리드의 날짜를 format된 형식으로 셋팅한다.
 * @memberOf webUtil
 * @param {Object:Y} gridInfo 그리드ID및 컬럼 정보
 * @param {Object:Y} recvData 서버에서 받은 데이터
 * @return  N/A
 * @example
 *   var gridInfo = {
 *       "gridList": [
 *       	  {"id": "gridView1", "column": ["col1"]}
 *       	, {"id": "gridView2", "column": ["col3", "col4"]}
 *       ]
 *   };
 *   webUtil.setGridDateTime(gridInfo, e.responseJSON.body.inqAuthUser);
 */
webUtil.setGridDateTime = function (gridInfo, recvData) {
  //var format = gridInfo.format;
  var format = JSON.parse(sessionStorage.userInfo).dateFormat || "yyyy-MM-dd";
  for (var i = 0; i < gridInfo.gridList.length; i++) {
    var objGrid = typeof gridInfo.gridList[i].id == "string" ? $p.getComponentById(gridInfo.gridList[i].id) : gridInfo.gridList[i].id;
    if (objGrid) {
      var dataList = objGrid.dataList;
      //"regDt": "2022-08-12T10:14:26",
      for (var row = 0; row < recvData.length; row++) {
        var regDt = comUtil.getNumberOnly(recvData[row].regDt);
        var year = regDt.substring(0, 4);
        var month = regDt.substring(4, 6);
        var day = regDt.substring(6, 8);
        var hour = "";
        var minute = "";
        var second = "";
        if (regDt.length > 8) {
          hour = regDt.substring(8, 10);
        }
        if (regDt.length > 10) {
          minute = regDt.substring(10, 12);
        }
        if (regDt.length > 12) {
          second = regDt.substring(12, 14);
        }
        for (var col = 0; col < gridInfo.gridList[i].column.length; col++) {
          var date;
          if (format == "YYYY-MM-DD") {
            date = year + "-" + month + "-" + day;
          } else if (format == "MM-DD-YYYY") {
            date = month + "-" + day + "-" + year;
          } else if (format == "DD-MM-YYYY") {
            date = day + "-" + month + "-" + year;
          } else {
            date = year + "-" + month + "-" + day;
          }
          dataList.insertRow(); // 차후 필요없음
          dataList.setCellData(row, gridInfo.gridList[i].column[col], date);
        }
      }
      dataList.modifyAllStatus("R");
    } else {
      console.log("### grid not found: " + gridInfo.gridList[i].id);
    }
  }
};

/*
 * MRJ : namespace: com 
 */

/**
 * 로그인 & 로그아웃
 * @memberOf webUtil
 * @param {String:Y} type  로그인/로그아웃 구분
 */
webUtil.loginOut = function (type) {
  gcom.loginInfo = {};
  $p.ajax({
    "action": type == "LOGIN" ? "/test/login.do" : "/test/logout.do",
    "mode": "asynchronous",
    "mediatype": "application/json",
    "method": "post",
    "processMsg": _error_msg.COM_PROC_ING,
    "success": function (e) {
      var rcvData = e.responseJSON;
      if (type == "LOGIN") {
        if (rcvData.sessionInfo.userId != null) {
          gcom.loginInfo = rcvData.sessionInfo;
        } else {
          alert(_error_msg.ERR_LOGIN_FAIL);
        }
      } else {
        alert(_error_msg.COM_LOGOUT);
      }
    },
    error: function (e) {
      alert(_error_msg.ERR_OCCUR);
    }
  });
};

/**
 * 서버와 통신 함수, 세션이 있을때 통신을 한다
 * @memberOf webUtil
 * @param {Object:Y} submission option
 * @param {String:N} 콜백함수에 넘길 파라메터
 * @example
 *     var option = {
 *          id: "submitSearchList"
 *        , ref: 'data:json, { id: "dma_SearchProd", key: "dma_SearchProd", action: "modified" }'  // 변경된 데이터만 보냄 (생략시 all)
 *        , target: 'data:json, { id: "dlt_ProdList", key: "deptList" }'
 *        , action: "/com/help/board/selectBoardList.action"
 *        , userCallBack: "scwin.reqProdCallback"
 *     };
 *     webUtil.callSubmitJson(option, "SELECT");
 */
webUtil.callSubmitJson = function (opt, param) {
  var checkSession = typeof opt.checkSession != "undefined" && opt.checkSession == false ? false : true;

  /*
      if (checkSession) {
          gcom.userSession = {};
  
          $p.ajax({
                action: "/test/getSession.do"
              , mode : opt.mode || "asynchronous"
              , mediatype : "application/json"
              , method: "post"
              , processMsg : _error_msg.COM_PROC_ING
              , success : function(e) {
                  var rcvData = e.responseJSON;
  
                  if (rcvData.sessionInfo.userId != null) {
                      gcom.userSession.sessionInfo = rcvData.sessionInfo;
                      webUtil._callSubmitJson(opt, param);
                  } else {
                      webUtil.errorMessagePopup(_error_msg.ERR_NO_SESSION);
                  }
              }
              , error : function(e) {
                  alert(_error_msg.ERR_OCCUR);
              }
          });
      } else {
          webUtil._callSubmitJson(opt, param);
      }
  */
  webUtil._callSubmitJson(opt, param);
};

/**
 * [내부함수] 서버와 통신 함수
 * @memberOf webUtil
 * @param {Object:Y} opt submission option
 * @param {String:N} param 콜백함수에 넘길 파라메터
 */
webUtil._callSubmitJson = function (opt, param) {
  var callBack = opt.userCallBack || opt.submitDoneHandler || "";
  var codeCallBack = opt.codeCallBack || "";
  // 로딩바 메시지 보이기 / 감추기
  var msgView = typeof opt.msgView != "undefined" && opt.msgView == false ? false : true;
  // 에러팝업 띄우기
  var errPopup = typeof opt.errPopup != "undefined" && opt.errPopup == false ? false : true;
  var action = opt.action;

  //    if (action.indexOf("/ui/sample") == -1) {
  //    	action = "/portal/action/" + opt.action;
  //    }

  var subObj = {
    "id": opt.id || "submitTempSearchList",
    "ref": opt.ref || "",
    "target": opt.target || "",
    "method": opt.method || "post",
    "mediatype": opt.mediatype || "application/json",
    "encoding": "UTF-8",
    "mode": opt.mode || "asynchronous",
    "processMsg": msgView ? opt.processMsg || _error_msg.COM_PROC_ING : " ",
    "action": action,
    "submitHandler": function (e) {},
    "submitDoneHandler": function (e) {
      var type;
      var data = e.responseJSON;
      if (opt.mediatype == "text/plain" || opt.mediatype == "text/html") {
        type = "SUCCESS";
      } else {
        if (typeof data.header == "undefined") {
          type = "ERROR";
        } else {
          type = data.header.type;
        }
      }
      var delSubmit = $p.getSubmission(this.id);
      if (delSubmit) {
        $p.deleteSubmission(this.id);
      }

      //e.responseJSON.submissionID = this.id;
      if (type == "SUCCESS") {
        if (codeCallBack.length > 0) {
          eval(codeCallBack)(e, param, callBack);
        } else if (callBack.length > 0) {
          if (typeof callBack == "string") {
            eval($p.id + callBack)(e, param);
          } else if (typeof callBack == "function") {
            callBack(e, param);
          } else {
            console.log("### callback 함수 없음: " + typeof callBack);
          }
        }
        //if (typeof $p.top().scwin.initLoginTime == "function") {
        //	$p.top().scwin.initLoginTime();
        //}
      } else {
        $p.log("=============== ERROR ===============");
        $p.log(JSON.stringify(e.responseJSON));
        $p.log("=====================================");
        if (errPopup) {
          var pop = WebSquare.util.getPopup($p.top().$p.id + "errorMsgPopup");
          $p.log("popup ===========> " + $p.top().$p.id + "errorMsgPopup" + " ==> " + typeof pop);
          if (!pop) {
            $p.top().webUtil.errorMessagePopup(data.header.message);
          }
        } else {
          if (typeof callBack == "string") {
            eval($p.id + callBack)(e, param);
          } else if (typeof callBack == "function") {
            callBack(e, param);
          } else {
            console.log("### callback 함수 없음: " + typeof callBack);
          }
        }
      }
    },
    "submitErrorHandler": function (er) {
      $p.deleteSubmission(this.id);
      webUtil._submitError(er);
    }
  };
  subObj.processMsg = opt.msgView == undefined || opt.msgView ? opt.processMsg || _error_msg.COM_PROC_ING : opt.msgView;
  var submissionObj = $p.getSubmission(subObj.id);
  if (submissionObj) {
    $p.deleteSubmission(subObj.id);
  }
  /*
      $p.createSubmission(subObj);
      submissionObj = $p.getSubmission(subObj.id);
  */
  $p.createSubmission(subObj);
  submissionObj = $p.getSubmission(subObj.id);
  if (typeof opt.reqData == "undefined") {
    $p.executeSubmission(submissionObj);
  } else {
    if (typeof opt.viewLog != "undefined" && (opt.viewLog == "true" || opt.viewLog == true)) {
      $p.log("##### submission reqData ==========>\n" + JSON.stringify(opt.reqData, null, 4));
    }
    //$p.executeSubmission(submissionObj, reqObj);
    $p.executeSubmission(submissionObj, opt.reqData);
  }
};

/**
 * [내부함수] 서버와 통신후 에러발생시의 함수
 * statusCode: 405, 500
 */
webUtil._submitError = function (er) {
  //alert("#### Error ==>\n" + JSON.stringify(er.responseJSON));
  var msg = er.responseBody;
  if (msg.indexOf("text/") >= 0) {
    msg = msg.replace("text/", "");
  }
  console.log(er);
  var pop = WebSquare.util.getPopup($p.top().$p.id + "errorMsgPopup");
  $p.log("popup ===========> " + $p.top().$p.id + "errorMsgPopup" + " ==> " + typeof pop);
  if (!pop) {
    $p.top().webUtil.errorMessagePopup(msg);
  }
};

/*
 * config.xml: callbackSubmitFunction 설정시
 */
webUtil._callbackSubmitFunction = function (resObj, sbmObj) {
  //console.log("### _callbackSubmitFunction : " + resObj.responseStatusCode);
};

/**
 * request header의 authorization 의 값을 셋팅 (config.xml에서 함수 호출)
 * @memberOf webUtil
 * @param {Object:Y}
 */
webUtil.requestHeaderFunction = function (reqObj) {
  /*
  	var key = "Authorization";
  	var token = "Bearer ";
  
  	if (typeof $p.top().dma_LoginInfo != "undefined") {
  		var json = $p.top().dma_LoginInfo;
  
  		gcom.authorization = json.get("accessToken");
  		//$p.log("########  gcom.authorization ==>\n" + gcom.authorization);
  		reqObj.setRequestHeader(key, token + gcom.authorization);
  	} else if ($p.isPopup()) {
  		if (typeof $p.parent().webUtil.authorization != "undefined") {  // 팝업
  			reqObj.setRequestHeader(key, token + $p.parent().gcom.authorization);
  			return;
  		}
  		if (typeof $p.top().webUtil.authorization != "undefined") {  // 팝업
  			reqObj.setRequestHeader(key, token + $p.top().gcom.authorization);
  		}
  	}
  */
};
webUtil.reloadPage = function () {
  if ($p.top().win_main.currentWindowNum > 0) {
    var menuId = $p.top().win_main.getSelectedWindowId();
    setTimeout(function (menuId) {
      var page = $p.top().win_main.getFrame(menuId);
      page.reload();
    }, 100, menuId);
  }
};

/**
 * key값에 해당하는 sessionStorage 정보를 JSON형태로 반환 
 * @memberOf webUtil
 * @param key 세션의key값
 * @param isDel 삭제여부 (default: true)
 * @return  key에 해당하는 값
 * @example
 *      webUtil.getSessionParameter("key", false);
 *      return ==> {"name": "hong"}, key에 해당하는 값은 삭제 안함
 */
webUtil.getSessionParameter = function (key, isDel) {
  try {
    var data = sessionStorage.getItem(key);
    if (typeof isDel == "undefined" || isDel === true) {
      sessionStorage.removeItem(key);
    }
    return JSON.parse(data);
  } catch (e) {
    $p.log("### " + key + " => data not found: " + e.message);
  }
  return null;
};

/**
 * key값에 해당하는 JSON형태의 data를 sessionStorage 에 저장한다. 
 * @memberOf webUtil
 * @param key key값
 * @param data JSON형태의 data
 * @return  N/A
 * @example
 *      webUtil.setSessionParameter("key", {"name": "hong"})
 */
webUtil.setSessionParameter = function (key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    $p.log("### setSessionParameter: " + e.message);
  }
};
webUtil.getLocalStorage = function (key, isDel) {
  try {
    var data = localStorage.getItem(key);
    if (typeof isDel == "undefined" || isDel === true) {
      localStorage.removeItem(key);
    }
    return JSON.parse(data);
  } catch (e) {
    $p.log("### " + key + " => data not found: " + e.message);
  }
  return null;
};

/**
 * key값에 해당하는 JSON형태의 data를 sessionStorage 에 저장한다. 
 * @memberOf webUtil
 * @param key key값
 * @param data JSON형태의 data
 * @return  N/A
 * @example
 *      webUtil.setLocalStorage("key", {"name": "hong"})
 */
webUtil.setLocalStorage = function (key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    $p.log("### setLocalStorage: " + e.message);
  }
};

/*
 * MRJ : namespace: ext
 */

webUtil.initPage = function () {};
webUtil.getWebSquareLangCode = function (langCode) {
  try {
    var localeCd = JSON.parse(sessionStorage.userInfo).localeCd;
    return localeCd || "en";
    // return WebSquare.cookie.getCookie("system_language");
  } catch (e) {
    console.error("[webUtil.getWebSquareLangCode] Exception :: " + e);
    return null;
  }
};
webUtil.setWebSquareLangCode = function (langCode, isInitLabel) {
  try {
    WebSquare.cookie.setCookie("system_language", langCode);
    // localStorage에 언어 코드 저장
    webUtil.getLocalStorage("langCode", langCode);
    // 웹스퀘어 기본 언어팩 변경
    $.getScript("/websquare/message/" + WebSquare.BootLoader.getRandomPostfix(langCode + ".js"), function () {
      // 사용자 언어팩 변경
      if (isInitLabel === true) {
        //_changeLangpack(gcm.CONTEXT_ROOT + "/cm/langpack/" + WebSquare.BootLoader.getRandomPostfix(langCode+".js"));
        // 사용자 언어팩 DB에서 조회
        webUtil.initLabel();
      }
    });
    function _changeLangpack(src, onloadFunc) {
      var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
        script = document.createElement("script");
      script.type = "text/javascript", script.charset = "UTF-8", script.src = src, script.onload = onloadFunc, script.onreadystatechange = function () {
        //IE용
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          onloadFunc();
        }
      }, head.appendChild(script), head = null;
    }
  } catch (e) {
    console.error("[webUtil.setWebSquareLangCode] Exception :: " + e);
  }
};
webUtil.initLabel = function () {
  try {
    // json array(gcm.labelList)를 웹스퀘어 langpack object(WebSquare.WebSquareLang)로 변환
    // 변환시 현재 언어 > en 순으로

    var curLang = webUtil.getWebSquareLangCode();
    WebSquare.WebSquareLang = {};
    for (var i = 0; i < gcom.labelList.length; i++) {
      var lang = gcom.labelList[i].uiWordLocaleCd || "en";
      var uiWordCd = gcom.labelList[i].uiWordCd;
      if (lang == curLang) {
        WebSquare.WebSquareLang[uiWordCd] = gcom.labelList[i].uiWordNm;
      } else if (WebSquare.WebSquareLang[uiWordCd] === undefined && lang == "en") {
        WebSquare.WebSquareLang[uiWordCd] = gcom.labelList[i].uiWordNm;
      }
    }
    WebSquareLang.CheckCombobox_all = webUtil.getWebSquareLangCode() == "ko" ? "[일괄선택]" : "[choose all]"; // CheckComboBox allOption=true시 사용
    WebSquareLang.CheckCombobox_allOption_label = WebSquareLang.CheckCombobox_all; // CheckComboBox displayAllOptionLabel=true시 사용
  } catch (e) {
    console.error("[webUtil.initLabel] Exception :: " + e);
  }
  // ko: ngff.fwm.closeOrdChk
  // en: ngff.com.wmsWebsocketError
  //alert(scwin.getMessage("ngff.com.wmsWebsocketError"));
};

webUtil.getMsg = function (msgId) {
  try {
    var arrFilterData = gcom.msgList.filter(function (data) {
      return data['sysMsgId'] == msgId;
    });
    var currentLocaleData = arrFilterData.filter(function (data) {
      return data['msgLocaleCd'] == webUtil.getWebSquareLangCode();
    })[0];
    if (currentLocaleData) {
      return currentLocaleData.msgCont;
    } else {
      var enLocaleData = arrFilterData.filter(function (data) {
        return data['msgLocaleCd'] == "en";
      })[0];
      return enLocaleData ? enLocaleData.msgCont : '';
    }
  } catch (e) {
    console.error("[webUtil.getMsg] Exception :: " + e);
    return false;
  }
};

/**
 * 공통 메시지에 코드에 해당하는 공통 메시지 코드를 반환
 *
 * @memberof webUtil
 * @date 2021.05.27
 * @param {String} sysMsgId 메시지 ID
 * @author Inswave Systems
 * @example
 * 		scwin.getMessage("E100"); // "사용자 정보가 존재하지 않습니다."
 */
webUtil.getMessage = function (msgId) {
  try {
    var message = "";
    if (webUtil.isNull(msgId) === false) {
      //			message = WebSquare.WebSquareLang[msgId];
      message = webUtil.getMsg(msgId);
    }
    if (webUtil.isNull(message) === false) {
      var tmpMessage = message;
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          tmpMessage = tmpMessage.indexOf("{" + (i - 1) + "}") != -1 ? webUtil.replaceAll(tmpMessage, "{" + (i - 1) + "}", arguments[i]) : tmpMessage;
          //tmpMessage = (tmpMessage.indexOf("{" + (i-1) + "}") != -1) ? tmpMessage.replaceAll("{" + (i-1) + "}", arguments[i]) : tmpMessage;
        }

        return tmpMessage;
      } else {
        return tmpMessage;
      }
    } else {
      return "";
    }
  } catch (e) {
    console.error("[webUtil.getMessage] Exception :: " + e);
    return "";
  }
};
webUtil.replaceAll = function (str, orgStr, repStr) {
  try {
    str = "" + str;
    return str.split(orgStr).join(repStr);
  } catch (e) {
    console.error("[webUtil.replaceAll] Exception :: " + e);
    return str;
  }
};

/**
 * 검색조건에 있는 공통 코드 조회
 *
 * @memberof webUtil
 * @param {String:Y} code 공통코드값
 * @param {String:N} callBack 콜백함수
 * @return  N/A
 * @example
 * 		webUtil.searchCommonCode("scwin.codeCallback");
 */
webUtil.searchCommonCode = function (code, callBack) {
  var optMap = {
    id: "dma_codeInfo",
    type: "dataMap",
    info: [{
      id: "dtlCd",
      name: "상세코드",
      dataType: "text"
    }, {
      id: "dtlCdNm",
      name: "상세코드명",
      dataType: "text"
    }]
  };
  webUtil.createDynamicDataList(optMap);
  var optList = {
    id: "dlt_comCode",
    type: "dataList",
    info: [{
      id: "clasCd",
      name: "그룹코드",
      dataType: "text"
    }, {
      id: "dtlCd",
      name: "상세코드",
      dataType: "text"
    }, {
      id: "dtlCdNm",
      name: "상세코드명",
      dataType: "text"
    }]
  };
  webUtil.createDynamicDataList(optList);
  dma_codeInfo.set("dtlCd", code);
  var option = {
    "id": "submitsearchCommonCode",
    "ref": 'data:json, { id: "dma_codeInfo", key: "queryData", action: "" }',
    "target": 'data:json, { id: "dlt_comCode", key: "body.inqCommCode" }',
    "action": "/portal/com/commCode/inqCommCode",
    "userCallBack": function (e, callBack) {
      if (typeof callBack != "undefined" && callBack != "") {
        if (typeof callBack == "string") {
          if (dlt_comCode.getTotalRow() == 1) {
            var json = {
              "code": dlt_comCode.getCellData(0, "dtlCd"),
              "name": dlt_comCode.getCellData(0, "dtlCdNm")
            };
            eval(callBack)(json);
          } else {
            webUtil.codeSearchPopup(code, callBack);
          }
        }
      }
    }
  };
  webUtil.callSubmitJson(option, callBack);
};

/**
 * 검색조건에 있는 공통 코드 조회 팝업
 * 데이터가 2건이상 존재하는 경우 또는 팝업버튼 클릭시 해당 팝업은 자동으로 호출
 *
 * @memberof webUtil
 * @param {String:Y} code 공통코드값
 * @param {String:N} callBack 콜백함수
 * @return  N/A
 * @example
 * 		webUtil.codeSearchPopup("", "scwin.codeCallback");
 */
webUtil.codeSearchPopup = function (codeVal, callBack) {
  var popParam = {
    type: "json",
    name: "popInfo",
    data: {
      "detail": {
        "key": "",
        "allCode": []
      }
    }
  };
  if (!comUtil.isNull(codeVal)) {
    popParam.data.detail.key = codeVal;
    popParam.data.detail.allCode = dlt_comCode.getAllJSON();
  }
  var obj = {
    id: "codeSearchPopup",
    title: "공통코드 조회 popup",
    url: "/ui/sample/popup/code_popup.xml",
    width: 800,
    height: 550,
    popupParam: popParam
  };
  webUtil.openCommonPopup(obj, function (param) {
    if (typeof param != "undefined" && param != "") {
      var json = JSON.parse(param);
      var ret = {
        "code": json.dtlCd,
        "name": json.dtlCdNm
      };
      eval(callBack)(ret);
    }
  });
};

// 개인화
webUtil.getGridColumnList = function (columnInfo) {
  var gridList = [];
  webUtil.columnInfo = columnInfo;
  for (var i = 0; i < webUtil.columnInfo.gridInfo.length; i++) {
    gridList.push(webUtil.columnInfo.gridInfo[i].id);
  }
  dma_search.set("userId", webUtil.columnInfo.userId);
  dma_search.set("menuId", webUtil.columnInfo.menuId);
  dma_search.set("gridId", gridList);
  var colOpt = {
    id: "submitSearchGridInfo",
    ref: 'data:json,{"id":"dma_search", "key":"dma_search"}',
    target: 'data:json,{"id":"dlt_gridColListDB", "key":"body.inqGridPrsnltUI"}'
    //, action: "/ui/sample/data/dlt_gridColListDB.json"
    ,
    action: "/portal/com/prsnlt/inqGridPrsnltUI",
    submitDoneHandler: function (e, param) {
      webUtil.getGridColumnListCallback(e);
    }
  };
  webUtil.callSubmitJson(colOpt);
};
webUtil.getGridColumnListCallback = function (e) {
  //console.log("### webUtil.getGridColumnList ===>\n" + JSON.stringify(e.responseJSON,null,2));
  var gridList = webUtil.columnInfo.gridInfo;
  for (var g = 0, r = 0; g < gridList.length; g++) {
    // dataList = objGrid.dataList;
    var grdObj = $p.getComponentById(gridList[g].id);
    if (grdObj) {
      // DB에 데이터가 있는지 검사
      var dbData = dlt_gridColListDB.getTotalRow() > 0 ? true : false;
      webUtil.copyDataList("dlt_gridColListDB", "dlt_gridColListDB_" + gridList[g].id);
      var dataObj = $p.getComponentById("dlt_gridColListDB_" + gridList[g].id);
      lnkColList.setCondition("filter", "defaultCol == 'Y' && gridId == '" + gridList[g].id + "'");
      dataObj.setJSON(lnkColList.getAllJSON());

      // DB에는 있지만 그리드에 없는 컬럼은 삭제
      var colList = grdObj.getColumnOrder(true); // 그리드의 컬럼을 모두 가져옴
      for (var i = dataObj.getTotalRow() - 1; i > 0; i--) {
        var colId = dataObj.getCellData(i, "colId");
        var isFind = false;
        for (var j = 0; j < colList.length; j++) {
          if (colId == colList[j]) {
            isFind = true;
            break;
          }
        }
        if (!isFind) {
          dataObj.removeRow(i);
          var delList = dlt_gridColListDB.getMatchedIndex("colId", colId, true);
          for (var j = delList.length - 1; j > 0; j--) {
            // grid ID가 동일하고 컬럼이름이 같은데이터 삭제
            if (gridList[g].id == dlt_gridColListDB.getCellData(delList[j], "gridId")) {
              dlt_gridColListDB.removeRow(delList[j]);
            }
          }
        }
      }
      var colList = grdObj.getColumnOrder(true); // 그리드의 컬럼을 모두 가져옴
      if (dbData) {
        // DB에 데이터가 있을때
        for (var i = 0; i < dataObj.getTotalRow(); i++) {
          var colId = dataObj.getCellData(i, "colId");
          var info = {};
          info.userId = webUtil.columnInfo.userId;
          info.menuId = webUtil.columnInfo.menuId;
          info.gridId = gridList[g].id;
          info.colId = colId;
          info.headId = grdObj.bodyToHeaderRelation[info.colId];
          info.colNm = grdObj.getHeaderValue(info.headId);
          info.hideYn = grdObj.getColumnVisible(grdObj.getColumnIndex(info.colId)) == true ? "N" : "Y";
          info.parentHeader = grdObj.headerInfoHash[info.headId]["options"]["parentHeader"] || "";
          info.parentHeaderValue = grdObj.getHeaderValue(info.parentHeader);
          info.no = "" + (i + 1);
          var res = webUtil.getSameColumnId(colId, gridList[g].id, dataObj);
          if (res.length == 1) {
            info.gridSeq = res[0].gridSeq;
            info.defaultCol = res[0].defaultCol;
            info.setNm = res[0].setNm;
            info.devYn = res[0].devYn;
            info.hideYn = res[0].hideYn;
            if (info.devYn == "Y") info.hideYn = "Y";
            dataObj.setRowJSON(i, info, true);
          } else {
            info.gridSeq = "1";
            info.defaultCol = "Y";
            info.setNm = "";
            info.devYn = info.hideYn;
            dataObj.setRowJSON(i, info, false);
          }
          //webUtil.columnInfo.gridInfo[r].colList.push(info);
        }

        // DB에 데이터 저장이후 개발자가 그리드에 컬럼을 추가했을때
        var gridSeq, defaultCol, setNm;
        for (var k = 0; k < colList.length; k++) {
          var addCol = dataObj.getMatchedJSON("colId", colList[k], true);
          if (addCol.length == 1) {
            gridSeq = addCol[0].gridSeq;
            defaultCol = addCol[0].defaultCol;
            setNm = addCol[0].setNm;
            break;
          }
        }
        for (var k = 0; k < colList.length; k++) {
          var addCol = dataObj.getMatchedIndex("colId", colList[k], true);
          var gridSeq, defaultCol, setNm;
          if (addCol.length == 0) {
            // 찾지 못하면 추가 된것임
            var info = {};
            info.userId = webUtil.columnInfo.userId;
            info.menuId = webUtil.columnInfo.menuId;
            info.gridId = gridList[g].id;
            info.colId = colList[k];
            info.headId = grdObj.bodyToHeaderRelation[info.colId];
            info.colNm = grdObj.getHeaderValue(info.headId);
            info.hideYn = grdObj.getColumnVisible(grdObj.getColumnIndex(info.colId)) == true ? "N" : "Y";
            info.parentHeader = grdObj.headerInfoHash[info.headId]["options"]["parentHeader"] || "";
            info.parentHeaderValue = grdObj.getHeaderValue(info.parentHeader);
            info.no = "" + (k + 1);
            info.gridSeq = gridSeq;
            info.defaultCol = defaultCol;
            info.setNm = setNm;
            info.devYn = info.hideYn;
            dataObj.setRowJSON(k, info, false);
          }
        }
        webUtil.columnInfo.gridInfo[r].colList = dataObj.getAllJSON();
      } else {
        for (var i = 0; i < colList.length; i++) {
          var info = {};
          info.userId = webUtil.columnInfo.userId;
          info.menuId = webUtil.columnInfo.menuId;
          info.gridId = gridList[g].id;
          info.colId = colList[i];
          info.headId = grdObj.bodyToHeaderRelation[colList[i]];
          info.colNm = grdObj.getHeaderValue(info.headId);
          info.hideYn = grdObj.getColumnVisible(grdObj.getColumnIndex(colList[i])) == true ? "N" : "Y";
          info.parentHeader = grdObj.headerInfoHash[info.headId]["options"]["parentHeader"] || "";
          info.parentHeaderValue = grdObj.getHeaderValue(info.parentHeader);
          info.no = "" + (i + 1);
          var res = webUtil.getSameColumnId(colList[i], gridList[g].id, dataObj);
          if (res.length == 1) {
            info.gridSeq = res[0].gridSeq;
            info.defaultCol = res[0].defaultCol;
            info.setNm = res[0].setNm;
            info.devYn = res[0].devYn;
            info.hideYn = res[0].hideYn;
            if (info.devYn == "Y") info.hideYn = "Y";
            dataObj.setRowJSON(i, info, true);
          } else {
            info.gridSeq = "1";
            info.defaultCol = "Y";
            info.setNm = "";
            info.devYn = info.hideYn;
            dataObj.setRowJSON(i, info, false);
          }
        }
        webUtil.columnInfo.gridInfo[r].colList = dataObj.getAllJSON();
      }
      webUtil.redrawGridColumn(webUtil.columnInfo.gridInfo[r]);
      //console.log(webUtil.columnInfo.gridInfo);
      r++;
    }
  }
};

// dataList에서 컬럼ID 찾기
webUtil.getSameColumnId = function (colId, gridId, dataList) {
  var res = dataList.getMatchedJSON("colId", colId, true);
  if (res.length > 1) {
    // 그리드는 서로 다르나 동일한 컬럼이 있을때
    var tmpRes = [];
    for (var j = 0; j < res.length; j++) {
      if (gridId == res[j].gridId) {
        tmpRes = [res[j]]; // array로 변경
        break;
      }
    }
    if (tmpRes.length == 1) {
      res = [];
      res = tmpRes;
    }
  }
  return res;
};

// 그리드 컬럼을 셋팅한 값에 따라 순서 및 숨김여부 처리
webUtil.redrawGridColumn = function (gridInfo) {
  if (!webUtil.isNull(gridInfo)) {
    var grdObj = $p.getComponentById(gridInfo.id);
    var grdIndex = -1;
    //console.log(gridInfo);

    for (var i = 0; i < webUtil.columnInfo.gridInfo.length; i++) {
      if (gridInfo.id == webUtil.columnInfo.gridInfo[i].id) {
        grdIndex = i;
        break;
      }
    }
    if (grdObj) {
      var viewColList = [];
      var ordColList = [];
      for (var i = 0; i < gridInfo.colList.length; i++) {
        viewColList.push(gridInfo.colList[i].colId);
        ordColList.push(gridInfo.colList[i].colId);
      }
      viewColList.join(",");
      ordColList.join(",");
      // setColumnOrder를 실행시키면  ordColList값이 index(숫자)로 변해서 viewColList, ordColList를 사용
      grdObj.setColumnOrder(ordColList);
      var dataObj = $p.getComponentById("dlt_gridColListDB_" + gridInfo.id);
      if (gridInfo.isDB == "N") {
        // 팝업에서 변경시 그리드에도 반영
        dataObj.setJSON(gridInfo.colList);
        if (gridInfo.isNew == "Y") {
          // 팝업에서 설정명 추가시
          dlt_gridColListDB.setJSON(gridInfo.colList, true);
        }
        var idx = dlt_gridColListDB.getMatchedIndex("gridSeq", gridInfo.colList[0].gridSeq, true);
        for (var i = 0; i < gridInfo.colList.length; i++) {
          webUtil.columnInfo.gridInfo[grdIndex].colList[i] = gridInfo.colList[i];
          if (gridInfo.isNew != "Y") {
            dlt_gridColListDB.setRowJSON(idx[i], gridInfo.colList[i], true);
          }
        }
      }
      for (var i = 0; i < viewColList.length; i++) {
        var res = [];
        if (gridInfo.isDB == "Y") {
          // DB에서 read시
          res = webUtil.getSameColumnId(viewColList[i], gridInfo.id, dataObj);
          if (res.length == 0) {
            alert("error: 여기오면 안됨");
            return;
          }
        } else {
          // 팝업에서 받기
          for (var j = 0; j < gridInfo.colList.length; j++) {
            if (viewColList[i] == gridInfo.colList[j].colId) {
              res = [gridInfo.colList[j]];
              break;
            }
          }
        }
        if (res.length == 1) {
          if (res[0].devYn == "Y" || res[0].hideYn == "Y") {
            grdObj.setColumnVisible(viewColList[i], false);
          } else {
            grdObj.setColumnVisible(viewColList[i], true);
          }
        } else {
          console.log("### webUtil.redrawGridColumn => [" + viewColList[i] + "] not found");
        }
      }
    } else {
      console.log("### webUtil.redrawGridColumn => [" + gridInfo.id + "] not found");
    }
  }
};
webUtil.setColumn = function (gridId, callBack) {
  var allData = dlt_gridColListDB.getMatchedJSON("gridId", gridId, true);
  var scrInfo = {
    "menuId": webUtil.columnInfo.menuId,
    "menuNm": webUtil.columnInfo.menuNm,
    "allColumn": allData // 차수에 관계없는 모든 데이터
  };

  var dataObj = $p.getComponentById("dlt_gridColListDB_" + gridId);
  var columnInfo = dataObj.getAllJSON();
  for (var i = 0; i < webUtil.columnInfo.gridInfo.length; i++) {
    if (gridId == webUtil.columnInfo.gridInfo[i].id) {
      //columnInfo = webUtil.columnInfo.gridInfo[i];
      break;
    }
  }
  //console.log("##### popup으로 ============>\n ", columnInfo);

  scrInfo.columnInfo = columnInfo;
  var popParam = {
    type: "json",
    data: {
      "scrInfo": scrInfo,
      "userCallBack": "webUtil.setGridColumnCallback" //callBack
    },

    name: "popInfo"
  };
  var obj = {
    id: "setGridColumnOrder",
    type: "browserPopup",
    title: "그리드컬럼설정",
    url: "/ui/sample/gridView/grid_private_popup.xml",
    width: 1600,
    height: 710,
    popupParam: popParam
  };
  webUtil.openCommonPopup(obj);
};
webUtil.setGridColumnCallback = function (param) {
  if (typeof param != "undefined") {
    var json = JSON.parse(param);
    if (json.isSave == "Y") {
      webUtil.getGridColumnList();
    } else {
      webUtil.redrawGridColumn(json);
    }
  }
};
// ================ CHOI ==================================
// webUtil.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
webUtil.ga_pageView = function (href, menuInfo) {
  if (!localStorage.getItem('cookie_agree')) return;
  if (!(typeof menuInfo === 'string' || typeof menuInfo === 'object')) return;
  menuInfo = typeof menuInfo === 'string' ? JSON.parse(menuInfo) : menuInfo;
  if (!menuInfo.hasOwnProperty("menuNm") && !menuInfo.hasOwnProperty("pgmUrl")) return;
  gtag('event', 'page_view', {
    page_title: menuInfo.menuNm,
    page_location: href,
    page_path: menuInfo.pgmUrl,
    send_to: ga_tag
  });
};
webUtil.userInfo = function () {
  return JSON.parse(sessionStorage.getItem("userInfo"));
};
webUtil.stringDateCheck = function (dateStr) {
  const validFormats = ["YYYY/MM/DD", "YYYY-MM-DD"];
  return moment(dateStr, validFormats, true).isValid();
};
webUtil.fullwidthToastMsg = function (msgType, msg) {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  const typeValid = msgType === "error" || msgType === "info" || msgType === "success" || msgType === "warning";
  if (typeValid) toastr[msgType](msg);
};
webUtil.toastMsg = function (msgType, msg) {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  const typeValid = msgType === "error" || msgType === "info" || msgType === "success" || msgType === "warning";
  if (typeValid) toastr[msgType](msg);
};
webUtil.isEmpty = function (input) {
  if (typeof input === "object") {
    return Object.getOwnPropertyNames(input).length === 0;
  } else {
    return input === "undefined" || input === "null" || input === "";
  }
};

/**
 * 파일업로드 팝업 호출
 *
 * @param {callback} 파일업로드 호출후 콜백 함수
 * @example
 webUtil.fileUploadPopup(options);
 */
webUtil.fileUploadPopup = function (data, callback) {
  var popParam = {
    type: "json",
    name: "popInfo",
    data: {
      params: data
    } // data
  };

  var obj = {
    id: "file_upload_popup",
    title: "File Upload",
    url: "/cm/xml/fileUploadPopup.xml",
    width: 550,
    height: 600,
    popupParam: popParam
  };
  webUtil.openCommonPopup(obj, callback);
};
webUtil.excelDownload = function (url, dataMap) {
  var frame = $p.getFrame();
  if (!$p.getComponentById("excelIframe")) {
    $p.dynamicCreate("excelIframe", "iframe", {
      "style": "width:0; height:0; display:none",
      "spa": "true"
    }, frame);
  }
  excelIframe.setSrc(url + "?" + $.param(dataMap.getJSON()));
};
webUtil.isModified = function (dcObjArr) {
  try {
    var result = false;
    if (webUtil.getObjectType(dcObjArr) === "array") {
      for (var idx of dcObjArr) {
        if (webUtil.getObjectType(idx) === "object") {
          if (isModified(idx) === true) {
            result = true;
          }
        }
      }
    } else if (webUtil.getObjectType(dcObjArr) === "object") {
      result = isModified(dcObjArr);
    }
    return result;
    function isModified(dcObj) {
      if (typeof dcObj !== "undefined" && typeof dcObj !== null) {
        var modifiedIndex = dcObj.getModifiedIndex();
        if (modifiedIndex.length === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  } catch (e) {
    console.error("[webUtil.isModified] Exception :: " + e);
    return null;
  }
};
webUtil.getObjectType = function (obj) {
  try {
    var objType = typeof obj;
    if (objType !== "object") {
      return objType;
    } else if (webUtil.isArray(obj)) {
      return "array";
    } else if (webUtil.isJSON(obj)) {
      return "json";
    } else if (obj === null) {
      return "null";
    } else {
      var tmpDoc = WebSquare.xml.parse("<data></data>");
      if (obj.constructor === tmpDoc.constructor || obj.constructor === tmpDoc.childNodes[0].constructor) {
        return "xml";
      } else {
        return objType;
      }
    }
  } catch (e) {
    console.error("[webUtil.getObjectType] Exception :: " + e);
    return null;
  }
};
webUtil.isJSON = function (json) {
  try {
    if (jQuery.isPlainObject(json) === false && webUtil.isArray(json) === false) {
      return false;
    }
    if (typeof json === "object") {
      try {
        JSON.stringify(json);
        return true;
      } catch (ex) {
        return false;
      }
    } else if (typeof json === "string") {
      try {
        JSON.parse(json);
        return true;
      } catch (ex) {
        return false;
      }
    }
    return false;
  } catch (e) {
    console.error("webUtil.isJSON[] Exception :: " + e);
    return false;
  }
};
webUtil.isArray = function (array) {
  try {
    if (typeof array !== "undefined" && array !== null && typeof array == "object") {
      if (array.constructor.name && array.constructor.name.toLowerCase() == "array") return true;
      if (array.constructor && array.constructor == Array) return true;
    }
    return false;
  } catch (e) {
    console.error("[webUtil.isArray] Exception :: " + e);
    return false;
  }
};
webUtil.preFormatter = function (input, domain) {
  var _webUtil$userInfo;
  if (!domain || !['YMD', 'YMD_HMS', 'YMD_HM'].includes(domain)) return input;
  if (typeof input !== "string" || input.length < 8 || !/^\d+$/.test(input)) return input;
  const dtFrmt = (((_webUtil$userInfo = webUtil.userInfo()) === null || _webUtil$userInfo === void 0 ? void 0 : _webUtil$userInfo.dtFrmt) || 'YYYY-MM-DD').replaceAll("-", "");
  let inputFormat,
    outputFormat,
    len = input.length;
  if (domain === 'YMD' && len === 8) {
    inputFormat = `${dtFrmt}`;
    outputFormat = 'YYYYMMDD';
  } else if (domain === 'YMD_HMS' && len === 14) {
    inputFormat = `${dtFrmt}HHmmss`;
    outputFormat = 'YYYYMMDDHHmmss';
  } else if (domain === 'YMD_HM' && len === 12) {
    inputFormat = `${dtFrmt}HHmm`;
    outputFormat = 'YYYYMMDDHHmm';
  }
  const mmt = moment(input, inputFormat);
  return mmt.isValid() ? mmt.format(outputFormat) : input;
};
webUtil.postFormatter = function (input, domain) {
  var _webUtil$userInfo2;
  if (!domain || !['YMD', 'YMD_HMS', 'YMD_HM'].includes(domain)) return input;
  if (typeof input !== "string" || input.length < 8 || !/^\d+$/.test(input)) return input;
  const dtFrmt = (((_webUtil$userInfo2 = webUtil.userInfo()) === null || _webUtil$userInfo2 === void 0 ? void 0 : _webUtil$userInfo2.dtFrmt) || 'YYYY-MM-DD').replaceAll("-", "");
  let inputFormat,
    outputFormat,
    len = input.length;
  if (domain === 'YMD' && len === 8) {
    inputFormat = `YYYYMMDD`;
    outputFormat = `${dtFrmt}`;
  } else if (domain === 'YMD_HMS' && len === 14) {
    inputFormat = 'YYYYMMDDHHmmss';
    outputFormat = `${dtFrmt}HHmmss`;
  } else if (domain === 'YMD_HM' && len === 12) {
    inputFormat = 'YYYYMMDDHHmm';
    outputFormat = `${dtFrmt}HHmm`;
  }
  const mmt = moment(input, inputFormat);
  return mmt.isValid() ? mmt.format(outputFormat) : input;
};
webUtil.dateDisplayFormatter_YM = function (input) {
  if (typeof input !== "string" || input.length !== 6 || !/^\d+$/.test(input)) return input;
  return `${input.substring(0, 4)}-${input.substring(4, 6)}`;
};
webUtil.dateDisplayFormatter_YMD = function (input) {
  var _webUtil$userInfo3;
  if (typeof input !== "string" || input.length !== 8 || !/^\d+$/.test(input)) return input;
  const d_tFrmt = ((_webUtil$userInfo3 = webUtil.userInfo()) === null || _webUtil$userInfo3 === void 0 ? void 0 : _webUtil$userInfo3.dtFrmt) || 'YYYY-MM-DD';
  const dtFrmt = d_tFrmt.replaceAll("-", "");
  const mmt = moment(input, dtFrmt);
  return mmt.isValid() ? mmt.format(d_tFrmt) : input;
};
webUtil.dateDisplayFormatter_YMDHMS = function (input) {
  var _webUtil$userInfo4;
  if (typeof input !== "string" || input.length !== 14 || !/^\d+$/.test(input)) return input;
  const d_tFrmt = ((_webUtil$userInfo4 = webUtil.userInfo()) === null || _webUtil$userInfo4 === void 0 ? void 0 : _webUtil$userInfo4.dtFrmt) || 'YYYY-MM-DD';
  const dtFrmt = d_tFrmt.replaceAll("-", "");
  const mmt = moment(input, `${dtFrmt}HHmmss`);
  return mmt.isValid() ? mmt.format(`${d_tFrmt} HH:mm:ss`) : input;
};
webUtil.dateDisplayFormatter_YMDHM = function (input) {
  var _webUtil$userInfo5;
  if (typeof input !== "string" || input.length !== 12 || !/^\d+$/.test(input)) return input;
  const d_tFrmt = ((_webUtil$userInfo5 = webUtil.userInfo()) === null || _webUtil$userInfo5 === void 0 ? void 0 : _webUtil$userInfo5.dtFrmt) || 'YYYY-MM-DD';
  const dtFrmt = d_tFrmt.replaceAll("-", "");
  const mmt = moment(input, `${dtFrmt}HHmm`);
  return mmt.isValid() ? mmt.format(`${d_tFrmt} HH:mm`) : input;
};
webUtil.dateDisplayFormatter_DT = function (input) {
  var _webUtil$userInfo6;
  if (typeof input !== "string" || input.length !== 19) return input;
  if (!/^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/.test(input)) return input;
  const d_tFrmt = ((_webUtil$userInfo6 = webUtil.userInfo()) === null || _webUtil$userInfo6 === void 0 ? void 0 : _webUtil$userInfo6.dtFrmt) || 'YYYY-MM-DD';
  const mmt = moment(input, `YYYY-MM-DD HH:mm:ss`);
  return mmt.isValid() ? mmt.format(`${d_tFrmt} HH:mm:ss`) : input;
};
webUtil.placeHolder_YMD = function () {
  var _webUtil$userInfo7;
  return (((_webUtil$userInfo7 = webUtil.userInfo()) === null || _webUtil$userInfo7 === void 0 ? void 0 : _webUtil$userInfo7.dtFrmt) || 'YYYY-MM-DD').replaceAll("-", "");
};
webUtil.placeHolder_YMDHMS = function () {
  var _webUtil$userInfo8;
  const dtFrmt = (((_webUtil$userInfo8 = webUtil.userInfo()) === null || _webUtil$userInfo8 === void 0 ? void 0 : _webUtil$userInfo8.dtFrmt) || 'YYYY-MM-DD').replaceAll("-", "");
  return `${dtFrmt}HHmmss`;
};
webUtil.placeHolder_YMDHM = function () {
  var _webUtil$userInfo9;
  const dtFrmt = (((_webUtil$userInfo9 = webUtil.userInfo()) === null || _webUtil$userInfo9 === void 0 ? void 0 : _webUtil$userInfo9.dtFrmt) || 'YYYY-MM-DD').replaceAll("-", "");
  return `${dtFrmt}HHmm`;
};
webUtil.setGridColumnPlaceHolder = function (gridObj, columnId, placeholder_value) {
  if (typeof gridObj !== 'object' || (gridObj === null || gridObj === void 0 ? void 0 : gridObj.initializeType) !== 'gridView') return;
  if (typeof columnId !== 'string' || !columnId) return;
  if (typeof placeholder_value !== 'string' || !placeholder_value) return;
  const _column = gridObj.element.querySelector(`#${gridObj.getID()}_${columnId}`);
  if (_column === null) return;
  _column.setAttribute("placeholder", placeholder_value);
};
/* version_1. static from##to##_dataList function
webUtil.fromUItoDB_dataList = function(dtlObj) {
	if(dtlObj?.initializeType !== 'dataList') return;

	const columns = dtlObj.getInfo()['columnInfo'];
    const dataJSON = dtlObj.getAllJSON();

    Object.values(columns)
	.filter(column => column.hasOwnProperty('dataType'))
	.filter(column => column.dataType === 'text')
	.filter(column => column.hasOwnProperty('dateFormat'))
	.forEach(column => {
		 const id = column['id'];
		 const domain = column['dateFormat'];
		 dataJSON.forEach(json => json[id] = webUtil.preFormatter(json[id], domain))
	});

    dataJSON.forEach((data, idx) => {
    	const originalRowStatus = dtlObj.getRowStatus(idx);
    	dtlObj.setRowJSON(idx, data, true);
    	dtlObj.modifyRowStatus(idx , originalRowStatus);
    });
}

webUtil.fromDBtoUI_dataList = function(dtlObj) {
	if(dtlObj?.initializeType !== 'dataList') return;
debugger;
	const columns = dtlObj.getInfo()['columnInfo'];
	const dataJSON = dtlObj.getAllJSON();

    Object.values(columns)
    .filter(column => column.hasOwnProperty('dataType'))
    .filter(column => column.dataType === 'text')
    .filter(column => column.hasOwnProperty('dateFormat'))
    .forEach(column => {
         const id = column['id'];
         const domain = column['dateFormat'];
         dataJSON.forEach(json => json[id] = webUtil.postFormatter(json[id], domain));
    });

    dataJSON.forEach((data, idx) => dtlObj.setRowJSON(idx, data, true));
    dtlObj.modifyAllStatus('R');
}
*/

//[start] version.2 dynamic from##to##_dataList
webUtil.fromDBtoUI_dataList = function (dtlObj) {
  if ((dtlObj === null || dtlObj === void 0 ? void 0 : dtlObj.initializeType) !== 'dataList') return;
  const dataJSON = dtlObj.getAllJSON();
  Object.values(dtlObj.element.getElementsByTagName("w2:column")).filter(column => column.hasAttribute('dataType')).filter(column => column.getAttribute('dataType') === 'text').filter(column => column.hasAttribute('dateFormat')).forEach(column => {
    const id = column.getAttribute('id');
    const domain = column.getAttribute('dateFormat');
    dataJSON.forEach(json => json[id] = webUtil.postFormatter(json[id], domain));
  });
  dataJSON.forEach((data, idx) => dtlObj.setRowJSON(idx, data, true));
  dtlObj.modifyAllStatus('R');
};
webUtil.fromUItoDB_dataList = function (dtlObj) {
  if ((dtlObj === null || dtlObj === void 0 ? void 0 : dtlObj.initializeType) !== 'dataList') return;
  const dataJSON = dtlObj.getAllJSON();
  Object.values(dtlObj.element.getElementsByTagName("w2:column")).filter(column => column.hasAttribute('dataType')).filter(column => column.getAttribute('dataType') === 'text').filter(column => column.hasAttribute('dateFormat')).forEach(column => {
    const id = column.getAttribute('id');
    const domain = column.getAttribute('dateFormat');
    dataJSON.forEach(json => json[id] = webUtil.preFormatter(json[id], domain));
  });
  dataJSON.forEach((data, idx) => {
    const originalRowStatus = dtlObj.getRowStatus(idx);
    dtlObj.setRowJSON(idx, data, true);
    dtlObj.modifyRowStatus(idx, originalRowStatus);
  });
};
//[end]

webUtil.fromUItoDB_dataMap = function (dmaObj) {
  if ((dmaObj === null || dmaObj === void 0 ? void 0 : dmaObj.initializeType) !== 'dataMap') return;
  const keys = dmaObj.getInfo()['keyInfo'];
  Object.values(keys).filter(column => column.hasOwnProperty('dataType')).filter(column => column.dataType === 'text').filter(key => key.hasOwnProperty('dateFormat')).forEach(key => {
    const id = key['id'];
    const value = dmaObj.get(id);
    const domain = key['dateFormat'];
    dmaObj.set(id, webUtil.preFormatter(value, domain));
  });
};
webUtil.fromDBtoUI_dataMap = function (dmaObj) {
  if ((dmaObj === null || dmaObj === void 0 ? void 0 : dmaObj.initializeType) !== 'dataMap') return;
  const keys = dmaObj.getInfo()['keyInfo'];
  Object.values(keys).filter(column => column.hasOwnProperty('dataType')).filter(column => column.dataType === 'text').filter(key => key.hasOwnProperty('dateFormat')).forEach(key => {
    const id = key['id'];
    const value = dmaObj.get(id);
    const domain = key['dateFormat'];
    dmaObj.set(id, webUtil.postFormatter(value, domain));
  });
};
webUtil.ioFormat_YMD = function () {
  let io = webUtil.userInfo().dtFrmt || 'YYYY-MM-DD';
  return io.replace("YYYY", "yyyy").replace("DD", "dd").replaceAll("-", "");
};
webUtil.ioFormat_YMDHM = function () {
  let io = webUtil.userInfo().dtFrmt || 'YYYY-MM-DD';
  return io.replace("YYYY", "yyyy").replace("DD", "dd").replaceAll("-", "") + "HHmm";
};
webUtil.ioFormat_YMDHMS = function () {
  let io = webUtil.userInfo().dtFrmt || 'YYYY-MM-DD';
  return io.replace("YYYY", "yyyy").replace("DD", "dd").replaceAll("-", "") + "HHmmSS";
};
webUtil.groupBy = function (data, key) {
  return data.reduce(function (carry, el) {
    var group = el[key];
    if (carry[group] === undefined) {
      carry[group] = [];
    }
    carry[group].push(el);
    return carry;
  }, {});
};
webUtil.getParentWindow = function () {
  if (parent.$p.getParentWindow().win_main !== undefined) {
    var windowId = parent.$p.getParentWindow().win_main.getSelectedWindowId();
    return parent.$p.getParentWindow().win_main.getWindow(windowId);
  } else {
    return parent.$p.getParentWindow();
  }
};
webUtil.getParentWindowTitle = function () {
  if (parent.$p.getParentWindow().win_main !== undefined) {
    var windowId = parent.$p.getParentWindow().win_main.getSelectedWindowId();
    return parent.$p.getParentWindow().win_main.getWindow(windowId).tbx_title.options.label;
  } else {
    return parent.$p.getParentWindow().tbx_title.options.label;
  }
};
webUtil.validateGrid = function (gridViewObj, valInfoArr, option, isCheckModified) {
  try {
    option = option || {};
    var tacObj = option.tacObj;
    var tabId = option.tabId;
    var isCheckModified = option.isCheckModified;
    if (gridViewObj === null) {
      return false;
    }
    var dataList = webUtil.getGridViewDataList(gridViewObj);
    if (dataList === null) {
      return false;
    }
    // 변경여부 확인
    if (isCheckModified !== false && !webUtil.isModified(dataList)) {
      webUtil.getMsg(webUtil.showAlert(webUtil.getMsg("vms.com.noAction")), null, "warning");
      return false;
    }
    var errors = [];
    var modifiedIdx = dataList.getModifiedIndex();
    for (var dataIdx = 0; dataIdx < modifiedIdx.length; dataIdx++) {
      var valInfo = {};
      var isVaild = false;
      var modifiedData = dataList.getRowJSON(modifiedIdx[dataIdx]);
      if (modifiedData.rowStatus === "D") {
        continue;
      }
      for (var valIdx of valInfoArr) {
        if (typeof valIdx.id !== "undefined" && modifiedData[valIdx.id] !== "undefined") {
          var value = modifiedData[valIdx.id];
          if (typeof value === "string") {
            value = value.trim();
          }
          _setResult(modifiedIdx[dataIdx], dataList, gridViewObj.getID(), valIdx, value);
        }
      }
    }
    if (errors.length > 0) {
      if (typeof tacObj !== "undefined" && typeof tabId !== "undefined" && tabId !== "") {
        var tabIndex = tacObj.getTabIndex(tabId);
        tacObj.setSelectedTabIndex(tabIndex);
      }
      webUtil.showAlert(errors[0].message, function (param) {
        var grdiViewObj = scwin.$w.getComponentById(errors[0].objId);
        grdiViewObj.setFocusedCell(errors[0].rowIndex, errors[0].columnId, true);
      }, "warning");
      return false;
    } else {
      return true;
    }
    function _setResult(rowIndex, dataList, gridViewObjId, valInfo, value) {
      var msgInfo = webUtil._getValResultMsg(valInfo, value, rowIndex);
      if (webUtil.isEmpty(msgInfo.message) === false) {
        var errIdx = errors.length;
        errors[errIdx] = {};
        errors[errIdx].columnId = valInfo.id;
        errors[errIdx].objId = gridViewObjId;
        if (valInfo.label && webUtil.isEmpty(valInfo.label) === false) {
          errors[errIdx].columnName = valInfo.label;
        } else {
          errors[errIdx].columnName = dataList.getColumnName(valInfo.id);
        }
        errors[errIdx].rowIndex = rowIndex;
        if (msgInfo.msgType == "2") {
          errors[errIdx].message = msgInfo.message;
        } else {
          errors[errIdx].message = webUtil.attachPostposition(errors[errIdx].columnName) + " " + msgInfo.message;
        }
      }
    }
  } catch (e) {
    console.error("[webUtil.validateGrid] Exception :: " + e);
  }
};
webUtil.getGridViewDataList = function (gridViewObj) {
  try {
    var scopeScwin = scwin;
    var dataListId = gridViewObj.getDataList();
    if (dataListId !== "") {
      var dataList = scopeScwin.$w.getComponentById(dataListId);
      if (typeof dataList === "undefined" || dataList === null) {
        console.log("DataList(" + dataListId + ")를 찾을 수 없습니다.");
        return null;
      } else {
        return dataList;
      }
    } else {
      console.log(gridViewObj.getID() + "는 DataList가 세팅되어 있지 않습니다.");
      return null;
    }
  } catch (e) {
    console.error("[webUtil.getGridViewDataList] Exception :: " + e);
    return null;
  }
};
webUtil._getValResultMsg = function (valInfo, value, rowIndex) {
  try {
    var msgInfo = {
      msgType: "1",
      message: ""
    };
    if (typeof valInfo.mandatory !== "undefined" && valInfo.mandatory === true && value.length === 0) {
      msgInfo.message = webUtil.getMsg("vms.com.required02");
    } else if (typeof valInfo.minLength !== "undefined" && valInfo.minLength > 0 && !webUtil.isEmpty(value) && value.length < valInfo.minLength) {
      msgInfo.message = webUtil.getMsg("vms.com.minLength", valInfo.minLength);
    } else if (typeof valInfo.minByteLength !== "undefined" && valInfo.minByteLength > 0 && !webUtil.isEmpty(value) && scwin.getByteLength(value) < valInfo.minByteLength) {
      msgInfo.message = webUtil.getMsg("vms.com.minByte", valInfo.minByteLength);
    } else if (typeof valInfo.maxLength !== "undefined" && valInfo.maxLength > 0 && !webUtil.isEmpty(value) && value.length > valInfo.maxLength) {
      msgInfo.message = webUtil.getMsg("vms.com.maxLength", valInfo.maxLength);
    } else if (typeof valInfo.maxByteLength !== "undefined" && valInfo.maxByteLength > 0 && !webUtil.isEmpty(value) && scwin.getByteLength(value) > valInfo.maxByteLength) {
      msgInfo.message = webUtil.getMsg("vms.com.maxByte", valInfo.maxByteLength);
    } else if (typeof valInfo.allowChar !== "undefined" && !webUtil.isEmpty(value) && new RegExp("[^" + valInfo.allowChar + "]").test(value)) {
      msgInfo.message = webUtil.getMsg("vms.com.allowChar", valInfo.allowChar);
    } else if (typeof valInfo.ignoreChar !== "undefined" && !webUtil.isEmpty(value) && new RegExp("[" + valInfo.ignoreChar + "]").test(value)) {
      msgInfo.message = webUtil.getMsg("vms.com.char01", valInfo.ignoreChar);
    } else if (typeof valInfo.isEmail !== "undefined" && valInfo.isEmail && webUtil.isEmpty(value) === false && scwin.isEmail(value) === false) {
      msgInfo.message = webUtil.getMsg("vms.com.email");
    } else if (typeof valInfo.isPhone !== "undefined" && valInfo.isPhone && webUtil.isEmpty(value) === false && scwin.isPhone(value) === false) {
      msgInfo.message = webUtil.getMsg("vms.com.tel");
    } else if (typeof valInfo.valFunc === "function") {
      var resultMsg = valInfo.valFunc(value, rowIndex);
      if (webUtil.isEmpty(resultMsg) === false) {
        msgInfo.msgType = "2";
        msgInfo.message = resultMsg;
      }
    }
    return msgInfo;
  } catch (e) {
    console.error("[webUtil._getValResultMsg] Exception :: " + e);
    return null;
  }
};
webUtil.attachPostposition = function (str) {
  try {
    if (webUtil.getWebSquareLangCode() == "ko") {
      if (webUtil.isFinalConsonant(str)) {
        str = '\"' + str + '\"' + '은';
      } else {
        str = '\"' + str + '\"' + '는';
      }
      return str;
    } else {
      return '\"' + str + '\"';
    }
  } catch (e) {
    console.error("[webUtil.attachPostposition] Exception :: " + e);
    return str;
  }
};
webUtil.isFinalConsonant = function (str) {
  try {
    var code = str.charCodeAt(str.length - 1);
    if (code < 44032 || code > 55197) {
      return false;
    }
    if ((code - 16) % 28 == 0) {
      return false;
    }
    return true;
  } catch (e) {
    console.error("[webUtil.isFinalConsonant] Exception :: " + e);
    return null;
  }
};
webUtil.setPlaceHolder_quickSrch = function (header, placeholder) {
  var _header$element;
  if (!header || !placeholder) return;
  if ((header === null || header === void 0 ? void 0 : (_header$element = header.element) === null || _header$element === void 0 ? void 0 : _header$element.tagName) !== 'w2:wframe' && (header === null || header === void 0 ? void 0 : header.org_id) !== 'wfm_header') return;
  if (typeof placeholder !== 'string') return;
  header === null || header === void 0 ? void 0 : header.scope.scwin.quickSrch_setPlaceHolder(placeholder);
};
webUtil.setCombobox_quickSrch = function (header, arrayOfMap) {
  var _header$element2;
  if (!header || !arrayOfMap) return;
  if ((header === null || header === void 0 ? void 0 : (_header$element2 = header.element) === null || _header$element2 === void 0 ? void 0 : _header$element2.tagName) !== 'w2:wframe' && (header === null || header === void 0 ? void 0 : header.org_id) !== 'wfm_header') return;
  if (typeof arrayOfMap !== 'object') return;
  header === null || header === void 0 ? void 0 : header.scope.scwin.quickSrch_setCombobox(arrayOfMap);
};

// 마지막에 해야됨
imports("uiplugin.popup");