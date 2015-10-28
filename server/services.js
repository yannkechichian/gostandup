ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
  	// production
    $set: {
      clientId: "cf20ae79f2c2d1452b97",
      loginStyle: "redirect",
      secret: "f5ea5c3180905baf295f346881b1646e2e29878c"
    }
    // development
    // $set: {
    //   clientId: "ae439f41fbaf90a183b2",
    //   loginStyle: "redirect",
    //   secret: "52f2109509c3e92cf0f4aa273bf6e67c3484741e"
    // }
  }
);