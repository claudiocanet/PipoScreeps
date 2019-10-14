require('spawner');
require('roles');

module.exports.loop = function (){

  const extensiones = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION}
    });

  const creeps = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS);

  //Verifica si hay creeps que ya están muertos, si es así, los borra
  if(Game.time % 20 === 0){
    for(let name in Memory.creeps){
      if (Game.creeps[name] == undefined) {
        delete Memory.creeps[name];
      }
    }
  }

  //Actualiza el spawn de creeps
  for(let name in Game.spawns){
    Game.spawns[name].cspawner();
  }

  //Actualiza los roles
  for(let name in Game.creeps){
    Game.creeps[name].update();

    Game.creeps['Taquitos'].room.visual.text("HOLA", 1, 1);
    }
}
