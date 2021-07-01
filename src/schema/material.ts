import { Schema, model } from 'mongoose';
import { Picture } from './pic';

const ObjectId = Schema.Types.ObjectId;

const materialSchema = new Schema({

  materialType: {
    type: String,
    enum: ['MD', 'PE', 'HDPE', 'PG', 'OFC', 'HH', 'POLE', 'OPP', 'OCDF', 'FDB', 'ODC', 'JB']
  },

  title: {
    type: String,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },

  description: {
    type: String,
    maxlength: 100,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },

  factory: {
    type: String,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },

  model: {
    type: String,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },


  outDiameter: {
    type: Number
  }, // PE , HDPE, PG 

  presserAtmosphere: {
    type: Number
  }, // PE , HDPE


  dimension: {
    length: {
      type: Number
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  }, // HH , POLE , ODC

  units: {
    type: Number,
  }, // OPP, ODC

  shape: {
    type: String,
    enum: ['Circular', 'Square', 'Rectangular']
  }, // HH

  structure: {
    type: String,
    enum: ['Concrete', 'Composite', 'Metal', 'PVC', 'ABS']
  }, // HH

  pos: {
    type: Number,
    enum: [1, 2]
  }, // OCDF





  numberSubduct: {
    type: Number
  }, // MD

  subducts: [{
    inDiameter: {
      type: Number
    },
    outDiameter: {
      type: Number
    },
    color: {
      type: String
    },
    number: {
      type: String
    }
  }], // MD





  OFCCableType: {
    type: String,
    enum: ['Micro fiber', 'ADSS', 'Direct Burial', 'Out door']
  }, // OFC

  coreStandard: {
    type: String,
    enum: ['G.652D', 'G.655', 'G.657']
  }, // OFC

  numberOFLosses: {
    type: Number
  }, // OFC

  losses: [{
    lossNumber: {
      type: Number
    },
    lossColor: {
      type: String
    },
    cores: [{
      coreNumber: {
        type: Number
      },
      coreColor: {
        type: String
      },
    }],
  }], // OFC



  installationType: {
    type: String,
    enum: ['HH attached', 'Burial', 'Aerials']
  }, // JB




  inputs: {
    type: Number,
  }, // HH, POLE, OPP, OCDF, FDB, ODC, JB

  numberOfCassette: {
    type: Number,
  }, // OPP, OCDF, FDB, JB

  cassetteCapacity: {
    type: Number,
  }, // OPP, OCDF, FDB, JB

  numberOfAdaptorPort: {
    type: Number,
  }, // OPP, OCDF, FDB

  adaptorPortType: {
    type: String,
    enum: ['LC', 'SC', 'FC', 'DIN']
  }, // OPP , OCDF, FDB


  pics: {
    type: [Picture],
  },

  dataSheets: [{
    urls: {
      type: String
    },
  }],

}, {
  timestamps: false,
});




export const Material = model('Material', materialSchema);