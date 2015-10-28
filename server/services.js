ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      clientId: "EDITME",
      loginStyle: "redirect",
      secret: "EDITME"
    }
  }
);
