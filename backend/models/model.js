const mongoose = require('mongoose');

const timeSeriesSchema = new mongoose.Schema({
 now: { type: Date, required: true },
 
   data: {
      name: String,
      origin: String,
      
      destination: String
   
  }
});

timeSeriesSchema.index({ timestamp: 1, 'personData.personId': 1 });

const TimeSeriesModel = mongoose.model('TimeSeries', timeSeriesSchema);

module.exports = TimeSeriesModel;