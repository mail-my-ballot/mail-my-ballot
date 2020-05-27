module.exports = {
  apps: [
    {
      name: "server-my-ballot",
      script: "npm",
      args: "run server gulp start:staging",
      watch: ".",
    },
  ],
}
