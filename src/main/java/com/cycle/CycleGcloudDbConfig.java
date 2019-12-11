package com.cycle;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "cycleGcloudEntityManagerFactory",
    transactionManagerRef = "cycleGcloudTransactionManager", basePackages = {"com.cycle.gcloud.repository"})
public class CycleGcloudDbConfig {

  @Bean(name = "cycleGcloudDataSource")
  @ConfigurationProperties(prefix = "gcloud.datasource")
  public DataSource dataSource() {
    return DataSourceBuilder.create().build();
  }

  @Bean(name = "cycleGcloudEntityManagerFactory")
  public LocalContainerEntityManagerFactoryBean cycleGcloudEntityManagerFactory(
      EntityManagerFactoryBuilder builder, @Qualifier("cycleGcloudDataSource") DataSource dataSource) {
    return builder.dataSource(dataSource).packages("com.cycle.gcloud.model").persistenceUnit("jobhistory")
        .build();
  }

  @Bean(name = "cycleGcloudTransactionManager")
  public PlatformTransactionManager cycleGcloudTransactionManager(
      @Qualifier("cycleGcloudEntityManagerFactory") EntityManagerFactory cycleGcloudEntityManagerFactory) {
    return new JpaTransactionManager(cycleGcloudEntityManagerFactory);
  }

}
