/*jshint esversion: 6 */

const Orientation  = Object.freeze({
    "VERTICAL":{x: 0, y:1}, "HORIZONTAL":{x: 1, y:0}, 
    "DIAGONALASCENDENT":{x: -1, y:1}, "DIAGONALDESCENDENT":{x: 1, y:1}, 
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
            summary:"SelectorPoint was successfully created."
        });
    }

    //Moves the point x ammount
    move(amount){
        let orientation = Orientation[this.orientation];
        orientation.x *= amount;
        orientation.y *= amount;

        //Emit event notifying Element
        //this.x += orientation.x;
        //this.y *= orientation.y
        console.log("EMITING PARENT/NO ELEMENT YET CREATED"); 
    }

     //Gets the nearest point while respecting the orientation
    moveToPoint(x, y){
        let orientation = Orientation[this.orientation];
        x = x/orientation.x;
        y = y/orientation.y;

        //Emit event notifying Element
        // this.x = x;
        //this.y = y;
        console.log("EMITING PARENT/NO ELEMENT YET CREATED");
    }
}

module.exports = SelectorPoint;
