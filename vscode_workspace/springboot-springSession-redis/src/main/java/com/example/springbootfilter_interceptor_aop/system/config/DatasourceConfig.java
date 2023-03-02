package com.example.springbootfilter_interceptor_aop.system.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

@Configuration
public class DatasourceConfig {
	final private String h2DatabaseName;

	public DatasourceConfig(@Value("${h2.databaseName}") String h2DatabaseName) {
		this.h2DatabaseName = h2DatabaseName;
	}

	@Bean(name="h2DataSource")
	// @ConfigurationProperties(prefix="spring.datasource")
	public DataSource h2DataSource() {
		return new EmbeddedDatabaseBuilder()
		.setType(EmbeddedDatabaseType.H2)
		.setName(h2DatabaseName)
		.build();
	}

	@Bean(name="h2SessionFactory")
	public SqlSessionFactory sqlSessionFactory(
		ApplicationContext applicationContext,
		@Qualifier("h2DataSource") DataSource h2DataSource
	) throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(h2DataSource);
		sqlSessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:config/mybatis.xml"));
		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mapper/**/*.xml"));
		return sqlSessionFactoryBean.getObject();
	}

	// todo : research about SqlSessionTemplate
	// todo : research about DataTransactionManager
	/*
	@Bean(name = "h2SqlSessionTemplate")
	public SqlSessionTemplate mainSqlSessionTemplate(@Qualifier("h2SessionFactory") SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}

	@Bean(name = "h2Tx")
	DataSourceTransactionManager mainTx(@Qualifier("h2DataSource") DataSource datasource) {
		DataSourceTransactionManager txm  = new DataSourceTransactionManager(datasource);
		return txm;
	}
	*/
}