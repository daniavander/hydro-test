namespace Constants {

  exports.siteShortNames = {
    automation: 'E2E'
  },
    exports.siteNames = {
      fehervar: 'Extrusion-Hungary-Szekesfehervar',
      auto: "Automation tests"

    },
    exports.entities = {
      ife: 'Injury Free Event'
    },
    exports.times = {

    },
    exports.departments = {
      administration: 'Administration',
      prés: '3-as prés',
      anyagvizsgáló: 'Anyagvizsgáló labor (Présüzem)',
      carbonplant: 'Carbon Plant',
      customhse: 'Custom HSE',
      hse: 'HSE',
      dieservices: 'Die Services',
      extrusion: 'Extrusion',
      fabrication: 'Fabrication',
      folyamatirányítás: 'Folyamat Irányítás-Lab. nélkül (Présüzem)'
    };

  exports.caseType = {
    //inside add case
    ife: 'test-ife',
    injury: 'test-injury',
    health: 'test-health',
    enviromnet: 'test-environmental',
    fire: 'test-fire',
  }

  exports.secLevels = {
    //inside add case after select type
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    minor: 'Minor',
    firstaid: 'First aid',
    seriouscase: 'Serious case',
    mild: 'Mild',
    moderate: 'Moderate',
    severe: 'Severe',
  }

  exports.classesUnderAction3Dot = {
    aftercare: 'icon-afc'
  }

  exports.stringConstants = {
    description: 'Automated test description'
  }

  exports.raMenuNames = {
    attachment: 'Attachments',
    seg: 'Affected groups / SEG',
    signs: 'Safety Signs',
    risk: 'Hazard / Risk',
    woc: 'WOC: control questions',
    steps: 'Steps',
    connectedperson: 'Connected persons',
    hazard: 'Hazard / Risk',
    administration: 'Administration',
    addconnection: 'Add connection',
    exportdoc: 'Export In DOC',
    copy: 'Copy',
    delete: 'Delete',
    copyurl: 'Copy url',
    sendlink: 'Send link',
    approver: 'Add approver'
  }

  exports.frequency = {
    daily: 'Daily',
    fewdays: 'Few days per week',
    weekly: 'Weekly',
    everyotherweek: 'Every other week',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    halfyear: 'Half-yearly or less frequently',
  }

  exports.riskMainTypes = {
    mechanicalhazard: "MechanicalHazard",
    electrical: "ElectricalHazards",
    chemical: "ChemicalHazards",
    fire: "FireAndExplosionHazards",
    hazard: "HazardDueToALackOfOrganisation",
    warning: "WarningDevicesAndInformation",
    physical: "PhysicalHazards",
    psychological: "PsychologicalStrain",
    isolation: "WorkingInIsolation/WorkingAlone",
    technical: "TechnicalInspections/checks",
    biological: "BiologicalHazards",
    asbestos: "Asbestos",
    weraproduction: "WeraProduction",
    weraoffice: "WeraOffice"
  }

  exports.riskSubTypes = {
    dangeroussurfaces: "DangerousSurfaces",
    shortcircuits: "ShortCircuits",
    chemical: "ChemicalHazards",
    inhalation: "FireAndExplosionHazards",
    thermal: "ThermalExplosions",
    dangerouswork: "DangerousWork",
    lightning: "Lighting",
    psychological: "PsychologicalStrain",
    freedom: "FreedomOfAction,Responsibility",
    workingalone: "WorkingInIsloationWithSpecialRisk",
    heatstress: "HeatStress",
    officenoise: "WeraOfficeNoise"
  }
}