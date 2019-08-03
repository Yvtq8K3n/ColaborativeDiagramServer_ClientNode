/*jshint esversion: 6 */

class Representation{
    constructor(name, element, location, size, creator, rotation = 0) {
        this.name = name;
        this.element = element;
        this.location = location;
        this.size = size;
        this.creator = creator;
        this.properties = {};
        var _changed_by = [];
        
        //Adds a log registry 
        _changed_by.push({
                changed_by: creator, 
                changed_at: new Date(), 
                summary:"Representation was successfully created."
        });

        this.getHistory = function() { return _changed_by; }
        this.addHistory = function(summary, creator) { 
            _changed_by.push({
                changed_by: creator, 
                changed_at: new Date(), 
                summary: summary
            });
        }
    }

   
}

module.exports = Representation;
