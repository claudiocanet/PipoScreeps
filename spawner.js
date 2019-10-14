StructureSpawn.prototype.cspawner =  function () {

  // Contar creeps
  var cHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  var cUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
  var cBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  var cMiner = _.sum(Game.creeps, (c) => c.memory.role == 'Miner');

  //Max de creeps
  var maxHarvester = 3;
  var maxUpgrader = 8;
  var maxBuilder = 6;
  var maxMiner = 3;

  //body simple para creeps
  const body = [WORK, WORK, CARRY, MOVE];

  // Crear creeps
  if(cHarvester < maxHarvester){
    //Crea a Tiritas
    if(!Game.creeps['Tiritas']){
      name = this.createCreep(body, 'Tiritas', { role: 'harvester', working: false});
    } else{
      name = this.createCreep(body, undefined, { role: 'harvester', working: false});
    }
  } else if (cUpgrader < maxUpgrader) {
    //Crea a Taquitos
    if (!Game.creeps['Taquitos']) {
      name = this.createCreep(body, 'Taquitos', { role: 'upgrader', working: false});
    } else{
      name = this.createCreep(body, undefined, { role: 'upgrader', working: false});
    }
  } else if (cBuilder < maxBuilder) {
    //Crea a Caballero de Carne
    if (!Game.creeps['Caballero de Carne']) {
      name = this.createCreep(body, 'Caballero de Carne', {role: 'builder', working: false});
    } else{
      name = this.createCreep(body, undefined, {role: 'builder', working: false});
    }
  } else if (cMiner < maxMiner) {
    //Crea a Carnitas
    if (!Game.creeps['Carnitas']) {
      name = this.createCreep(body, 'Carnitas', {role: 'miner', working: false});
    } else{
      name = this.createCreep(body, undefined, {role: 'miner', working: false});
    }
  }

  console.log("+---------------Energía: "+ this.room.energyAvailable + "/" + this.room.energyCapacityAvailable + "-------CPU: " + Game.cpu.getUsed().toFixed(2) + "/" + Game.cpu.tickLimit + "----------------------------------------------------------------------------------------------------------+\n"+
              "Harvester: " + cHarvester + "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "+--------------------------------------------------------------------------------------------------------------------------------------------------------------+");

};
