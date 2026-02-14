export const BLOG_POSTS = [
  {
    slug: 'postgresql-connection-pooling-pgbouncer-guide',
    title: 'PostgreSQL Connection Pooling: Why You Need PgBouncer and How to Configure It',
    description: 'Learn how PostgreSQL connection pooling with PgBouncer prevents connection exhaustion, reduces overhead, and scales your PGSQL database for production workloads.',
    date: '2025-02-14',
    keywords: ['PostgreSQL', 'connection pooling', 'PgBouncer', 'PGSQL', 'database connections', 'pgpool', 'connection limits', 'max_connections'],
    body: (
      <>
        <p>PostgreSQL has a hard connection limit defined by <code>max_connections</code>. Each connection consumes memory and CPU overhead. When you hit the limit, new connections are rejected and your application crashes. Connection pooling solves this by reusing existing connections instead of creating new ones for every request.</p>
        <p><strong>PgBouncer</strong> is the most popular connection pooler for PostgreSQL. It sits between your application and Postgres, maintaining a pool of connections and multiplexing client requests. This dramatically reduces connection overhead and allows thousands of clients to share a small pool of database connections.</p>
        <p>Common pooling modes: <strong>session pooling</strong> (connection held for entire client session), <strong>transaction pooling</strong> (connection released after each transaction), and <strong>statement pooling</strong> (connection released after each statement). Transaction pooling offers the best balance of performance and compatibility for most applications.</p>
        <p>Key metrics to monitor: active connections, idle connections, waiting clients, and pool utilization. If you see connections maxing out or long wait times, you may need to increase <code>max_connections</code> or tune your pool size.</p>
        <p><strong>pgSentry</strong> tracks connection counts and alerts you before you hit limits. It also highlights long-running connections that might be blocking the pool, so you can keep your database responsive under load.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-explain-analyze-query-optimization',
    title: 'Mastering PostgreSQL EXPLAIN ANALYZE: A Complete Guide to Query Optimization',
    description: 'Deep dive into PostgreSQL EXPLAIN ANALYZE output. Learn to read query plans, identify bottlenecks, fix sequential scans, and optimize PGSQL performance.',
    date: '2025-02-12',
    keywords: ['PostgreSQL', 'EXPLAIN ANALYZE', 'query optimization', 'PGSQL', 'query plan', 'sequential scan', 'index scan', 'performance tuning'],
    body: (
      <>
        <p><code>EXPLAIN ANALYZE</code> is the most powerful tool for understanding PostgreSQL query performance. It shows the query execution plan, actual row counts, timing, and resource usage. Reading the output correctly is the difference between guessing and knowing exactly where your query is slow.</p>
        <p>Key metrics to look for: <strong>Seq Scan</strong> (sequential scans are slow on large tables—add an index), <strong>Index Scan</strong> vs <strong>Index Only Scan</strong> (index-only scans are faster because they don't touch the table), <strong>Nested Loop</strong> vs <strong>Hash Join</strong> (join strategy depends on data size and selectivity), and <strong>rows vs actual rows</strong> (mismatches indicate stale statistics—run ANALYZE).</p>
        <p>Execution time vs planning time: if planning time is high, you may have too many indexes or partitions. If execution time dominates, the query needs optimization—add indexes, rewrite the query, or adjust <code>work_mem</code> for sorts and hashes.</p>
        <p>Common fixes: create a B-tree index for equality and range queries, use partial indexes for filtered queries, increase <code>work_mem</code> for large sorts, and run <code>VACUUM ANALYZE</code> to update table statistics.</p>
        <p><strong>pgSentry</strong> automatically identifies slow queries and highlights missing indexes. You get the context you need to optimize without manually running EXPLAIN on every query.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-high-availability-clustering-streaming-replication',
    title: 'PostgreSQL High Availability: Streaming Replication, Failover, and Clustering',
    description: 'Build a highly available PostgreSQL cluster with streaming replication, automatic failover, and read replicas. Essential PGSQL HA patterns for production.',
    date: '2025-02-10',
    keywords: ['PostgreSQL', 'high availability', 'clustering', 'streaming replication', 'failover', 'PGSQL', 'read replicas', 'Patroni', 'repmgr'],
    body: (
      <>
        <p>High availability (HA) in PostgreSQL means your database stays online even when hardware fails. The most common pattern is <strong>streaming replication</strong>: a primary server writes data, and one or more standby servers replicate changes in real time. If the primary fails, a standby is promoted to primary.</p>
        <p>PostgreSQL's built-in streaming replication uses <strong>WAL (Write-Ahead Log)</strong> shipping. Changes are written to WAL files on the primary and streamed to standbys. Standbys can be configured for <strong>synchronous</strong> replication (primary waits for standby acknowledgment) or <strong>asynchronous</strong> replication (primary doesn't wait—faster but risk of data loss).</p>
        <p>Automatic failover requires a cluster manager like <strong>Patroni</strong>, <strong>repmgr</strong>, or cloud-native solutions like AWS RDS Multi-AZ. These tools monitor the primary, detect failures, and promote a standby automatically. Without automation, failover is manual and slow.</p>
        <p>Read replicas distribute read traffic across standbys, reducing load on the primary. This is ideal for analytics, reporting, or read-heavy applications. Keep in mind: replicas lag slightly behind the primary, so you may read stale data.</p>
        <p>Critical HA metrics to monitor: replication lag (how far behind standbys are), replication slot status (inactive slots can fill disk with WAL), and standby health (is the standby connected and receiving WAL?).</p>
        <p><strong>pgSentry</strong> monitors replication lag and WAL retention, alerting you before a standby falls too far behind or before WAL files fill your disk and crash the primary.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-vacuum-autovacuum-tuning-guide',
    title: 'PostgreSQL VACUUM and Autovacuum Tuning: Stop Bloat Before It Kills Performance',
    description: 'Master PostgreSQL VACUUM and autovacuum tuning to prevent bloat, reclaim disk space, and keep your PGSQL database fast. Complete guide with real-world settings.',
    date: '2025-02-08',
    keywords: ['PostgreSQL', 'VACUUM', 'autovacuum', 'bloat', 'PGSQL', 'vacuum tuning', 'autovacuum settings', 'dead tuples'],
    body: (
      <>
        <p><code>VACUUM</code> is how PostgreSQL reclaims space from dead tuples left by UPDATEs and DELETEs. Without it, tables and indexes grow unchecked, wasting disk and slowing queries. <strong>Autovacuum</strong> runs automatically, but default settings often aren't aggressive enough for high-write workloads.</p>
        <p>How VACUUM works: it marks dead tuples as reusable space but doesn't shrink the table file. <code>VACUUM FULL</code> rewrites the table to reclaim space, but it locks the table and is slow—avoid it in production unless absolutely necessary.</p>
        <p>Key autovacuum settings: <code>autovacuum_vacuum_threshold</code> (minimum dead tuples before vacuum), <code>autovacuum_vacuum_scale_factor</code> (percentage of table size), <code>autovacuum_naptime</code> (how often autovacuum wakes up), and <code>autovacuum_max_workers</code> (parallel vacuum workers). For large tables, lower the scale factor or set per-table autovacuum settings.</p>
        <p>Monitor these metrics: dead tuple count, last vacuum time, and table bloat ratio. If a table hasn't been vacuumed recently or dead tuples are piling up, autovacuum is falling behind. Long-running transactions block VACUUM from reclaiming space, so watch for idle-in-transaction connections.</p>
        <p>Common issue: autovacuum running but still bloating? Check for long transactions, increase <code>autovacuum_max_workers</code>, or tune <code>autovacuum_cost_limit</code> to let it run faster.</p>
        <p><strong>pgSentry</strong> tracks bloat and last vacuum times, alerting you when tables need attention. You get actionable recommendations for autovacuum tuning based on your actual workload.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-index-types-btree-gin-gist-brin',
    title: 'PostgreSQL Index Types: B-tree, GIN, GiST, BRIN, and When to Use Each',
    description: 'Comprehensive guide to PostgreSQL index types. Learn when to use B-tree, GIN, GiST, BRIN, Hash indexes for optimal PGSQL query performance.',
    date: '2025-02-06',
    keywords: ['PostgreSQL', 'index types', 'B-tree', 'GIN', 'GiST', 'BRIN', 'PGSQL', 'indexes', 'indexing strategies'],
    body: (
      <>
        <p>PostgreSQL supports multiple index types, each optimized for different query patterns. Choosing the right index type can mean the difference between milliseconds and seconds for your queries.</p>
        <p><strong>B-tree</strong> is the default and most common index type. Use it for equality and range queries (<code>&lt;</code>, <code>&lt;=</code>, <code>=</code>, <code>&gt;=</code>, <code>&gt;</code>). B-tree indexes are balanced trees that keep data sorted, making them ideal for ORDER BY and WHERE clauses on scalar columns like integers, timestamps, and text.</p>
        <p><strong>GIN (Generalized Inverted Index)</strong> is for multi-value columns like arrays, JSONB, and full-text search. GIN indexes are larger and slower to update but extremely fast for containment queries (<code>@&gt;</code>, <code>?</code>, <code>@@</code>). Use GIN when querying JSON fields or searching within array values.</p>
        <p><strong>GiST (Generalized Search Tree)</strong> is for geometric data, full-text search, and range types. It supports nearest-neighbor searches and is commonly used with PostGIS for spatial queries. GiST indexes are smaller than GIN but slower for exact matches—choose based on your query pattern.</p>
        <p><strong>BRIN (Block Range INdex)</strong> is for very large tables with naturally ordered data (like time-series or log data). BRIN indexes are tiny and fast to create because they store min/max values per block range instead of indexing every row. Use BRIN when data is sorted by the indexed column and you query with range conditions.</p>
        <p><strong>Hash</strong> indexes are for exact equality matches only. They used to be discouraged but are now WAL-logged and crash-safe. B-tree is usually still better because it supports range queries, but Hash can be slightly faster for pure equality.</p>
        <p><strong>pgSentry</strong> tracks index usage and size, helping you identify unused indexes (wasting space) and missing indexes (causing slow queries). You get visibility into which indexes are actually helping performance.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-performance-tuning-configuration',
    title: 'PostgreSQL Performance Tuning: Essential Configuration Settings for Production',
    description: 'Optimize PostgreSQL performance with the right configuration. Tune shared_buffers, work_mem, effective_cache_size, and more for production PGSQL workloads.',
    date: '2025-02-04',
    keywords: ['PostgreSQL', 'performance tuning', 'configuration', 'PGSQL', 'shared_buffers', 'work_mem', 'postgresql.conf', 'database optimization'],
    body: (
      <>
        <p>PostgreSQL's default configuration is conservative and designed for minimal resource usage. For production workloads, you need to tune settings based on your hardware and query patterns. The most impactful settings are memory-related: <code>shared_buffers</code>, <code>work_mem</code>, <code>effective_cache_size</code>, and <code>maintenance_work_mem</code>.</p>
        <p><strong>shared_buffers</strong> is PostgreSQL's main cache for table and index pages. Set it to 25% of RAM on dedicated servers (not higher—OS cache is also important). For example, on a 16 GB server, use <code>shared_buffers = 4GB</code>. This reduces disk I/O by keeping hot data in memory.</p>
        <p><strong>work_mem</strong> is per-operation memory for sorts and hashes. If you see "external merge" in EXPLAIN output, queries are spilling to disk—increase <code>work_mem</code>. Start with 4-16 MB and increase cautiously (multiple operations can run in parallel, so total usage = work_mem × connections × operations).</p>
        <p><strong>effective_cache_size</strong> tells the planner how much memory is available for caching (OS cache + shared_buffers). Set it to 50-75% of RAM. This is a hint, not an allocation—it helps the planner choose better query plans by knowing how likely data is to be in memory.</p>
        <p><strong>maintenance_work_mem</strong> is for maintenance operations like VACUUM, CREATE INDEX, and ANALYZE. Set it higher than work_mem (e.g., 256 MB to 1 GB) to speed up these operations, especially on large tables.</p>
        <p>Other key settings: <code>max_connections</code> (connection limit—use connection pooling instead of raising this too high), <code>checkpoint_completion_target</code> (spread checkpoints over time to reduce I/O spikes), and <code>random_page_cost</code> (lower it to 1.1-2.0 for SSDs to favor index scans).</p>
        <p><strong>pgSentry</strong> provides configuration recommendations based on your database size and workload patterns. You get tuning suggestions without manually benchmarking or guessing.</p>
      </>
    ),
  },
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
