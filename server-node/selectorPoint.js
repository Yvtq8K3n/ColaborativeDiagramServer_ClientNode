/*jshint esversion: 6 */

const Orientation  = Object.freeze({
    "Vertical":{x: 0, y:1}, "horizontal":{x: 1, y:0}, 
    "DiagonalAscendent":{x: -1, y:1}, "DiagonalDescendent":{x: 1, y:-1}, 
    "Any":{x: 0, y: 0}
});

class SelectorPoint {
    constructor(id, x, y, content, orientation, creator) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.content = content;
        this.orientation = orientation;
        this.creator = creator;
        this.changed_by = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"Content was successfully created."
        });
    }
}

module.exports = SelectorPoint;
