# JAVA 11

## String methods
```java
	- String.lines();
		Input  : "Geek \n For \n Geeks \n 2021"
		Output :
		Geek
		For
		Geeks
		2021

	- String.isBlank();
		check if String is empty
		- isEmpty() vs isBlack()
			isEmpty() returns true if length == 0
			isBlack() returns true if length == 0 || string only with spaces
			System.out.println(" ".isEmpty()); // false
			System.out.println(" ".isBlank()); // true


	- String.strip();
		remove leading and trailing spaces
		System.out.println("    ".strip()); 		//
        System.out.println("  HELLO  ".strip()); 	// HELLO
        System.out.println("  H I  ".strip());		// H I

	- String.stripLeading();
		remove leading spaces

	- String.stripTrailing();
		remove trailing spaces

	- String.repeat(n);
		repeat string n times
		System.out.println("abc".repeat(3)); // abcabcabc
```

## File methods
```java
 	- Files.readString() and Files.writeString()
 		Path filePath = Files.writeString(Files.createTempFile(tempDir, "demo", ".txt"), "Sample text");
		String fileContent = Files.readString(filePath);
		assertThat(fileContent).isEqualTo("Sample text");
```

## Collection to Array
```java
	- List.toArray()
```

Not Predicate method
Local variable syntax for Lambda
HTTP client
Nest based access control
