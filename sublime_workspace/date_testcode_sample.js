/*
	- 테스트 코드 확인 방법.
	1. PantosView 접속
	2. 로그인
	3. 브라우저 개발자 도구 열람
	4. console tab에서 하단의 코드 복사 붙여넣기
	5. 실행
*/

/* 테스트용으로 변경 된 구현 코드*/
testObj = {};
testObj.dateValidation_YMD = function(input) {
	if(typeof input !== "string" || input.length !== 8 || !/^\d+$/.test(input)) return false;
	const dtFrmt = (testObj.userInfo()?.dtFrmt || 'YYYY-MM-DD').replaceAll("-", "");
	return moment(input, dtFrmt).isValid();
};
testObj.dateValidation_YMDHMS = function(input) {
	if(typeof input !== "string" || input.length !== 14 || !/^\d+$/.test(input)) return false;
	const dtFrmt = (testObj.userInfo()?.dtFrmt || 'YYYY-MM-DD').replaceAll("-", "") + "HHmmss";
	return moment(input, `${dtFrmt}HHmmss`).isValid();
};
testObj.dateValidation_YMDHM = function(input) {
	if(typeof input !== "string" || input.length !== 12 || !/^\d+$/.test(input)) return false;
	const dtFrmt = (testObj.userInfo()?.dtFrmt || 'YYYY-MM-DD').replaceAll("-", "") + "HHmm";
	return moment(input, dtFrmt).isValid();
};

/* 테스트 데이터 */
testData = {
	// truly
	T_YMD : 	['19961209', '20230101', '20001020', '20200229', '20010101'],
	T_MDY : 	['12091996', '01012023', '10202000', '02292020', '01012001'],
	T_DMY : 	['09121996', '01012023', '20102000', '29022020', '01012001'],

	T_YMD_HM : 	['199612090000', '202301011212', '200010200001', '202002291305', '200101010900'],
	T_MDY_HM : 	['120919960000', '010120231212', '102020000001', '022920201305', '010120010900'],
	T_DMY_HM : 	['091219960000', '010120231212', '201020000001', '290220201305', '010120010900'],

	T_YMD_HMS : ['19961209000000', '20230101121209', '20001020000101', '20200229130559', '20010101090023'],
	T_MDY_HMS : ['12091996000000', '01012023121209', '10202000000101', '02292020130559', '01012001090023'],
	T_DMY_HMS : ['09121996000000', '01012023121209', '20102000000101', '29022020130559', '01012001090023'],


	// falsy
	F_YMD :		[20220101 , '20230229', 'helloworld', '-20220919', '9991010', '20231301', '20230140', '1234', '2022010101', null, undefined, {}, ['hi'], '2023-02-28', '2023.02.28', '2023/02/28'],
	F_MDY :		[01012022 , '02292023', 'helloworld', '-09192022', '0100999', '13012023', '01402023', '1234', '0101202201', null, undefined, {}, ['hi'], '02-28-2023', '02.28.2023', '02/28/2023'],
	F_DMY :		[01012022 , '29022023', 'helloworld', '-19092022', '0100999', '01132023', '40012023', '1234', '0101202201', null, undefined, {}, ['hi'], '28-02-2023', '28.02.2023', '28/02/2023'],

	F_YMD_HM :	[202201010000, '202302290000', 'helloworld', '-202209190000', '99910100000', '202313010000', '202301400000', '1234', '20220101010101', null, undefined, {}, ['hi'], '2023-02-28 00:00', '2023.02.28 00:00', '2023/02/28 00:00', '202301016000', '202301011399', '20230101-1200'],
	F_MDY_HM :	[010120220000, '022920230000', 'helloworld', '-091920220000', '01009990000', '130120230000', '014020230000', '1234', '20220101010101', null, undefined, {}, ['hi'], '02-28-2023 00:00', '02.28.2023 00:00', '02/28/2023 00:00', '010120236000', '010120231399', '01012023-2000'],
	F_DMY_HM :	[010120220000, '290220230000', 'helloworld', '-190920220000', '01009990000', '011320230000', '400120230000', '1234', '20220101010101', null, undefined, {}, ['hi'], '28-02-2023 00:00', '28.02.2023 00:00', '28/02/2023 00:00', '010120236000', '010120231399', '01012023-2000'],

	F_YMD_HMS :	[20220101000000, '20230229000000', 'helloworld', '-20220919000000', '9991010000000', '20231301000000', '20230140000000', '1234', '202201010101010101', null, undefined, {}, ['hi'], '2023-02-28 00:00:00', '2023.02.28 00:00:00', '2023/02/28 00:00:00', '20230101600000', '20230101139900', '202301011101099', '20230101-120000'],
	F_MDY_HMS :	[01012022000000, '02292023000000', 'helloworld', '-09192022000000', '0100999000000', '13012023000000', '01402023000000', '1234', '202201010101010101', null, undefined, {}, ['hi'], '02-28-2023 00:00:00', '02.28.2023 00:00:00', '02/28/2023 00:00:00', '01012023600000', '01012023139900', '010120231101099', '01012023-200000'],
	F_DMY_HMS :	[01012022000000, '29022023000000', 'helloworld', '-19092022000000', '0100999000000', '01132023000000', '40012023000000', '1234', '202201010101010101', null, undefined, {}, ['hi'], '28-02-2023 00:00:00', '28.02.2023 00:00:00', '28/02/2023 00:00:00', '01012023600000', '01012023139900', '010120231101099', '01012023-200000'],
};

/* 테스트 코드 */
console.log(`=== YMD truly Test script result ===`)
testObj.userInfo = () => { return { dtFrmt : 'YYYY-MM-DD' }};
console.log(`key : YMD >>> result : ${testData['T_YMD'].every(value => testObj.dateValidation_YMD(value)) ? 'pass' : 'failed'}`);
console.log(`key : YMD_HM >>> result : ${testData['T_YMD_HM'].every(value => testObj.dateValidation_YMDHM(value)) ? 'pass' : 'failed'}`);
console.log(`key : YMD_HMS >>> result : ${testData['T_YMD_HMS'].every(value => testObj.dateValidation_YMDHMS(value)) ? 'pass' : 'failed'}`);
console.log('');

console.log(`=== MDY truly Test script result ===`)
testObj.userInfo = () => { return { dtFrmt : 'MM-DD-YYYY' }};
console.log(`key : MDY >>> result : ${testData['T_MDY'].every(value => testObj.dateValidation_YMD(value)) ? 'pass' : 'failed'}`);
console.log(`key : MDY_HM >>> result : ${testData['T_MDY_HM'].every(value => testObj.dateValidation_YMDHM(value)) ? 'pass' : 'failed'}`);
console.log(`key : MDY_HMS >>> result : ${testData['T_MDY_HMS'].every(value => testObj.dateValidation_YMDHMS(value)) ? 'pass' : 'failed'}`);
console.log('');

console.log(`=== DMY truly Test script result ===`)
testObj.userInfo = () => { return { dtFrmt : 'DD-MM-YYYY' }};
console.log(`key : DMY >>> result : ${testData['T_DMY'].every(value => testObj.dateValidation_YMD(value)) ? 'pass' : 'failed'}`);
console.log(`key : DMY_HM >>> result : ${testData['T_DMY_HM'].every(value => testObj.dateValidation_YMDHM(value)) ? 'pass' : 'failed'}`);
console.log(`key : DMY_HMS >>> result : ${testData['T_DMY_HMS'].every(value => testObj.dateValidation_YMDHMS(value)) ? 'pass' : 'failed'}`);
console.log('');


console.log(`=== YMD falsy Test script result ===`)
testObj.userInfo = () => { return { dtFrmt : 'YYYY-MM-DD' }};
console.log(`key : YMD >>> result : ${!testData['F_YMD'].some(value => testObj.dateValidation_YMD(value)) ? 'pass' : 'failed'}`);
console.log(`key : YMD_HM >>> result : ${!testData['F_YMD_HM'].some(value => testObj.dateValidation_YMDHM(value)) ? 'pass' : 'failed'}`);
console.log(`key : YMD_HMS >>> result : ${!testData['F_YMD_HMS'].some(value => testObj.dateValidation_YMDHMS(value)) ? 'pass' : 'failed'}`);
console.log('');

console.log(`=== MDY falsy Test script result ===`)
testObj.userInfo = () => { return { dtFrmt : 'MM-DD-YYYY' }};
console.log(`key : MDY >>> result : ${!testData['F_MDY'].some(value => testObj.dateValidation_YMD(value)) ? 'pass' : 'failed'}`);
console.log(`key : MDY_HM >>> result : ${!testData['F_MDY_HM'].some(value => testObj.dateValidation_YMDHM(value)) ? 'pass' : 'failed'}`);
console.log(`key : MDY_HMS >>> result : ${!testData['F_MDY_HMS'].some(value => testObj.dateValidation_YMDHMS(value)) ? 'pass' : 'failed'}`);
console.log('');

console.log(`=== DMY falsy Test script result ===`)
testObj.userInfo = () => { return { dtFrmt : 'DD-MM-YYYY' }};
console.log(`key : DMY >>> result : ${!testData['F_DMY'].some(value => testObj.dateValidation_YMD(value)) ? 'pass' : 'failed'}`);
console.log(`key : DMY_HM >>> result : ${!testData['F_DMY_HM'].some(value => testObj.dateValidation_YMDHM(value)) ? 'pass' : 'failed'}`);
console.log(`key : DMY_HMS >>> result : ${!testData['F_DMY_HMS'].some(value => testObj.dateValidation_YMDHMS(value)) ? 'pass' : 'failed'}`);
console.log('');