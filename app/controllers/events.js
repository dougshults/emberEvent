import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteEvent: function(id){
      this.store.findRecord('event', id).then(function(event){
        event.deleteRecord();

        event.save();
      });
    }
  }
});
