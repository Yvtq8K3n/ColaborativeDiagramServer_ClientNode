/*jshint esversion: 6 */

const ORIGIN = {x:0.5, y:0.5}

class Composed {
    constructor(name, parent, type, creator) {
        this.name = name;
        this.parent = parent;
        this.type = type;
        this.children = [];
        this.creator = creator;
        this.changed_by = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"Composed element was successfully created."
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

    addChildren(id, name, start, end, creator){
        this.children.push({id: id, name:name, start:start, end:end});

        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary: "Composed element contains new children" + name
        });
    }

    getChildren(id){
         this.children.forEach((children)=>{
            if(children.id == id) return children;
         });
         return null;
    }

  
}

module.exports = Composed;