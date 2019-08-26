var db = require("../models");

module.exports = function(app) {
  // users functions
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  app.get("/api/users/:userName", function(req, res) {
    db.User.findOne({ where: { userName: req.params.userName } }).then(function(
      user
    ) {
      res.json(user);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).end();
      });
  });

  // device functions
  app.get("/api/devices", function(req, res) {
    db.Device.findAll({}).then(function(devices) {
      res.json(devices);
    });
  });

  app.get("/api/devices/:id", function(req, res) {
    db.Device.findOne({
      where: {
        id: req.params.id
      },
      include: [db.LiveStats]
    }).then(function(device) {
      res.json(device);
    });
  });

  app.post("/api/devices", function(req, res) {
    if (!("UserId" in req.body)) {
      console.log("bad request - UserId not included");
      res.status(400).end();
    } else if (!("PlantId" in req.body)) {
      console.log("bad request - PlantId not included");
      res.status(400).end();
    } else {
      db.Device.create(req.body)
        .then(function(dbDevice) {
          res.json(dbDevice);
        })
        .catch(function(err) {
          console.log(err);
          res.status(400).end();
        });
    }
  });

  app.put("/api/devices", function(req, res) {
    if (!("DeviceId" in req.body)) {
      console.log("bad request - DeviceId not included");
      res.status(400).end();
    } else {
      db.Device.update(
        {
          isWatering: req.body.isWatering,
          isDeviceConnected: req.body.isDeviceConnected
        },
        { where: { id: req.body.DeviceId } }
      ).then(function(resp) {
        res.json(resp);
      });
    }
  });

  // plant functions
  app.get("/api/plants", function(req, res) {
    db.Plant.findAll({}).then(function(plants) {
      res.json(plants);
    });
  });

  app.get("/api/plants/:id", function(req, res) {
    db.Plant.findOne({
      where: { id: req.params.id }
    }).then(function(plant) {
      res.json(plant);
    });
  });

  app.post("/api/plants", function(req, res) {
    db.Plant.create(req.body)
      .then(function(dbPlant) {
        res.json(dbPlant);
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).end();
      });
  });

  app.get("/api/live", function(req, res) {
    var interval = req.query.interval;
    var range = req.query.range;
    var deviceId = req.query.deviceId;

    var sqlQuery = "SELECT ";

    var sqlInterval = null;
    if (!(typeof interval === "undefined")) {
      if (interval === "minute") {
        sqlInterval = " left(timeStamp, 16) as tTime, ";
      } else if (interval === "hour") {
        sqlInterval = " left(timeStamp, 13) as tTime, ";
      } else if (interval === "day") {
        sqlInterval = " left(timeStamp, 10) as tTime, ";
      } else if (interval === "month") {
        sqlInterval = " left(timeStamp, 7) as tTime, ";
      } else if (interval === "year") {
        sqlInterval = " left(timeStamp, 4) as tTime, ";
      } else {
        sqlInterval = "timestamp as tTime, ";
      }
    } else {
      sqlInterval = "timestamp as tTime, ";
    }
    sqlQuery += sqlInterval;

    sqlQuery +=
      " avg(moisture) as moisture, " +
      " avg(light) as light, " +
      " avg(sensorTempFehr) as sensorTemp, " +
      " avg(weatherTemp) as weatherTemp, " +
      " avg(precipIntensity) as precipIntensity, " +
      " avg(humidity) as humidity, " +
      " avg(windSpeed) as windSpeed ";
    sqlQuery += " FROM LiveStats ";

    sqlQuery += " WHERE 1=1 ";
    if (typeof range !== "undefined") {
      sqlQuery += " AND timeStamp > NOW() - INTERVAL 1 " + range;
    }
    if (typeof deviceId !== "undefined") {
      sqlQuery += " AND DeviceId = " + deviceId;
    }

    sqlQuery += " GROUP BY tTime ";
    sqlQuery += " ORDER BY tTime ;";

    db.sequelize
      .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).end();
      });
  });

  app.get("/api/hist", function(req, res) {
    var interval = req.query.interval;
    var range = req.query.range;
    var deviceId = req.query.deviceId;

    console.log(interval, range);

    var sqlQuery = "SELECT ";

    var sqlInterval = null;
    if (!(typeof interval === "undefined")) {
      if (interval === "minute") {
        sqlInterval = " left(timeStamp, 16) as tTime, ";
      } else if (interval === "hour") {
        sqlInterval = " left(timeStamp, 13) as tTime, ";
      } else if (interval === "day") {
        sqlInterval = " left(timeStamp, 10) as tTime, ";
      } else if (interval === "month") {
        sqlInterval = " left(timeStamp, 7) as tTime, ";
      } else if (interval === "year") {
        sqlInterval = " left(timeStamp, 4) as tTime, ";
      } else {
        sqlInterval = "timestamp as tTime, ";
      }
    } else {
      sqlInterval = "timestamp as tTime, ";
    }
    sqlQuery += sqlInterval;

    sqlQuery +=
      " avg(moisture) as moisture, " +
      " avg(light) as light, " +
      " avg(sensorTempFehr) as sensorTemp, " +
      " avg(weatherTemp) as weatherTemp, " +
      " avg(precipIntensity) as precipIntensity, " +
      " avg(humidity) as humidity, " +
      " avg(windSpeed) as windSpeed ";
    sqlQuery += " FROM HistStats ";

    sqlQuery += " WHERE 1=1 ";
    if (typeof range !== "undefined") {
      sqlQuery += " AND timeStamp > NOW() - INTERVAL 1 " + range;
    }
    if (typeof deviceId !== "undefined") {
      sqlQuery += " AND DeviceId = " + deviceId;
    }

    sqlQuery += " GROUP BY tTime ";
    sqlQuery += " ORDER BY tTime ;";

    db.sequelize
      .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).end();
      });
  });

  app.post("/api/hist", function(req, res) {
    db.HistStats.create(req.body).then(function(dbHistory) {
      res.json(dbHistory);
    });
  });
  
};
