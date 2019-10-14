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
      this.cSuccess('Tiritas', 'harvester');
    } else{
      name = this.createCreep(body, undefined, { role: 'harvester', working: false});
      this.cSuccess(name, 'harvester');
    }
  } else if (cUpgrader < maxUpgrader) {
    //Crea a Taquitos
    if (!Game.creeps['Taquitos']) {
      name = this.createCreep(body, 'Taquitos', { role: 'upgrader', working: false});
      this.cSuccess('Taquitos', 'upgrader');
    } else{
      name = this.createCreep(body, undefined, { role: 'upgrader', working: false});
      this.cSuccess(name, 'upgrader');
    }
  } else if (cBuilder < maxBuilder) {
    //Crea a Caballero de Carne
    if (!Game.creeps['Caballero de Carne']) {
      name = this.createCreep(body, 'Caballero de Carne', {role: 'builder', working: false});
      this.cSuccess('Caballero de Carne', 'builder');
    } else{
      name = this.createCreep(body, undefined, {role: 'builder', working: false});
      this.cSuccess(name, 'builder');
    }
  } else if (cMiner < maxMiner) {
    //Crea a Carnitas
    if (!Game.creeps['Carnitas']) {
      name = this.createCreep(body, 'Carnitas', {role: 'miner', working: false});
      this.cSuccess('Carnitas', 'miner');
    } else{
      name = this.createCreep(body, undefined, {role: 'miner', working: false});
      this.cSuccess(name, 'miner');
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

StructureSpawn.prototype.cSuccess = function (name, role) {
  console.log("+---------------Energía: "+ this.room.energyAvailable + "/" + this.room.energyCapacityAvailable + "-------CPU: " + Game.cpu.getUsed().toFixed(2) + "/" + Game.cpu.tickLimit + "----------------------------------------------------------------------------------------------------------+\n"+
              "                                           >>>>¡Se ha creado un nuevo creep!<<<<\n"+
              "\n"+
              "\n"+
              "- Nombre: " + name + "\n"+
              "- Rol: " + role + "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "\n"+
              "+--------------------------------------------------------------------------------------------------------------------------------------------------------------+");
}
