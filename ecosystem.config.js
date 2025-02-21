module.exports = {
    apps: [
      {
        name: "hubspot-si-central", 
        script: "dist/main.js", 
        instances: "max", 
        exec_mode: "cluster", 
        watch: false,
        autorestart: true, 
        env: {
          NODE_ENV: "production",
          PORT: 3041, 
        },
      },
    ],
  };