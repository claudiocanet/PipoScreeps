Creep.prototype.update = function() {
  //Si está trabajando y no tiene energia, deja de trabajar
  if (this.memory.working == true && this.carry.energy == 0) {
    this.say("Energía 0");
    this.memory.working = false;
  } else if(this.memory.working == false && this.carry.energy == this.carryCapacity){ //Si no trabaja y tiene energía, empieza a trabajar
    this.memory.working = true;
    this.say("🛠");
  }

  //Si está trabajando...
  if (this.memory.working == true) {

    switch (this.memory.role) {
      case 'harvester':
        this.transpawn();
        return;

    }
  } else { //Si no trabaja, ve a por energia

  }
};


//funciones

/*
- Función: transpawn()
- Descripción: Transfiere energía a los targets
- Targets: Spawns, extensions, Towers
*/
Creep.prototype.transpawn = function (){
  var estructura = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
  });

  //Si no hay estructura, buscala
  if (estructura == undefined) {
    estructura =  this.room.storage;
  }

  //Si hay, transfiere
  if (estructura != undefined) {
    if(this.transfer(estructura, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.moveTo(estructura);
    }
  }
}
