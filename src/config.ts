export const dbConfig = {
    server: 'stattrackdb.database.windows.net', // Use your SQL server name
    database: 'StatTrack', // Database to connect to
    user: 'api', // Use your username
    password: 'e\'Rp]dH#Tn6hu`K8B]cuv(g#96_cMX!7:+/P+#:A/Y7ekgu]3U', // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true,
      },
   };