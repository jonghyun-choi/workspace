# Chapter 1 : Java 8, 9, 10, and 11 : what's happening?
## Cause of evolution in programming language
- Bigger the data volume to process
  - movement of business logic from SQL to programming language
- Larger the systems designed

## New in Java
- Stream
- Lambda
- Module
- Optional

# Chapter 2 : Passing code with behavior parameterization

### Ability of method to receive multiple different behaviors as parameter

## Case study
- Given situation
  - Apple Inventory filtering program
```java
enum Color { RED, GREEN }
List<Apple> inventory = new ArrayList<>();
```

### Coding Attempts without Behavior Parameterization
1. Filtering GREEN apples
```java
// First design of program
public static List<Apple> filterGreenApples(List<Apple> inventory) {
    List<Apple> result = new ArrayList<>();
    for(Apple apple : inventory) {
        if(GREEN.equals(apple.getColor()))
            result.add(apple);
    }
    return result;
}
```

2. Filtering GREEN or RED apples
```java
// Additional demands on program; 
// Attempt; parameterizing Color
public static List<Apple> filterRedApples(List<Apple> inventory, Color color) {
    List<Apple> result = new ArrayList<>();
    for(Apple apple : inventory) {
        if(RED.equals(apple.getColor()))
            result.add(apple);
    }
    return result;
}

// usage
List<Apple> greenApples = filterRedApples(inventory, Color.GREEN);
List<Apple> redApples = filterRedApples(inventory, Color.RED);
```

3. Filtering apples by weight
```java
// Later on ... additional demands on program
// Filtering Apples heavier than 150g
public static List<Apple> filterApplesByWeight(List<Apple> inventory, int weight) {
    List<Apple> result = new ArrayList<>();
    For(Apple apple : inventory) {
        if(apple.getWeight() > weight)
            result.add(apple);
    }
    return result;
}

// Code works. 
// But duplication in implementation for different demands [filter by color, filter by weight]
// while point of these methods are just filtering apples
```

4. filtering with every attribute possible to merge [filter by color, filter by weight]
```java
// Attempt; filtering with every attribute possible
public static List<Apple> filterApples(List<Apple> inventory, Color color, int weight, boolean flag) {
    List<Apple> result = new ArrayList<>();
    for(Apple apple : inventory) {
        // flag == true  : color
        // flag == false : weight
        if(flag && apple.getColor().equals(color) || (!flag && apple.getWeight() > weight)) {
            result.add(apple);
        }
    }
}
//usage
List<Apple> greenApples = filterApples(inventory, GREEN, 0, true);
List<Apple> heavyApples = filterApples(inventory, null, 150, false);

// what if more demands on program are required?
```
### Coding Attempts with Behavior Parameterization and Classes
#### Strategy design pattern
- Define family of algorithm
- Encapsulate each algorithm
1. Define `predicate` (a function that returns a `boolean`)
```java
// define an interface to model the selection criteria
public interface ApplePredicate {
    boolean test(Apple apple);
}
```
2. Define multiple implementations of `ApplePredicate`
```java
public class AppleHeavyWeightPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return apple.getWeight () > 150;
    }
}

public class AppleGreenColorPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return GREEN.equals(apple.getColor());
    }
}

// case of additional demands
public class AppleRedAndHeavyPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return RED.equals(apple.getColor()) && apple.getWeight() > 150;
    }
}
```
3. Accept behavior (ApplePredicate) in parameter
```java
// Attempt; filtering by abstract criteria
// ... our new filterApples method
public static List<Apple> filterApples(List<Apple> inventory, ApplePredicate p) {
    List<Apple> result = new ArrayList<>();
    for(Apple apple : inventory) {
        if(p.test(apple))
            result.add(apple);
    }
    return result;
}

// usage
List<Apple> RedAndHeavyApples = filterApples(inventory, new AppleRedAndHeavyPredicate());

// the behavior of `filterApples` method depends on passed behavior/code
```

### Coding Attempts with Behavior Parameterization and Anonymous classes
```java
List<Apple> redApples = filterApples(inventory, new ApplePredicate() {
    public boolean test(Apple apple) {
        return RED.equals(apple.getColor());    
    }    
});
// current anonymous class is too bulky
// - takes a lot of space; lots of boilerplate code
// - confusing; verbose
```

### Coding Attempts with Behavior Parameterization and Lambda Expression
```java
List<Apple> redApples = filterApples(inventory, (Apple apple) -> RED.equals(apple.getColor()));
```

### Coding Attempts with Abstracting over List type---
AS-IS : `filterApples` method only works for `Apple`\
TO-BE : make `filter` method works for any domain
```java
public interface Predicate<T> {
    boolean test(T t);
}

public static <T> List<T> filter(List<T> list, predicate<T> p) {
    List<T> result = new ArrayList<>();
    for(T e : list) {
        if(p.test(e))
            result.add(e);
    }
}

// our apple inventory works
List<Apple> redApples = filter(inventory, (Apple apple) -> RED.equals(apple.getColor()));
// another theme works too
List<Integer> evenNumbers = filter(numbers, (Integer i) -> i % 2 == 0);
```

# Chapter 3 : Lambda expression

### Lambda VS Anonymous class
- Similarities
  - methods without declared names
  - possible to be passed as arguments
- Differences


## Lambda in a nutshell
- Characteristics
  - Anonymous
    - Lambda has no explicit name
  - Function
    - Lambda has parameters, a body, a return type, and possible to throw Exceptions
  - Passed around
    - Lambda expression can be passed as argument
    - Lambda expression can be stored in a variable
  - Concise
    - No more boilerplate code
- Composition
  - `(item1, item2, ...) -> { expressions }`
    - lambda parameters : `(items1, items2, ...)`
    - arrow : `->`
    - lambda body : `{ expression }`
- Syntax
  - to use `return` statement in expression, curly braces are required
  - expressions surrounded by curly braces requires explicit `return` statement


### AS-IS Coding (w/o lambda expression)
```java
Comparator<Apple> byWeight = new Comparator<Apple>() {
            public int compare(Apple a1, Apple a2) {
                return a1.getWeight().compareTo(a2.getWeight);
            }
        };
```
### TO-BE Coding (w/ lambda expression)
```java
Comparator<Apple> byWeight = (Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight());
```


## Functional interface
interface that specifies exactly one abstract method.
### Example of functional interface
```java
// example from Chapter 2
public interface Predicate<T> {
    // only abstract method in interface
    boolean test (T t);
}

// other functional interface Java APIs 
// Comparator, Runnable, ActionListener, Callable, PrivilegedAction ...
```

### Lambda expression and functional interface
Lambda expression allows implementation of abstract method of functional interface 
directly inline and treat the whole expression as an instance of a functional interface

### Function descriptor
Abstract method of functional interface describes signature of lambda expression
```java
@FunctionalInterface
public interface Predicate<T> {
    // only abstract method in interface
    boolean test (T t);
}

// functional interface : Predicate<T>
// Abstract method      : test()
//                          - describes lambda returns boolean
//                          - describes lambda accepts a parameter
```

## Case study
Given situation
- File reading program

Objectives
- Applying execute-around design pattern
- Using try-with-resource from Java 7
- Creating functional interface

1. Reading a first line from a file
```java
// First design of pragram
public String processFile() throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
        return br.readLine();    
    }
}
```
2. Reading first two lines from a file
```java
public String processFile2() throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
        return br.readLine() + br.readLine();    
    }
}
// more demands might be asked
```

### Coding Attempts with behavior parameterization and functional interface
3. Creating functional interface to allow lambda expression
```java
@FunctionalInterface
public interface BufferedReaderProcessor {
    String process(BufferedReader b) throws IOException;
}

// new processFile() with behavior parameterized
// processFile2() is not used anymore
public String processFile(BufferedReaderProcessor p) throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
        return p.process(br);
    }
}
```

### Coding Attempts with passing lambda
4. Using `processFile()`
```java
String oneLine = processFile((BufferedReader br) -> br.readLine());
String twoLines = processFile((BufferedReader br) -> br.readLine() + br.readLine());
```

## Java 8 provided functional interfaces
`java.util.function` package includes new and helpful functional interfaces
- Predicate
- Consumer
- Function

### Predicate
```java
// java.util.function.Predicate<T>
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
}
// Available when lambda takes Object of type T and returns boolean
// (Object T) -> { return boolean }
```

### Consumer
```java
//java.util.function.Consumer<T>
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
}
// Available when lambda takes Object of type T and returns nothing
// (Object T) -> {}
```

### Function
```java
// java.util.function.Function<T, R>
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);
}

// Available when lambda takes Object of type T and returns Object type of R
// (Object T) -> { return R; }
```

## Primitive specialization
Java generic bounds only reference type
- Primitive type -> Reference type : boxing
- Reference type -> Primitive type : unboxing
- Automatic boxing and unboxing process by Java : autoboxing

To avoid autoboxing to reduce costs dealing with primitive data, there exist functional
interface for primitive data

```java
@FunctionalInterface
public interface IntPredicate {
    boolean test(int t);
}

@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
}

// usage
IntPredicate evenNumbers = (int i) -> i % 2 == 0;
Predicate<Integer> oddNumbers = (Integer i) -> i % 2 != 0;

evenNumbers.test(1000); // no boxing process happen; Only data type used is int
oddNumbers.test(1000);  // boxing process happen; int 1000 is boxed into Integer 
```

## Debugging Lambda expression
- Target type; Type checking
```java
// given
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
}
// usage
List<Apple> heavierThan150g = filter(inventory, (Apple apple) -> apple.getWeight() > 150);

// process
// 1. declaration of `filter` method
    filter(inventory, (Apple apple) -> apple.getWeight() > 150)
// 2. functional interface
    filter(inventory, Predicate<Apple> p)
// 3. method in functional interface
    boolean test(T t); /* === */ (Apple) -> boolean /* === */ (Apple apple) -> apple.getWeight() > 150;
```
- Type inference
```java
// with type interface
Comparator<Apple> result = (a1, a2) -> a1.getWeight().compareTo(a2.getWeight());

// without type interface
Comparator<Apple> result = (Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight());
```

- Lambda capturing; using Local variables (Free variables)
```java
// Instance variable is stored in heap
// Local variable is stored in stack

// lambda cannot access local variables directly, (Local variable's declared stack)
// but copy the value to lambda's stack

// therefore accessible local variables are ...
// 1. Final variables
// 2. Effectivly Final variables
```

## Method references
```java
// Lambda only calling one method

// AS-IS
/* 1 */ ToIntFunction<String> stringToInt = (String s) -> Integer.parseInt(s);
/* 2 */ BiPredicate<List<String>, String> contains = (list, element) -> list.contains(element);
/* 3 */ Predicate<String> startsWithNumber = (String s) -> this.startsWithNumber(s);

// TO-BE
/* 1 */ ToIntFunction<String> stringToInt = Integer::parseInt;
/* 2 */ BiPredicate<List<String>, String> contains = list::contains;
/* 3 */ Predicate<String> startsWithNumber = this::startsWithNumber;
```

## Constructor references
```java
// Lambda only creating and returning Object

// AS-IS
Supplier<Apple> appleSupplier = () -> new Apple();

// TO-BE
Supplier<Apple> appleSupplier = Apple::new;

// usage
Apple apple = appleSupplier.get();
```

```java
BiFunction<Color, Integer, Apple> myFunc1 = (color, weight) -> new Apple(color, weight);
Apple myApple1 = myFunc1.apply(RED, 10);

BiFunction<Color, Integer, Apple> myFunc2 = Apple::new;
Apple myApple2 = myFunc2.apply(GREEN, 11);

```

## Hands on exercise
Create Apple weight comparator

```java
// Code : original
public class AppleComparator implements Comparator<Apple> {
    public int compare(Apple a1, Apple a2) {
        return a1.getWeight().compareTo(a2.getWeight());
    }
}
// usage
inventory.sort(new AppleComparator());


// Code : annonymous class
inventory.sort(new Comparator(){
    public int compare(Apple a1, Apple a2) {
        return a1.getWeight().compareTo(a2.getWeight);
    }
});

// Code : lambda expression
inventory.sort((Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight()));

// Code : functional interface
// comparing method from Comparator
//      static <T, U> Comparator<T> comparing(Function <? super T, ? extends U> keyExtractor, Comparator<? super U> keyComparator) {}
inventory.sort(comparing(apple -> apple.getWeight()));

// Code : method reference
inventory.sort(comparing(apple::getWeight));
```

# Chapter 4 : Functional-style data processing with streams

## Characteristics of stream
- Sequence of elements
- Pipelining
- Internal iteration
- Data-processing operation
- Source from data-storage (Collection, Array, I/O resouces ...)

## Stream vs Collection
Stream 					Collection
- About computation		- About data
- database-like			- flowbase-like
- internal counter		- external counter


## Stream Operations

### Intermediate
- filter
- map
- limit
- sorted
- distinct

### Terminal
- forEach
- count
- collect

# Chapter 5 : Working with streams

## Data processing query

### filter()
```java
// correspond to conditional statement in iteration
List<Apple> apples = new ArrayList<>();
List<Apple> applesWeight50;

// AS-IS
applesWeight50 = new ArrayList<>();
for(Apple apple : apples) {
	if(apple.getWeight() > 50) {
		applesWeight50.add(apple);
	}
}

// TO-BE
applesWeight50 = apples.stream()
						.filter(apple -> apple.getWeight() > 50)
						.collect(toList());

```
- takes Predicate function (returning boolean)

### distinct()
- returning unique elements
```java
List<Integer> numbers = Arrays.asList(1,1,2,2,3,3,4,4,5,5,6,6,7,7);
numbers.stream()
		.filter(number -> number % 2 == 0)
		.distinct()
		.forEach(System.out::println);	// 2 4 6

numbers.stream()
		.filter(number -> number % 2 == 0)
		.forEach(System.out::println);	// 2 2 4 4 6 6
```

### takeWhile() and dropWhile()
```java
List<Integer> numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
numbers.stream()
		.takeWhile(number -> number < 6)// return elements without elements after condition fail
		//.takeWhile(number -> number > 6) will print nothing because condition is failed at first item
		.forEach(System.out::println);	// 1 2 3 4 5 

numbers.stream()
		.dropWhile(number -> number < 6) // return remaining elements after condition fail
		.forEach(System.out::println); // 6 7 8 9 10
```

### limit()
```java
List<Integer> numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
numbers.stream()
		.limit(3)
		.forEach(System.out::println); // 1 2 3
```


### skip()
```java
numbers.stream()
		.skip(3)
		.forEach(System.out::println); // 4 5 6 7 8 9 10
```

### slice()


### map()
```java
List<String> words = Arrays.asList("modern", "java", "in", "action");
List<Integer> wordsLength = words.stream()
									.map(String::length)
									.collect(toList()); // return different type of List from original List
```

### flatMap()
```java
List<String> words = Arrays.asList("hello", "world");
      
// ATTEMPT : distinct()
// [failed] Result = helloworld
List<String[]> uniqueChars1 = words.stream()
                                .map(word -> word.split(""))
                                .distinct()
                                .peek(word -> {
                                    for(String item : word)
                                      System.out.println(item);
                                })
                                .collect(Collectors.toList());

// ATTEMPT : flatMap()
// [success] Result = helowrd
List<String> uniqueChars2 = words.stream()
                                  .map(word -> word.split(""))
                                  .flatMap(Arrays::stream)		// convert different streams into one stream
                                  .distinct()
                                  .peek(System.out::println)
                                  .collect(Collectors.toList());
```

### allMatch(), anyMatch(), noneMatch()
```java
List<Integer> numbers = Arrays.asList(1,2,3,4,5);
// match returns boolean
boolean result1 = numbers.stream()
							.allMatch(number -> number < 6);
							// true

boolean result2 = numbers.stream()
							.noneMatch(number -> number < 6);
							// false

boolean result3 = numbers.stream()
							.anyMatch(number -> number % 2 == 0);
							// true


```
### findFirst(), findAny()
```java
List<Integer> numbers = Arrays.asList(1,2,3,4,5);
// find returns Optional
// java.util.Optional
// Optional<T>
// 	- isPresent()
//  - ifPresent()
//  - get()
//  - orElse()
Optional<Integer> result1 = numbers.stream()
									.filter(number -> number < 6)
									.findAny();

Optional<Integer> result1 = numbers.stream()
									.filter(number -> number == 6)
									.findFirst();
```
### reduce()
```java
// reduce() is used to generate data from stream; data such as total, mean, max, min ... etc
// sample AS-IS
int total = 0;
for(int number : numbers)
	total += number;


// sample TO-BE
// reduce(initial value, BinaryOperator<T>)
int total = numbers.stream().reduce(0, (a,b) -> a + b);

// reduce(BinaryOperator<T>)
Optional<Integer> total = numbers.stream().reduce((a,b) -> a + b);
Optional<Integer> max = numbers.stream().reduce(Integer::max);
Optional<Integer> min = numbers.stream().reduce(Integer::min);

```

### count()
### sorted()
### collect()
### min()
### max()
### sum()

## Primitive stream specialization
- IntStream, LongSteam
	- range()		// exclusive
	- rangeClosed() // inclusive
- DoubleStream
- mapToInt
- OptionalInt

## Stream.of()		// stream from values
## Arrays.stream()	// stream from arrays
## Files.lines()	// stream from files
## Stream.iterate()
## Stream.generate()

# Collecting data with streams

## collect()

## Collector
```java
import static java.util.stream.Collectors.*
```

### Reducing and summarizing stream into a single value

#### Counting
```java
// Collectors.counting
long countItems = givenList.stream().collect(Collectors.counting());

// Simple usage
long countItems = givenList.stream().count();
```

#### Maximum and minimum
```java
// Collectors.maxBy
// Collectors.minBy
Comparator<GivenObj> objComparator = Comparator.comparingInt(GivenObj::getValue);
Optional<GivenObj> maxValueObj = givenList.stream().collect(maxBy(objComparator));
```

#### Summarization
```java
// Collectors.summingInt
// Collectors.summingDouble
// Collectors.summingLong
int total = givenList.stream().collect(summingInt(GivenObj::getValue));
double total = givenList.stream().collect(summingDouble(GivenObj::getValue));
long total = givenList.stream().collect(summingLong(GivenObj::getValue));

// Collectors.averagingInt
// Collectors.averagingDouble
// Collectors.averagingLong
int total = givenList.stream().collect(averagingInt(GivenObj::getValue));
double total = givenList.stream().collect(averagingDouble(GivenObj::getValue));
long total = givenList.stream().collect(averagingLong(GivenObj::getValue));
```

#### Summarizing more results in single operation
```java
// Collectors.summarizingInt
// Collectors.summarizingDouble
// Collectors.summarizingLong
IntSummaryStatistics objStatistics = givenList.stream().collect(summarizingInt(GivenObj::getValue));
IntSummaryStatistics objStatistics = givenList.stream().collect(summarizingDouble(GivenObj::getValue));
IntSummaryStatistics objStatistics = givenList.stream().collect(summarizingLong(GivenObj::getValue));

System.out.print(objStatistics);
/*
	IntSummaryStatistics{
		count = #,
		sum = #,
		min = #,
		average = #,
		max = #
	}
*/
```

#### Joining Strings
```java
// Collectors.joining

// Invokes .toString() to all results, concatinating them into one String
// Uses StringBuilder
String concatString = givenList.stream().map(GivenObj::getSomething).collect(joining());
System.out.print(concatString); // sample
// modernjavainaction

// Case givenObj has .toString() method, automatically invokes it
String concatString = givenList().stream().collect(joining());

// joining() with parameter
String concatString = givenList().stream().collect(joining(", "));
System.out.print(concatString);
// modern, java, in, action
```

#### Reduction
```java
// Collectors.reducing
int total = givenList().stream().collect(reducing(0, GivenObj::getValue, (i, j) -> i + j)); 		// sum
Optional<GivenObj> max = givenList().stream().collect(reducing((i, j) -> i.getValue() > j.getValue() ? i : j)); 	// max

// Collectors.reducing(para1, para2, para3)
// - para1 : starting value of reduction operation
// - para2 : mapper function
// - para3 : BinaryOperator

// Collectors.reducing(para)
// - para : BinaryOperator
```

##### Stream.reduce() vs Collectors.reducing() 
- reduce()
	1. parallel operation
	2. meant to create new value by combining two values
	3. immutable operation
- reducing()
	1. collecting from stream after all operation is done
	2. meant to accumulate result
	3. mutate container to accumulate

### Grouping elements

#### GroupingBy
```java
Map<GivenType, List<GivenObj> grouped = givenList.stream().collect(Collectors.groupingBy(givenObj::getType));
// result
// {TYPE1 = [], TYPE2 = [], TYPE3 = [] ...}
```

```java
// real code example
import java.util.*;
import java.util.stream.Collectors;

public class MyClass {
    public static void main(String args[]) {
        class Apple {
          enum Color { RED, GREEN }
          
          private Color color;
          private int weight;
          
          public Apple(Color color, int weight) {
            this.color = color;
            this.weight = weight;
          }
          
          public Color getColor() { return color; }
          public int getWeight() { return weight; }
          
          public String toString() { return color + " Apple " + weight + " g" ; }
        }

        List<Apple> inventory = new ArrayList();
        inventory.add(new Apple(Apple.Color.RED, 100));
        inventory.add(new Apple(Apple.Color.GREEN, 120));
        inventory.add(new Apple(Apple.Color.RED, 150));
        inventory.add(new Apple(Apple.Color.GREEN, 170));
        
        Map<Apple.Color, List<Apple>> myGroup = inventory.stream().collect(Collectors.groupingBy(Apple::getColor));
        System.out.println(myGroup);
        // {RED=[RED Apple 100 g, RED Apple 150 g], GREEN=[GREEN Apple 120 g, GREEN Apple 170 g]}

        enum WeightLevel { LESS120, BETWEEN120AND150, MORE150 }
        Map<WeightLevel, List<Apple>> myGroup2 = inventory.stream().collect(Collectors.groupingBy(
        		apple -> {
        			int weight = apple.getWeight();

        			if(150 < weight) return WeightLevel.MORE150;
        			else if(120 > weight) return WeightLevel.LESS120;
        			else return WeightLevel.BETWEEN120AND150;
        		}
        	));
        System.out.println(myGroup2);
        // {LESS120=[RED Apple 100 g], MORE150=[GREEN Apple 170 g], BETWEEN120AND150=[GREEN Apple 120 g, RED Apple 150 g]}
    }
}
```

#### Stream.filter() vs Collectors.groupingBy()
```java
//using filter with apple
// where is RED result ?
System.out.println(
	inventory.stream()
			.filter(item -> item.getColor().equals(Apple.Color.GREEN))
			.collect(Collectors.groupingBy(Apple::getColor))
);
//{GREEN=[GREEN Apple 120 g;, GREEN Apple 170 g;]}

// using filtering in groupingBy()
// RED=[] exist
System.out.println(
	inventory.stream()
			.collect(Collectors.groupingBy(
				Apple::getColor, 
				Collectors.filtering(apple -> apple.getColor().equals(Apple.Color.GREEN), Collectors.toList())
			)
));
// {RED=[], GREEN=[GREEN Apple 120 g;, GREEN Apple 170 g;]}

System.out.println(
	inventory.stream()
			.collect(Collectors.groupingBy(
				Apple::getColor,
				Collectors.mapping(Apple::getWeight, Collectors.toList())
			)
));
// {GREEN=[120, 170], RED=[100, 150]}
```

#### Collectors.groupingBy(flatMapping())
#### Multi-level grouping

### Partitioning elements

# parallelStream
- split elements into multiple chunks
- each chunk is handled by different thread

```java
 Stream.iterate(1L, i -> i+1)
 	   .limit(n)
 	   .parallel()
 	   .reduce(0L, Long::sum);
```

## Stream.parallel() and Stream.sequential()
Last called method decide the sequential / parallel operation of stream
```java
// this stream operates as parallel
stream.parallel()
		.filter(...)
		.sequential()
		.map(...)
		.parallel() // last called method
		.reduce();

// this stream operates as sequential
stream.parallel()
		.filter(...)
		.map(...)
		.sequential() // last called method
		.reduce();
```

## ForkJoinPool (fork/join framework)
- default size of threads is threads available in processor
```java
// sample code of getting available threads in system
Runtime.getRuntime().available-Processors();

// customizing size of pool
// - global setting of pool size
// - do not modify the pool without meaningful reason and understanding
System.setProperty("java.util.concurrent.ForkJoinPool.common.parallelism", "12");
```


## Comparison between Iterative, Sequential, and parallel stream
- benchmarking library : Java Microbenchmark Harness (JMH)

multi-level grouping

```java
import java.util.*;
import java.util.stream.Collectors;

public class MyClass {
    public static void main(String args[]) {
        class Apple {
          enum Color { RED, GREEN }
          
          private Color color;
          private int weight;
          
          public Apple(Color color, int weight) {
            this.color = color;
            this.weight = weight;
          }
          
          public Color getColor() { return color; }
          public int getWeight() { return weight; }
          
          public String toString() { return color + " Apple " + weight + " g" ; }
        }

        List<Apple> inventory = new ArrayList();
        inventory.add(new Apple(Apple.Color.RED, 100));
        inventory.add(new Apple(Apple.Color.GREEN, 120));
        inventory.add(new Apple(Apple.Color.RED, 150));
        inventory.add(new Apple(Apple.Color.GREEN, 170));

        enum WeightLevel { LESS120, BETWEEN120AND150, MORE150 }
        Map<Apple.Color, Map<WeightLevel, List<Apple>>> myGroup3 = inventory.stream().collect(
        	Collectors.groupingBy(
        		Apple::getColor,
        		Collectors.groupingBy(
					apple -> {
	        			int weight = apple.getWeight();

	        			if(150 < weight) return WeightLevel.MORE150;
	        			else if(120 > weight) return WeightLevel.LESS120;
	        			else return WeightLevel.BETWEEN120AND150;
	        		}
        		)
        ));
        System.out.println(myGroup3);
        // {GREEN={MORE150=[GREEN Apple 170 g], BETWEEN120AND150=[GREEN Apple 120 g]}, RED={BETWEEN120AND150=[RED Apple 150 g], LESS120=[RED Apple 100 g]}}
    }
}
```

subgroups
passing collect().function in groupingBy() parameter
```java
import java.util.*;
import java.util.stream.Collectors;

public class MyClass {
    public static void main(String args[]) {
        class Apple {
          enum Color { RED, GREEN }
          
          private Color color;
          private int weight;
          
          public Apple(Color color, int weight) {
            this.color = color;
            this.weight = weight;
          }
          
          public Color getColor() { return color; }
          public int getWeight() { return weight; }
          
          public String toString() { return color + " Apple " + weight + " g" ; }
        }

        List<Apple> inventory = new ArrayList();
        inventory.add(new Apple(Apple.Color.RED, 100));
        inventory.add(new Apple(Apple.Color.GREEN, 120));
        inventory.add(new Apple(Apple.Color.RED, 150));
        inventory.add(new Apple(Apple.Color.GREEN, 170));

        enum WeightLevel { LESS120, BETWEEN120AND150, MORE150 }
        Map<Apple.Color, Map<WeightLevel, List<Apple>>> myGroup3 = inventory.stream().collect(
        	Collectors.groupingBy(
        		Apple::getColor,
        		Collectors.groupingBy(
					apple -> {
	        			int weight = apple.getWeight();

	        			if(150 < weight) return WeightLevel.MORE150;
	        			else if(120 > weight) return WeightLevel.LESS120;
	        			else return WeightLevel.BETWEEN120AND150;
	        		}
        		)
        ));
        System.out.println(myGroup3);
        // {GREEN={MORE150=[GREEN Apple 170 g], BETWEEN120AND150=[GREEN Apple 120 g]}, RED={BETWEEN120AND150=[RED Apple 150 g], LESS120=[RED Apple 100 g]}}

        Map<Apple.Color, Integer> myGroup6 = inventory.stream().collect(Collectors.groupingBy(Apple::getColor, Collectors.summingInt(Apple::getWeight)));
        System.out.println(myGroup6);
        // {RED=250, GREEN=290}
    }
}
```

Collectors.collectingAndThen()
```java
import java.util.*;
import java.util.stream.Collectors;

public class MyClass {
    public static void main(String args[]) {
        class Apple {
          enum Color { RED, GREEN }
          
          private Color color;
          private int weight;
          
          public Apple(Color color, int weight) {
            this.color = color;
            this.weight = weight;
          }
          
          public Color getColor() { return color; }
          public int getWeight() { return weight; }
          
          public String toString() { return color + " Apple " + weight + " g" ; }
        }

        List<Apple> inventory = new ArrayList();
        inventory.add(new Apple(Apple.Color.RED, 100));
        inventory.add(new Apple(Apple.Color.GREEN, 120));
        inventory.add(new Apple(Apple.Color.RED, 150));
        inventory.add(new Apple(Apple.Color.GREEN, 170));

        enum WeightLevel { LESS120, BETWEEN120AND150, MORE150 }
        Map<Apple.Color, Long> myGroup3 = inventory.stream().collect(Collectors.groupingBy(Apple::getColor, Collectors.counting()));
        System.out.println(myGroup3);
        // {GREEN=2, RED=2}
        
        Map<Apple.Color, Optional<Apple>> myGroup4 = inventory.stream().collect(Collectors.groupingBy(Apple::getColor, Collectors.maxBy(Comparator.comparingInt(Apple::getWeight))));
        System.out.println(myGroup4);
        // {GREEN=Optional[GREEN Apple 170 g], RED=Optional[RED Apple 150 g]}
        
        Map<Apple.Color, Apple> myGroup5 = inventory.stream().collect(Collectors.groupingBy(Apple::getColor, Collectors.collectingAndThen(Collectors.maxBy(Comparator.comparingInt(Apple::getWeight)), Optional::get)));
        System.out.println(myGroup5);
        // {RED=RED Apple 150 g, GREEN=GREEN Apple 170 g}
    }
}
```

Collectors.groupingBy(mapping())
```java

```