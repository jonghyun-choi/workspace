객체 생성

1. 생성자 `constructor()`

```java
public class MyClass {

	public MyClass() {}
    public MyClass(String item1) {}
	public MyClass(String item1, String item2) {}


	// ============ 생성자와 접근자
	public MyClass(String item1) {}
	public MyClass(String item2) {} // ERROR

	private MyClass() {} 	// 클래스 본인에서의 생성 제한
	protected MyClass() {}	// 같은 패키지 내부 / 파생 클래스 에서의 생성으로 제한
	default MyClass() {}    // 동일 패키지
	MyClass() {} 			// default 값
}

```
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. 정적 팩토리 메서드 `public static <T> myFactoryMethod()`

```java
public class MyClass {

	public MyClass(String firstName) {}
	public MyClass(String lastName) {}  // ERROR !

	// 생성자 기반 해결
	public MyClass(String name, boolean flag) {

		if(flag)
			this.firstName = name;
		else
			this.lastName = name;
	}

	// 정적 팩터리 메서드 기반 해결
	public MyClass() {}

	public static MyClass ofFirstName(String firstName) {
		MyClass instance = new MyClass();
		instance.setFirstName(firstName);
		return instance;
	}

	public static MyClass ofLastName(String lastName) {
		MyClass instance = new MyClass();
		instance.setLastName(lastName);
		return instance;
	}
}


```

장점
1. 정적 팩터리 메서드는 개성있는 이름을 가질 수 있음.
2. 생성자는 호출 시 필연적으로 인스턴스를 반환 하지만, 정적 팩터리 메서드는 인스턴스 생성 여부를 선택 할 수 있음.
```java

// 자바 Boolean 발췌
public static Boolean valueOf(boolean b) {
	return b ? Boolean.TRUE : Boolean.FALSE;
}

```
	- 생성 여부 권한 활용 예시 
		- 싱글턴
		- 인스턴스 불가 객체
		- 불변 인스턴스

3. 하위 클래스 반환 가능
```java

public class MyParent() {
	public myParent(){}

	public static <T> birth() {
		return new MyChild();
	}
	// ...
}

public class MyChild() extends MyParent{
	public MyChild() {}
	// ...
}

```

4. 파라미터 값에 상응하는 인스턴스 반환 가능

```java

// 자바 EnumSet 발췌
parameter value < 65 -> RegularEnumSet() 반환
parameter value > 65 -> JumboEnumSet() 반환


```

5. 정적 팩터리 메서드 호출 시 반환 하는 객체 생성을 필수로 하지 않음.
`JDBC Driver`

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
3. 빌더 메서드 `MyObject.builder()`

```java

// 빌더 메서드 구현 전 코드
MyObject myInstance = new MyObject();
myInstance.setValue1(1);
myInstance.setValue2(2);
myInstance.setValue3(3);
myInstance.setValue4(4);
myInstance.setValue5(5);
myInstance.setValue6(6);
// ...



public class MyObject() {

	private int value1, value2, value3, value4, value5, value6;

	private MyObject(Builder builder) {
		value1 = builder.value1;
		value2 = builder.value2;
		value3 = builder.value3;
		value4 = builder.value4;
		value5 = builder.value5;
		value6 = builder.value6;
	}

	public static class Builder {
		private int value1 = 0;
		private int value2 = 0;
		private int value3 = 0;

		public Builder(int value1, int value2, int value3) {
			this.value1 = value1;
			this.value2 = value2;
			this.value3 = value3;
		}

		public Builder value4(int value4) {
			this.value4 = value4;
			return this;
		}

		public Builder value5(int value5) {
			this.value5 = value5;
			return this;
		}

		public Builder value6(int value6) {
			this.value6 = value6;
			return this;
		}

		// ...
		public MyObject build(){
			return new MyObject(this);
		}
	}
}

public static void main(String[] args) {
	MyObject myInstance = new MyObject.Builder(1,2,3)
										.value4(4)
										.value5(5)
										.value6(6);
}


```