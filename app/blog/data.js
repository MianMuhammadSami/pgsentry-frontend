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
  {
    slug: 'postgresql-installation-setup-guide-beginners',
    title: 'PostgreSQL Installation Guide: Setup for Beginners on Windows, Mac, and Linux',
    description: 'Complete beginner guide to installing PostgreSQL. Step-by-step instructions for Windows, macOS, Linux with Docker. First-time PGSQL setup made easy.',
    date: '2025-02-16',
    keywords: ['PostgreSQL installation', 'install PostgreSQL', 'PostgreSQL setup', 'PGSQL beginner', 'PostgreSQL Windows', 'PostgreSQL Mac', 'PostgreSQL Linux', 'PostgreSQL Docker'],
    body: (
      <>
        <p>Starting with PostgreSQL? Installation is your first step, and it&apos;s easier than you think. PostgreSQL runs on Windows, macOS, and Linux, and you can have it running in minutes. This guide walks you through installation on each platform plus Docker for containerized setups.</p>
        <p><strong>Windows:</strong> Download the installer from postgresql.org, run it, and follow the wizard. You&apos;ll set a password for the <code>postgres</code> superuser and choose components (pgAdmin is included for GUI management). Default port is 5432. After installation, verify with <code>psql --version</code> in Command Prompt.</p>
        <p><strong>macOS:</strong> Use Homebrew for the simplest install: <code>brew install postgresql</code>. Start the service with <code>brew services start postgresql</code>. Alternatively, download Postgres.app for a GUI-based installation. Verify with <code>psql --version</code> in Terminal.</p>
        <p><strong>Linux (Ubuntu/Debian):</strong> Use apt: <code>sudo apt update && sudo apt install postgresql postgresql-contrib</code>. The service starts automatically. Switch to the postgres user with <code>sudo -u postgres psql</code> to access the database.</p>
        <p><strong>Docker:</strong> For isolated environments or development, use Docker: <code>docker run --name postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres</code>. This pulls the latest PostgreSQL image and runs it in a container. Connect with <code>psql -h localhost -U postgres</code>.</p>
        <p>After installation, create your first database with <code>CREATE DATABASE mydb;</code> and connect to it with <code>\c mydb</code>. You&apos;re now ready to create tables and run queries. Next, explore basic tools like psql (command line), pgAdmin (GUI), or modern clients like DBeaver.</p>
        <p><strong>pgSentry</strong> helps you monitor your PostgreSQL database from day one. Connect your instance and get insights into performance, slow queries, and health—perfect for learning what good database behavior looks like as you grow.</p>
      </>
    ),
  },
  {
    slug: 'essential-postgresql-tools-beginners-must-have',
    title: 'Essential PostgreSQL Tools Every Beginner Needs in 2026',
    description: 'First time using PostgreSQL? Here are the must-have tools: psql, pgAdmin, monitoring, backup tools, and more. Complete PGSQL beginner toolkit.',
    date: '2025-02-15',
    keywords: ['PostgreSQL tools', 'PGSQL tools', 'psql', 'pgAdmin', 'PostgreSQL GUI', 'database tools', 'PostgreSQL beginners', 'pg_dump', 'PostgreSQL monitoring'],
    body: (
      <>
        <p>When you&apos;re new to PostgreSQL, the ecosystem can feel overwhelming. Which tools do you actually need? Here&apos;s the essential toolkit that will take you from beginner to confident PGSQL user.</p>
        <p><strong>1. psql (Command-Line Client):</strong> Comes with every PostgreSQL installation. It&apos;s the fastest way to run queries, manage databases, and debug. Learn basic commands like <code>\l</code> (list databases), <code>\dt</code> (list tables), <code>\d table_name</code> (describe table), and <code>\q</code> (quit). Mastering psql makes you faster and more confident.</p>
        <p><strong>2. pgAdmin (GUI Client):</strong> The official PostgreSQL GUI. Perfect for visual database management—create tables with a point-and-click interface, write queries with autocomplete, visualize schemas, and monitor activity. Great for beginners who prefer GUIs over command-line tools. Download from pgadmin.org.</p>
        <p><strong>3. DBeaver (Multi-Database Client):</strong> Modern, free, and cross-platform. Supports PostgreSQL plus dozens of other databases. Features include ER diagrams, SQL editor with autocomplete, data export/import, and built-in SSH tunneling. Ideal if you work with multiple database systems.</p>
        <p><strong>4. pg_dump and pg_restore (Backup Tools):</strong> Built-in tools for backing up and restoring databases. <code>pg_dump mydb &gt; backup.sql</code> creates a backup; <code>psql mydb &lt; backup.sql</code> restores it. Essential for protecting your data and migrating between environments. Learn these early—backups save careers.</p>
        <p><strong>5. pgSentry (Monitoring and Health):</strong> Even as a beginner, you need visibility. <strong>pgSentry</strong> monitors slow queries, connection counts, bloat, and more. You get weekly health reports that teach you what to watch for and alerts when something needs attention. It&apos;s like having a senior DBA reviewing your database.</p>
        <p><strong>6. TablePlus or Postico (Modern GUI):</strong> Lightweight, fast, and beautiful GUI clients. Easier to learn than pgAdmin with cleaner interfaces. TablePlus supports multiple databases; Postico is Mac-only and PostgreSQL-focused. Both offer free tiers.</p>
        <p><strong>7. Docker (Containerization):</strong> Not PostgreSQL-specific, but invaluable for running isolated test environments. Spin up a fresh PostgreSQL instance in seconds, experiment without affecting production, and tear it down when done. Essential for modern development workflows.</p>
        <p>Start with psql and pgAdmin to get comfortable. Add pgSentry for monitoring, pg_dump for backups, and Docker for safe experimentation. As you grow, explore advanced tools like connection poolers (PgBouncer) and replication managers (Patroni).</p>
      </>
    ),
  },
  {
    slug: 'postgresql-data-types-complete-guide',
    title: 'PostgreSQL Data Types: Complete Guide for Choosing the Right Type',
    description: 'Master PostgreSQL data types: integers, text, timestamps, JSON, arrays, and more. Learn which PGSQL type to use for optimal storage and performance.',
    date: '2025-02-13',
    keywords: ['PostgreSQL data types', 'PGSQL types', 'integer', 'varchar', 'text', 'timestamp', 'JSON', 'JSONB', 'arrays', 'PostgreSQL types guide'],
    body: (
      <>
        <p>Choosing the right data type in PostgreSQL affects storage size, query performance, and data integrity. PostgreSQL offers rich type support—from basic integers and strings to advanced types like JSONB, arrays, and custom types. Here&apos;s what you need to know.</p>
        <p><strong>Integer Types:</strong> Use <code>SMALLINT</code> for -32,768 to 32,767, <code>INTEGER</code> for -2 billion to 2 billion, and <code>BIGINT</code> for very large numbers. Use <code>SERIAL</code> for auto-incrementing IDs (it&apos;s an INTEGER with automatic sequence). Most apps use INTEGER for IDs unless you expect billions of rows—then use BIGINT.</p>
        <p><strong>Text Types:</strong> <code>VARCHAR(n)</code> limits length to n characters, <code>TEXT</code> has no limit, and <code>CHAR(n)</code> pads with spaces (rarely needed). In PostgreSQL, TEXT and VARCHAR have the same performance—use TEXT for simplicity unless you need a length constraint for validation.</p>
        <p><strong>Timestamps:</strong> Use <code>TIMESTAMP</code> for date + time without timezone, or <code>TIMESTAMPTZ</code> (timestamp with time zone) for storing UTC times. Always prefer TIMESTAMPTZ for application data—it stores in UTC and converts to your session&apos;s timezone on retrieval, preventing timezone bugs.</p>
        <p><strong>JSON vs JSONB:</strong> <code>JSON</code> stores text as-is, <code>JSONB</code> stores binary format. JSONB is almost always the right choice: it&apos;s faster for queries, supports indexing with GIN, and validates JSON on insert. Use JSON only if you need to preserve exact formatting and whitespace.</p>
        <p><strong>Arrays:</strong> PostgreSQL supports arrays for any data type: <code>INTEGER[]</code>, <code>TEXT[]</code>, etc. Useful for storing lists like tags or categories without creating a join table. Query with <code>ANY</code>, <code>ALL</code>, or <code>@&gt;</code> (contains) operators. Index with GIN for fast containment searches.</p>
        <p><strong>Boolean:</strong> Simple <code>TRUE</code> or <code>FALSE</code>. Stored as a single byte. Always use BOOLEAN instead of integers or strings for true/false values—it&apos;s clearer and more efficient.</p>
        <p><strong>UUID:</strong> 128-bit globally unique identifiers. Use <code>UUID</code> type with <code>gen_random_uuid()</code> for distributed systems where auto-increment IDs don&apos;t work. Slightly larger than BIGINT but eliminates collision risk.</p>
        <p><strong>pgSentry</strong> helps you spot inefficient schemas—like using TEXT when VARCHAR with a limit would enforce data quality, or missing indexes on JSONB columns that are frequently queried. You get recommendations tailored to your actual usage.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-transactions-acid-isolation-levels',
    title: 'PostgreSQL Transactions and ACID: Understanding Isolation Levels and Concurrency',
    description: 'Deep dive into PostgreSQL transactions, ACID properties, and isolation levels. Learn when to use Read Committed, Repeatable Read, and Serializable in PGSQL.',
    date: '2025-02-11',
    keywords: ['PostgreSQL transactions', 'ACID', 'isolation levels', 'PGSQL', 'Read Committed', 'Repeatable Read', 'Serializable', 'concurrency control'],
    body: (
      <>
        <p>Transactions are the foundation of reliable database operations. PostgreSQL implements full ACID compliance: <strong>Atomicity</strong> (all or nothing), <strong>Consistency</strong> (data integrity), <strong>Isolation</strong> (concurrent transactions don&apos;t interfere), and <strong>Durability</strong> (committed data persists). Understanding isolation levels is key to building correct concurrent applications.</p>
        <p>PostgreSQL offers three isolation levels: <strong>Read Committed</strong> (default), <strong>Repeatable Read</strong>, and <strong>Serializable</strong>. Each trades off between performance and consistency.</p>
        <p><strong>Read Committed:</strong> Each statement sees data committed before it started. Other transactions&apos; changes become visible mid-transaction. This is the default and works for most applications. It prevents dirty reads but allows non-repeatable reads and phantom reads. Example: SELECT sees updated rows from concurrent transactions.</p>
        <p><strong>Repeatable Read:</strong> All queries in a transaction see a snapshot of the database as of the transaction start. Prevents non-repeatable reads and phantom reads (in PostgreSQL—stricter than the SQL standard). Use when you need consistent reads across multiple queries, like generating reports or complex calculations. Concurrent updates may cause serialization errors—your app must retry.</p>
        <p><strong>Serializable:</strong> Guarantees transactions execute as if they ran one at a time, even when running concurrently. Prevents all anomalies but has the highest performance cost. PostgreSQL uses <strong>Serializable Snapshot Isolation (SSI)</strong> to detect conflicts and abort transactions that would violate serializability. Use for financial systems, inventory management, or anywhere data consistency is critical.</p>
        <p>Set isolation level per transaction: <code>BEGIN ISOLATION LEVEL REPEATABLE READ;</code> or per session: <code>SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL SERIALIZABLE;</code>.</p>
        <p>Common concurrency issues: <strong>lost updates</strong> (two transactions update the same row—use SELECT FOR UPDATE to lock), <strong>write skew</strong> (transactions read overlapping data and write based on stale reads—use Serializable), and <strong>deadlocks</strong> (two transactions wait for each other—PostgreSQL detects and aborts one).</p>
        <p><strong>pgSentry</strong> monitors long-running transactions and locks, alerting you when transactions are blocking others or when deadlocks occur frequently. You get visibility into transaction health without digging through logs.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-json-jsonb-queries-indexing',
    title: 'PostgreSQL JSON and JSONB: Querying, Indexing, and Best Practices',
    description: 'Master PostgreSQL JSONB: store, query, and index JSON data efficiently. Complete guide to JSON operators, GIN indexes, and PGSQL JSON best practices.',
    date: '2025-02-09',
    keywords: ['PostgreSQL JSON', 'JSONB', 'JSON queries', 'PGSQL', 'JSON indexing', 'GIN index', 'JSON operators', 'NoSQL PostgreSQL'],
    body: (
      <>
        <p>PostgreSQL&apos;s JSONB support makes it a powerful hybrid database—relational structure with NoSQL flexibility. You can store, query, and index JSON data natively without sacrificing ACID guarantees or SQL capabilities. Here&apos;s how to use JSONB effectively.</p>
        <p><strong>JSON vs JSONB:</strong> Always use <code>JSONB</code> (binary JSON) instead of <code>JSON</code>. JSONB is faster for queries, supports indexing, and validates JSON structure on insert. JSON is plain text storage—only use it if you need to preserve exact formatting.</p>
        <p><strong>Querying JSONB:</strong> Use <code>-&gt;</code> to extract JSON objects (returns JSONB), <code>-&gt;&gt;</code> to extract as text, <code>#&gt;</code> for nested paths, and <code>@&gt;</code> for containment. Examples: <code>data-&gt;&apos;user&apos;-&gt;&gt;&apos;name&apos;</code> extracts name as text; <code>data @&gt; &apos;{'{'}&#34;status&#34;: &#34;active&#34;{'}'}&apos;</code> finds rows where data contains that key-value.</p>
        <p><strong>Indexing JSONB:</strong> Create a GIN index for fast containment queries: <code>CREATE INDEX idx_data ON table USING GIN (data);</code>. This speeds up <code>@&gt;</code>, <code>?</code>, <code>?|</code>, and <code>?&</code> operators. For specific keys, use expression indexes: <code>CREATE INDEX idx_status ON table ((data-&gt;&gt;&apos;status&apos;));</code> for faster equality checks.</p>
        <p><strong>Common patterns:</strong> Store flexible user preferences, event payloads, configuration objects, or API responses as JSONB. Combine with relational columns—put frequently queried fields as columns and use JSONB for flexible metadata. Example: <code>users</code> table with <code>email</code> (indexed column) and <code>profile</code> (JSONB for bio, links, settings).</p>
        <p><strong>Performance tips:</strong> Keep JSONB documents small (a few KB, not MB). Extract frequently queried fields into columns with indexes. Use partial indexes for specific JSON conditions: <code>CREATE INDEX idx_active ON table ((data-&gt;&gt;&apos;status&apos;)) WHERE data-&gt;&gt;&apos;status&apos; = &apos;active&apos;;</code>. Avoid querying deeply nested structures repeatedly—flatten into separate columns if needed.</p>
        <p><strong>Aggregations and updates:</strong> Aggregate with <code>jsonb_agg</code> to build JSON arrays, <code>jsonb_object_agg</code> for objects. Update specific keys with <code>jsonb_set</code>: <code>UPDATE table SET data = jsonb_set(data, &apos;{'{'}key{'}'}&apos;, &apos;&#34;new value&#34;&apos;);</code>. Delete keys with <code>-</code> operator: <code>data - &apos;key&apos;</code>.</p>
        <p><strong>pgSentry</strong> helps you identify slow JSONB queries and missing GIN indexes. You&apos;ll see which JSON columns are queried frequently without indexes, so you can optimize without guesswork.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-backup-restore-strategies',
    title: 'PostgreSQL Backup and Restore: Complete Guide to Data Protection Strategies',
    description: 'Protect your PostgreSQL data with the right backup strategy. Learn pg_dump, pg_basebackup, WAL archiving, PITR, and cloud backups for PGSQL.',
    date: '2025-02-07',
    keywords: ['PostgreSQL backup', 'pg_dump', 'pg_basebackup', 'PGSQL backup', 'database backup', 'point in time recovery', 'PITR', 'WAL archiving'],
    body: (
      <>
        <p>Backups are non-negotiable. Disk failures, accidental deletes, ransomware, or bad migrations can destroy your data in seconds. PostgreSQL offers multiple backup strategies—logical, physical, and continuous archiving. The right approach depends on your data size, recovery time objectives (RTO), and recovery point objectives (RPO).</p>
        <p><strong>Logical Backups (pg_dump):</strong> Exports database as SQL or custom format. Use <code>pg_dump dbname &gt; backup.sql</code> for plain SQL or <code>pg_dump -Fc dbname &gt; backup.dump</code> for compressed custom format. Restore with <code>psql dbname &lt; backup.sql</code> or <code>pg_restore -d dbname backup.dump</code>. Pros: portable, easy to restore specific tables, works across PostgreSQL versions. Cons: slow for large databases (100+ GB), downtime during restore.</p>
        <p><strong>Physical Backups (pg_basebackup):</strong> Copies the entire data directory at the file level. Use <code>pg_basebackup -D /backup/dir -Ft -z -P</code> to create a compressed tarball. Pros: fast for large databases, exact binary copy. Cons: must restore to same PostgreSQL major version, requires more disk space, can&apos;t restore individual tables.</p>
        <p><strong>Continuous Archiving and PITR (Point-In-Time Recovery):</strong> Combines a base backup with WAL (Write-Ahead Log) archiving. Configure <code>archive_mode = on</code> and <code>archive_command</code> in postgresql.conf to copy WAL files to safe storage. Take periodic base backups with pg_basebackup. To restore, apply the base backup and replay WAL files up to a specific timestamp. Pros: minimal data loss (RPO in seconds), restore to any point in time. Cons: complex setup, requires monitoring WAL archiving.</p>
        <p><strong>Cloud-Managed Backups:</strong> Services like AWS RDS, Google Cloud SQL, and Azure Database for PostgreSQL offer automated backups with point-in-time recovery. Pros: fully managed, no configuration. Cons: vendor lock-in, higher cost, limited control over backup location.</p>
        <p><strong>Backup Best Practices:</strong> Automate backups with cron jobs or systemd timers. Test restores regularly—untested backups are useless. Store backups off-site (different datacenter, cloud storage like S3). Encrypt backups for sensitive data. Monitor backup success and storage space—failed backups are silent killers.</p>
        <p><strong>Backup Tools:</strong> Use <strong>pgBackRest</strong> or <strong>Barman</strong> for enterprise-grade backup management—both support incremental backups, compression, encryption, and automated retention policies. For simple setups, pg_dump with cron is enough.</p>
        <p><strong>pgSentry</strong> doesn&apos;t replace backups, but it monitors your database health so you catch issues before they require restoring from backup. It tracks bloat, slow queries, and replication lag—preventing data loss scenarios in the first place.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-foreign-keys-constraints-relationships',
    title: 'PostgreSQL Foreign Keys and Constraints: Enforcing Data Integrity',
    description: 'Master PostgreSQL constraints: foreign keys, unique, check, not null. Learn how to enforce referential integrity and data quality in PGSQL.',
    date: '2025-02-05',
    keywords: ['PostgreSQL foreign keys', 'constraints', 'PGSQL', 'referential integrity', 'unique constraint', 'check constraint', 'database design'],
    body: (
      <>
        <p>Constraints are PostgreSQL&apos;s way of enforcing data integrity at the database level. Instead of relying on application code to validate data, constraints guarantee correctness—preventing invalid data from ever being inserted. Here&apos;s how to use them effectively.</p>
        <p><strong>Foreign Keys:</strong> Enforce referential integrity between tables. Example: <code>orders</code> table references <code>users</code> via <code>user_id</code>. Define with <code>FOREIGN KEY (user_id) REFERENCES users(id)</code>. PostgreSQL prevents inserting orders with non-existent user_id and (by default) prevents deleting users with existing orders. Use <code>ON DELETE CASCADE</code> to auto-delete child rows or <code>ON DELETE SET NULL</code> to nullify references.</p>
        <p><strong>Unique Constraints:</strong> Ensure column values are unique across rows. Use <code>UNIQUE (email)</code> to prevent duplicate emails. Unlike primary keys, unique constraints allow multiple NULLs (since NULL ≠ NULL in SQL). Create multi-column unique constraints for composite uniqueness: <code>UNIQUE (tenant_id, username)</code>.</p>
        <p><strong>Check Constraints:</strong> Enforce arbitrary conditions. Examples: <code>CHECK (age &gt;= 18)</code>, <code>CHECK (price &gt; 0)</code>, <code>CHECK (status IN (&apos;active&apos;, &apos;inactive&apos;, &apos;pending&apos;))</code>. PostgreSQL validates on every INSERT and UPDATE. Keep checks simple—complex logic should go in triggers or application code.</p>
        <p><strong>Not Null Constraints:</strong> Prevent NULL values. Use <code>NOT NULL</code> on columns that must always have a value, like <code>email NOT NULL</code>. This is stricter than check constraints and clearer to read.</p>
        <p><strong>Primary Keys:</strong> Combination of UNIQUE and NOT NULL. Every table should have a primary key—usually an auto-incrementing <code>SERIAL</code> or <code>BIGSERIAL</code> column named <code>id</code>. Primary keys are automatically indexed for fast lookups.</p>
        <p><strong>Performance considerations:</strong> Foreign key checks add overhead on writes—PostgreSQL must verify the referenced row exists. Index the foreign key column for fast lookups: <code>CREATE INDEX idx_user_id ON orders(user_id);</code>. Unique constraints create implicit indexes automatically.</p>
        <p><strong>Deferrable constraints:</strong> By default, constraints are checked immediately. Use <code>DEFERRABLE INITIALLY DEFERRED</code> to delay checks until transaction commit—useful for circular foreign keys or bulk imports where rows are temporarily invalid.</p>
        <p><strong>pgSentry</strong> helps you identify missing foreign key indexes (a common performance issue) and tables without primary keys. You get recommendations to improve schema design and query performance.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-security-best-practices',
    title: 'PostgreSQL Security Best Practices: Hardening Your Database in Production',
    description: 'Secure your PostgreSQL database: authentication, SSL, roles, permissions, pg_hba.conf, and more. Complete PGSQL security hardening guide.',
    date: '2025-02-03',
    keywords: ['PostgreSQL security', 'PGSQL security', 'database security', 'pg_hba.conf', 'SSL', 'roles', 'permissions', 'authentication'],
    body: (
      <>
        <p>PostgreSQL security is multi-layered: network access, authentication, authorization, and encryption. A single misconfiguration can expose sensitive data or allow unauthorized access. Here&apos;s how to lock down your database for production.</p>
        <p><strong>1. Restrict Network Access:</strong> Use <code>pg_hba.conf</code> to control which hosts can connect. Default <code>trust</code> authentication allows passwordless local connections—change it to <code>md5</code> or <code>scram-sha-256</code> (stronger). Example: <code>host all all 0.0.0.0/0 scram-sha-256</code> requires password for all remote connections. Prefer <code>hostssl</code> to enforce SSL encryption.</p>
        <p><strong>2. Enable SSL/TLS:</strong> Encrypt connections to prevent eavesdropping. Set <code>ssl = on</code> in postgresql.conf and configure certificates. Clients connect with <code>sslmode=require</code> or <code>sslmode=verify-full</code> (validates server certificate). Never send passwords over unencrypted connections.</p>
        <p><strong>3. Use Strong Authentication:</strong> Prefer <code>scram-sha-256</code> over <code>md5</code> for password hashing. Rotate passwords regularly. For cloud or enterprise environments, use certificate-based authentication or integrate with LDAP/Active Directory. Avoid storing passwords in connection strings—use environment variables or secret managers.</p>
        <p><strong>4. Implement Role-Based Access Control (RBAC):</strong> Never use the <code>postgres</code> superuser for applications. Create roles with minimal privileges: <code>CREATE ROLE app_user WITH LOGIN PASSWORD &apos;...&apos;;</code>. Grant only necessary permissions: <code>GRANT SELECT, INSERT, UPDATE ON table TO app_user;</code>. Use <code>GRANT USAGE ON SCHEMA</code> to control schema access.</p>
        <p><strong>5. Principle of Least Privilege:</strong> Applications should have read/write access only to their tables, not superuser privileges. Create separate roles for read-only analytics, migrations (with DDL rights), and application writes. Revoke public permissions: <code>REVOKE ALL ON DATABASE dbname FROM PUBLIC;</code>.</p>
        <p><strong>6. Audit and Logging:</strong> Enable query logging for security audits. Set <code>log_connections = on</code>, <code>log_disconnections = on</code>, and <code>log_statement = &apos;ddl&apos;</code> to log schema changes. Use <code>pgaudit</code> extension for detailed audit trails in regulated industries.</p>
        <p><strong>7. Prevent SQL Injection:</strong> Always use parameterized queries or prepared statements—never concatenate user input into SQL strings. PostgreSQL supports <code>$1</code>, <code>$2</code> placeholders for safe query parameterization. ORMs like SQLAlchemy and ActiveRecord do this automatically.</p>
        <p><strong>8. Row-Level Security (RLS):</strong> Enforce data isolation at the row level. Example: multi-tenant apps where users should only see their own data. Enable RLS on a table: <code>ALTER TABLE table ENABLE ROW LEVEL SECURITY;</code> and create policies: <code>CREATE POLICY tenant_isolation ON table USING (tenant_id = current_setting(&apos;app.tenant_id&apos;)::int);</code>.</p>
        <p><strong>pgSentry</strong> monitors database activity, highlighting unusual connection patterns, failed login attempts, and permission changes. You get alerts when security-relevant events occur, so you can respond before a breach.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-window-functions-guide',
    title: 'PostgreSQL Window Functions: Advanced SQL for Analytics and Reporting',
    description: 'Master PostgreSQL window functions: ROW_NUMBER, RANK, LAG, LEAD, and more. Write powerful analytical queries with PGSQL window functions.',
    date: '2025-02-02',
    keywords: ['PostgreSQL window functions', 'PGSQL', 'ROW_NUMBER', 'RANK', 'PARTITION BY', 'SQL analytics', 'LAG', 'LEAD', 'advanced SQL'],
    body: (
      <>
        <p>Window functions are PostgreSQL&apos;s superpower for analytics, reporting, and complex aggregations. Unlike GROUP BY, window functions compute across rows <em>without collapsing them</em>—you get aggregated values alongside individual row data. This unlocks queries that are impossible or painful with standard SQL.</p>
        <p><strong>Basic syntax:</strong> <code>function() OVER (PARTITION BY column ORDER BY column)</code>. The <code>OVER</code> clause defines the window. <code>PARTITION BY</code> groups rows (like GROUP BY), <code>ORDER BY</code> orders within each partition, and the frame clause (optional) defines the row range to compute over.</p>
        <p><strong>ROW_NUMBER():</strong> Assigns unique sequential numbers within each partition. Example: <code>ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)</code> numbers each user&apos;s rows from newest to oldest. Use it to get the top N rows per group: <code>WHERE row_num &lt;= 5</code>.</p>
        <p><strong>RANK() and DENSE_RANK():</strong> Assign ranks, handling ties differently. <code>RANK()</code> leaves gaps (1, 2, 2, 4), <code>DENSE_RANK()</code> doesn&apos;t (1, 2, 2, 3). Example: rank sales by revenue within each region: <code>RANK() OVER (PARTITION BY region ORDER BY revenue DESC)</code>.</p>
        <p><strong>LAG() and LEAD():</strong> Access previous or next row values. <code>LAG(column, 1)</code> gets the previous row&apos;s value, <code>LEAD(column, 1)</code> gets the next. Example: calculate day-over-day change: <code>value - LAG(value) OVER (ORDER BY date)</code>. Perfect for time-series analysis.</p>
        <p><strong>SUM(), AVG(), COUNT() as window functions:</strong> Compute running totals or moving averages. Example: running total of sales: <code>SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)</code>. 7-day moving average: <code>AVG(value) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</code>.</p>
        <p><strong>FIRST_VALUE() and LAST_VALUE():</strong> Get first or last value in the window. Example: compare each row to the partition&apos;s first value: <code>value - FIRST_VALUE(value) OVER (PARTITION BY category ORDER BY date)</code>. Useful for calculating changes from a baseline.</p>
        <p><strong>Frame clauses:</strong> Define the row range for computation. <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> includes all rows from start to current (running total). <code>RANGE BETWEEN 1 PRECEDING AND 1 FOLLOWING</code> uses value-based ranges instead of physical rows. Defaults to RANGE UNBOUNDED PRECEDING to CURRENT ROW.</p>
        <p><strong>Performance tips:</strong> Window functions can be expensive on large datasets. Index columns used in <code>PARTITION BY</code> and <code>ORDER BY</code>. Avoid redundant window clauses—define once with <code>WINDOW w AS (...)</code> and reuse: <code>ROW_NUMBER() OVER w</code>. Use CTEs to break complex queries into readable steps.</p>
        <p><strong>pgSentry</strong> identifies slow analytical queries and highlights missing indexes on partition and order columns. You get visibility into which window function queries need optimization.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-common-table-expressions-cte-recursive',
    title: 'PostgreSQL CTEs (WITH Queries): Simplify Complex Queries with Common Table Expressions',
    description: 'Master PostgreSQL Common Table Expressions (CTEs) and recursive queries. Learn WITH syntax, recursive CTEs, and PGSQL query organization.',
    date: '2025-01-30',
    keywords: ['PostgreSQL CTE', 'Common Table Expressions', 'WITH query', 'recursive CTE', 'PGSQL', 'SQL optimization', 'query readability'],
    body: (
      <>
        <p>Common Table Expressions (CTEs) make complex SQL readable and maintainable. Using the <code>WITH</code> clause, you define temporary named result sets that exist only for the query. CTEs are perfect for breaking down multi-step logic, improving readability, and (with recursive CTEs) querying hierarchical data.</p>
        <p><strong>Basic CTE syntax:</strong> <code>WITH cte_name AS (SELECT ...) SELECT * FROM cte_name;</code>. The CTE runs first, then the main query references it like a table. You can chain multiple CTEs: <code>WITH cte1 AS (...), cte2 AS (SELECT * FROM cte1) SELECT * FROM cte2;</code>.</p>
        <p><strong>Why use CTEs?</strong> Readability—complex queries become step-by-step logic. Reusability—reference the same subquery multiple times without repeating code. Debugging—test each CTE independently. Alternative to subqueries and temp tables without the overhead.</p>
        <p><strong>Recursive CTEs:</strong> Query hierarchical or graph data like org charts, categories, or bill of materials. Syntax: <code>WITH RECURSIVE cte AS (base_query UNION ALL recursive_query) SELECT * FROM cte;</code>. Base query provides starting rows, recursive query references the CTE itself to traverse relationships.</p>
        <p><strong>Example: Employee hierarchy:</strong> <code>WITH RECURSIVE emp_tree AS (SELECT id, name, manager_id, 1 AS level FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, et.level + 1 FROM employees e JOIN emp_tree et ON e.manager_id = et.id) SELECT * FROM emp_tree ORDER BY level;</code>. Starts with top-level managers (NULL manager_id), then recursively finds their reports.</p>
        <p><strong>Performance considerations:</strong> CTEs in PostgreSQL 12+ are inlined (optimized like subqueries) unless you add <code>MATERIALIZED</code>: <code>WITH cte AS MATERIALIZED (...)</code> forces evaluation once and reuse. Use <code>MATERIALIZED</code> when the CTE is expensive and referenced multiple times. Use <code>NOT MATERIALIZED</code> to force inlining for better optimization.</p>
        <p><strong>Recursive CTE gotchas:</strong> Infinite loops—ensure the recursive part eventually returns no rows (use WHERE conditions or limits). Performance—unbounded recursion can be slow; add <code>WHERE level &lt; 10</code> to limit depth. Cycles—use an array to track visited nodes: <code>SELECT ..., path || id AS path FROM cte WHERE NOT id = ANY(path)</code>.</p>
        <p><strong>CTEs vs subqueries:</strong> CTEs are more readable and reusable. Subqueries are evaluated per reference (unless optimized away). CTEs can be materialized for explicit control. Use CTEs for complex multi-step queries; use subqueries for simple one-off filters.</p>
        <p><strong>pgSentry</strong> helps you identify slow CTEs and recursive queries that might benefit from indexing or query restructuring. You get insights into execution plans so you can optimize without guesswork.</p>
      </>
    ),
  },
  {
    slug: 'postgresql-full-text-search-guide',
    title: 'PostgreSQL Full-Text Search: Build Search Without Elasticsearch',
    description: 'Implement full-text search in PostgreSQL with tsvector, tsquery, and GIN indexes. Build powerful search features natively in PGSQL.',
    date: '2025-01-27',
    keywords: ['PostgreSQL full-text search', 'tsvector', 'tsquery', 'PGSQL search', 'GIN index', 'text search', 'PostgreSQL search'],
    body: (
      <>
        <p>PostgreSQL has built-in full-text search capabilities that rival dedicated search engines for many use cases. You can implement ranked search, fuzzy matching, and phrase queries without adding Elasticsearch or Solr. For small to medium datasets (millions of documents), PostgreSQL full-text search is fast, simple, and integrated.</p>
        <p><strong>Core concepts:</strong> <code>tsvector</code> stores preprocessed document text (normalized, stemmed, stop words removed). <code>tsquery</code> represents search queries with operators like AND, OR, NOT. <code>to_tsvector()</code> converts text to tsvector; <code>to_tsquery()</code> or <code>plainto_tsquery()</code> converts strings to tsquery. Match with <code>@@</code> operator: <code>tsvector @@ tsquery</code>.</p>
        <p><strong>Basic search:</strong> <code>SELECT * FROM articles WHERE to_tsvector(&apos;english&apos;, title || &apos; &apos; || body) @@ plainto_tsquery(&apos;english&apos;, &apos;postgres search&apos;);</code>. This searches title and body for "postgres" and "search" (stemmed to root forms). The <code>english</code> config handles English stop words and stemming.</p>
        <p><strong>Indexing for performance:</strong> Create a GIN index on the tsvector column: <code>CREATE INDEX idx_fts ON articles USING GIN (to_tsvector(&apos;english&apos;, title || &apos; &apos; || body));</code>. This speeds up searches from sequential scans to index lookups. For frequently updated tables, use a generated column: <code>ALTER TABLE articles ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector(&apos;english&apos;, title || &apos; &apos; || body)) STORED; CREATE INDEX idx_fts ON articles USING GIN (fts);</code>.</p>
        <p><strong>Ranking results:</strong> Use <code>ts_rank()</code> or <code>ts_rank_cd()</code> to score relevance: <code>SELECT *, ts_rank(to_tsvector(&apos;english&apos;, body), query) AS rank FROM articles, plainto_tsquery(&apos;english&apos;, &apos;postgres&apos;) query WHERE to_tsvector(&apos;english&apos;, body) @@ query ORDER BY rank DESC;</code>. Higher rank means better match.</p>
        <p><strong>Advanced queries:</strong> Use <code>to_tsquery()</code> for boolean logic: <code>to_tsquery(&apos;postgres &amp; (search | query)&apos;)</code> finds documents with "postgres" AND ("search" OR "query"). Use <code>&lt;-&gt;</code> for phrase proximity: <code>to_tsquery(&apos;postgres &lt;-&gt; database&apos;)</code> matches "postgres database" with words adjacent. Use <code>:*</code> for prefix matching: <code>to_tsquery(&apos;post:*&apos;)</code> matches "post", "postgres", "postfix".</p>
        <p><strong>Multi-language support:</strong> PostgreSQL includes configs for 20+ languages (english, french, german, etc.). Specify during conversion: <code>to_tsvector(&apos;french&apos;, text)</code>. Each config has language-specific stop words and stemming rules.</p>
        <p><strong>Limitations:</strong> No built-in fuzzy matching (use pg_trgm extension for trigram similarity). Ranking is simpler than Elasticsearch&apos;s relevance algorithms. Suitable for up to ~10M documents; beyond that, consider dedicated search engines. No distributed search (single-node only).</p>
        <p><strong>pgSentry</strong> monitors query performance, helping you identify slow full-text searches that need better indexes or query optimization. You get visibility into search workload patterns.</p>
      </>
    ),
  },
];
