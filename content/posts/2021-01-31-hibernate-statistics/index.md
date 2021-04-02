---
title: Activate Hibernate Query Statistics to investigate your performance issues
author: Mark Brown
date: 2021-01-31
hero: ./images/needle.jpeg
slug: /hibernate-statistics
excerpt: In my experience, the number one cause of application performance problems is not your application code – it’s your persistence layer. Problems in this area can be caused by many different ‘sins’; Improper entity relationships (think LAZY vs EAGER fetching), Inefficient queries or indeed the cardinal sin – N+1 queries! A lot of the time the application can end up in this way as a result of a lack of awareness of what you are asking the persistence layer to do. Often, you’ll find that simply enabling logging of sql statements will open your eyes to the problem. In fact, when using a data access framework that generates statements on your behalf – it should be mandatory that you inspect the generated statements to ensure both their effectiveness, and their performance.
---

## 👋 Introduction
Often, you’re may find yourself wondering why application performance has degraded – and almost always that issue originates from your persistence layer. You can interrogate your query statistics in SQL Server using some of the built in ([Transact SQL](https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-query-stats-transact-sql?view=sql-server-ver15)) views – which have been invaluable before to me investigating issues in customer environments.

Sometimes, however, you don’t have access to the database, or the database technology in use does not provide its statistics (or you don’t know how to access them) – and the good news is, you can enable Hibernate config to log your query statistics!

## ⚙️ Configuration
By default, the statistic mechanism is disabled. To enable it, you must set the 'statistics' property; `spring.jpa.properties.hibernate.generate_statistics`, e.g;

```java
spring.jpa.properties.hibernate.generate_statistics=true
```

To see the statistics printed in the log, you need to enable the logging level. I recently found this logging particularly useful when investigating a test slow down – I enabled this on the test suite via test properties like below (working example can be found on my [GitHub](https://github.com/MTJB/blog-code-examples));

```java
@TestPropertySource(properties = [
    "spring.jpa.properties.hibernate.generate_statistics=true",
    "logging.level.org.hibernate.stat=debug"
])
```

## 🪵 Log output
With the configuration correctly enabled, the following output can be seen when running a simple count query;

```java
2021-01-31 19:32:48.547 DEBUG 13790 --- [           main] o.h.stat.internal.StatisticsImpl         : HHH000117: HQL: select count(*) from CarGarage x WHERE x.id = :id, time: 4ms, rows: 1 
2021-01-31 19:32:48.549  INFO 13790 --- [           main] i.StatisticalLoggingSessionEventListener : Session Metrics {
     16902 nanoseconds spent acquiring 1 JDBC connections;
     0 nanoseconds spent releasing 0 JDBC connections;
     528078 nanoseconds spent preparing 1 JDBC statements;
     2453571 nanoseconds spent executing 1 JDBC statements;
     0 nanoseconds spent executing 0 JDBC batches;
     0 nanoseconds spent performing 0 L2C puts;
     0 nanoseconds spent performing 0 L2C hits;
     0 nanoseconds spent performing 0 L2C misses;
     0 nanoseconds spent executing 0 flushes (flushing a total of 0 entities and 0 collections);
     12963 nanoseconds spent executing 1 partial-flushes (flushing a total of 0 entities and 0 collections)
```

As you can see specific query statistics can now be seen as well as the overall session statistics. My query returned 1 row (the count) in 4ms – obviously there is no performance issue in this example, but this is where they would start to show.

The session statistics also give detailed metrics of some low level operations – acquiring JDBC connections, preparing statements, cache hits, etc. If you find yourself in the unfortunate position that your need some of these metrics, they are invaluable!

## 🪡 Conclusion
When facing performance issues – the more tricks you have up your sleeve the better, and as you can see it is straightforward to enable Hibernate Query Statistics which could provide you with the tools to narrow down that needle in your haystack!