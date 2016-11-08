import DS from 'ember-data';

export default DS.Model.extend({
  // Data Schema
  title: DS.attr('string'),
  description: DS.attr('string'),
  map: DS.attr('string'),
  date: DS.attr('date'),
  created: DS.attr('string', {
    defaultValue: function (){
      return new Date();
    }
  })
});
