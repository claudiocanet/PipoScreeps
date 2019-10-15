var room = 'W21N45';

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
      case 'upgrader':
        this.transcontroller();
      case 'builder':
        if (this.buildsite() == true) {
          return;
        } else {
          this.transcontroller();
        }
      case 'miner':
        this.transext();
    }
  } else { //Si no trabaja, ve a por energia
    switch (this.memory.role) {
      case 'harvester':
        this.getEnergy(true, false, false, room);
        return;
      case 'upgrader':
        this.getEnergy(true, false, false, room);
      case 'builder':
        this.getEnergy(false, true, true, room);
      case 'miner':
        this.getEnergy(true, false, false, room);
    }
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
};

/*
- Función: transext()
- Descripción: Transfiere energía a los targets
- Targets: extensions
*/
Creep.prototype.transext = function (){
  var estructura = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: (s) => (s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity
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
};

/*
- Función: transcontroller()
- Descripción: Transfiere energía al controller para mejorarlo
- Targets: controller
*/
Creep.prototype.transcontroller =  function (){
  var controller = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_CONTROLLER
  });

  if (this.transfer(controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    this.moveTo(controller);
  }
};

/*
- Función: buildsite()
- Descripción: Transfiere energia a las construcciones nuevas
- Targets: structures
*/
Creep.prototype.buildsite = function() {
  var build = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  if (build) {
    if (this.build(build) ==  ERR_NOT_IN_RANGE) {
      this.moveTo(build);
      return true;
    }
  } else {
    return false;
  }
};

/*
- Función: getEnergy()
- Descripción: va a por energia
- Targets: recursos, contenedores, storage
*/
Creep.prototype.getEnergy = function (fSource ,fContainer, fStorage, room){

  //Si no está en la habitación, ve a ella
  if (this.room.name != room) {
    this.moveTo(new RoomPosition(25,25, room));
    return;
  }

  //Si queremos coger energía de un recurso...
  if (fSource === true) {
    var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    if(this.harvest(source) == ERR_NOT_IN_RANGE){
      this.moveTo(source);
    }
  }

  if (fContainer) {
    var container = this.pos.findClosestByPath(FIND_STRUCTURES,{
      filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
    });

    if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.moveTo(container);
    }
  }

};
