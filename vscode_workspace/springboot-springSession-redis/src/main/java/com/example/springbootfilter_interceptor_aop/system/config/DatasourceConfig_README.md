# javax.sql.DataSource
- JDBC API
- object which provides connection to database

# org.apache.ibatis.session.SqlSessionFactory
- JPA API
- responsible for creating `SqlSession` object

# org.mybatis.spring.SqlSessionTemplate
- JPA API
- simplifies the usage of `SqlSession`
```java
@Repository
// using sqlsessiontemplate
public class MyRepository {
    private final SqlSessionTemplate sqlSessionTemplate;
    public MyRepository(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
    public User getUserById(long id) {
        return sqlSessionTemplate.selectOne("getUserById", id);
    }
    @Transactional
    public void updateUser(User user) {
        sqlSessionTemplate.update("updateUser", user);
    }
}

// not using sqlsessiontemplate
@Repository
public class MyRepository {
    private final SqlSessionFactory sqlSessionFactory;
    public MyRepository(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }
    public User getUserById(long id) {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            return sqlSession.selectOne("getUserById", id);
        }
    }
    @Transactional
    public void updateUser(User user) {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            sqlSession.update("updateUser", user);
            sqlSession.commit();
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user", e);
        }
    }
}

```

# org.springframework.jdbc.datasource.DataSourceTransactionManager
- Spring framework
- manage database transactions
- ensure the consistency and reliability of data in a database.
  - provides an abstraction layer that allows you to perform database operations without having to write low-level database code. 
  - It handles things like connection management, transaction demarcation, and exception handling.