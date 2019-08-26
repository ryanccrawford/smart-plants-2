module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("Plant", {
    plantName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
      },
      plantId: {
          type: DataTypes.STRING,
          allowNull: true
      },
      plantData: {
          type: DataTypes.STRING,
          allowNull: true
      },
      image: DataTypes.STRING
    // tempMinFehr: DataTypes.FLOAT,
    // shadeTolerance: DataTypes.STRING,
    // precMinInches: DataTypes.INTEGER,
    // precMaxInches: DataTypes.INTEGER,
  });

  Plant.associate = function(models) {
    Plant.hasMany(models.Device, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Plant;
};
