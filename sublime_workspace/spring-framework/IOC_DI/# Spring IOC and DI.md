# Spring IOC and DI

## Contexts
application context
servlet context


## Java-based Configuration
- @Configuration
- @Bean
- @Import
- @DependsOn

## Dependency Injection
- Constructor Dependency Injection
- Setter based Dependency Injection
- Autowired Dependency Injection

@Lookup

# Bean scope
1. Singleton
2. Prototype
3. Request
4. Session
5. Application
6. Websocket

# Bean scope annotations
- @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
- @RequestScope
- @SessionScope
- @ApplicationScope
- 

# Bean proxy

# Bean lifecycle
- @PostConstruct
- @PreDestory

1. Methods annotated with @PostConstruct
2. afterPropertiesSet() as defined by the InitializingBean callback interface
3. A custom configured init() method
Destroy methods are called in the same order:
1. Methods annotated with @PreDestroy
2. destroy() as defined by the DisposableBean callback interface
3. A custom configured destroy() method

# Shutting down ioc container gracefully
// aware interfaces

? BeanPostProcessor
@Repository
@Inject
@Named
@Order
@Priority
@DependsOn
@Qualifier
@Resource
@Value

The @Autowired, @Inject, @Value, and @Resource annotations are handled by Spring
BeanPostProcessor implementations.