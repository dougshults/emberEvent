import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editEvent: function(id){
      var title = this.get('model.title');
      var description = this.get('model.description');
      var date = this.get('model.date');

      // Update tasks
      this.store.findRecord('event', id).then(function(event){
        var self = this;
        event.set('title', title);
        event.set('description', description);
        event.set('date', new Date(date));

        // Save to Database
        event.save();

       self.transitionToRoute('events');

      });

    }
  }

});
