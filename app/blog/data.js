export const BLOG_POSTS = [
  {
    slug: 'postgresql-slow-queries-monitoring',
    title: 'Why PostgreSQL Slow Queries Go Unnoticed (and How to Fix It)',
    description: 'PostgreSQL slow queries can silently degrade your app. Learn how to detect, analyze, and fix them before users notice.',
    date: '2025-02-01',
    keywords: ['PostgreSQL', 'slow queries', 'query performance', 'PGSQL', 'database monitoring'],
    body: (
      <>
        <p>Slow queries are one of the biggest hidden killers of application performance. In PostgreSQL, a query that ran fine with 10K rows can suddenly take seconds once you hit millions. The problem? Most teams only notice when users complain or when the database starts throwing timeouts.</p>
        <p>PostgreSQL gives you powerful tools—<code>pg_stat_statements</code>, <code>EXPLAIN ANALYZE</code>, and the slow query log—but someone has to look at them. Without continuous monitoring, a single bad query or a missing index can slip into production and stay there for weeks.</p>
        <p><strong>pgSentry</strong> surfaces slow queries in your weekly health report and highlights them on the dashboard so you can fix issues before they become incidents. Connect your database once and get actionable insights without writing custom scripts or digging through logs.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-table-partitioning-guide',
    title: 'PostgreSQL Table Partitioning: When and How to Use It',
    description: 'A practical guide to PostgreSQL partitioning—when it helps, when it hurts, and how to monitor partitioned tables in production.',
    date: '2025-01-28',
    keywords: ['PostgreSQL', 'partitioning', 'table partitioning', 'PGSQL', 'database design'],
    body: (
      <>
        <p>Partitioning in PostgreSQL can dramatically improve query performance and manageability for large tables—especially time-series or log data. By splitting a table into smaller partitions, you can run faster range scans, drop old data quickly, and keep maintenance operations focused.</p>
        <p>But partitioning isn&apos;t free. Too many partitions can hurt planning time; wrong partition keys can leave you with unbalanced data. You need visibility into partition sizes, row counts, and query patterns to know if your partitioning strategy is working.</p>
        <p>With <strong>pgSentry</strong>, you get a clear view of your database health including table and index sizes. When you partition, you can track bloat and growth per partition and catch issues before they impact production.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-indexing-best-practices',
    title: 'PostgreSQL Indexing Best Practices for Production',
    description: 'Index too little and queries crawl; index too much and writes suffer. Learn indexing strategies that work for real Postgres workloads.',
    date: '2025-01-25',
    keywords: ['PostgreSQL', 'indexing', 'indexes', 'PGSQL', 'query optimization'],
    body: (
      <>
        <p>Indexes are what make PostgreSQL fast—but only when they&apos;re the right ones. Missing indexes lead to full table scans; unused indexes waste space and slow down every INSERT and UPDATE. Finding the balance requires knowing which queries run often, which indexes are used, and which are just bloat.</p>
        <p>PostgreSQL exposes this through <code>pg_stat_user_indexes</code> and <code>pg_stat_user_tables</code>. The challenge is turning that raw data into decisions: add an index here, drop one there, consider a partial or expression index.</p>
        <p><strong>pgSentry</strong> aggregates index usage and table stats in one place. Your weekly report highlights unused indexes and tables that might need better indexing, so you can optimize with confidence.</p>
      </>
    ),
  },
  {
    slug: 'postgres-replication-lag-wal-monitoring',
    title: 'Replication Lag and WAL: What Every Postgres DBA Should Monitor',
    description: 'Replication lag and WAL buildup can take down your primary. Here\'s what to monitor and how to avoid silent failures.',
    date: '2025-01-20',
    keywords: ['PostgreSQL', 'replication', 'WAL', 'replication lag', 'Postgres DBA'],
    body: (
      <>
        <p>Replication lag is the delay between the primary and standby. When it grows, your read replicas serve stale data and, in a failover, you risk losing recent writes. WAL (Write-Ahead Log) files can pile up if replicas fall behind or if replication slots aren&apos;t advancing—eventually filling disk and crashing the primary.</p>
        <p>These failures are often silent until it&apos;s too late. You need to track replication lag in real time and get alerted when it crosses a threshold. You also need to monitor WAL retention and slot activity.</p>
        <p><strong>pgSentry</strong> checks replication lag and WAL metrics on every health run. If something is off, you see it in the dashboard and in your weekly report—so you can fix it before an outage.</p>
      </>
    ),
  },
  {
    slug: 'postgres-bloat-control-monitoring',
    title: 'Postgres Bloat: Why Your Database Grows and How to Control It',
    description: 'Table and index bloat waste disk and slow down queries. Learn what causes bloat and how to keep it under control.',
    date: '2025-01-15',
    keywords: ['PostgreSQL', 'bloat', 'VACUUM', 'database size', 'PGSQL'],
    body: (
      <>
        <p>Bloat in PostgreSQL is dead space left behind by updates and deletes. Tables and indexes grow because MVCC keeps old row versions until VACUUM reclaims them. If VACUUM can&apos;t keep up—or if you have long-running transactions—bloat accumulates and your database gets bigger and slower.</p>
        <p>Monitoring bloat isn&apos;t trivial. You need to compare actual size to expected size based on row counts and estimate dead tuples. Many teams only notice when they run out of disk or when queries suddenly slow down.</p>
        <p><strong>pgSentry</strong> tracks table and index sizes over time and highlights bloat risk in your health report. You get early warning so you can tune autovacuum or run manual VACUUM before it becomes a crisis.</p>
      </>
    ),
  },
];
