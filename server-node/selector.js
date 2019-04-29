/*jshint esversion: 6 */

var SelectPoint = require('./selectorPoint.js');

const RegionName = Object.freeze(["NORTH", "SOUTH", "WEST", "EAST"]);
const Region = Object.freeze({
    "NORTH":{x: 0.5, y:0}, "SOUTH":{x: 0.5, y:1}, 
    "WEST":{x: 0, y:0.5}, "EAST":{x: 1, y:0.5},
    "NORTHWEST":{x: 0, y:0}, "NORTHEAST":{x: 1, y:0},
    "SOUTHWEST":{x: 0, y:1}, "SOUTHEAST":{x: 1, y:1},
    "CENTER":{x: 0.5, y: 0.5}
});
const Orientation  = Object.freeze({ 
	"NORTH": "VERTICAL",
	"SOUTH": "VERTICAL",  
	"WEST" : "HORIZONTAL", 
	"EAST" : "HORIZONTAL",
	"NORTHWEST": "DIAGONALDESCENDENT", 
	"NORTHEAST": "DIAGONALASCENDENT",
    "SOUTHWEST": "DIAGONALASCENDENT",
    "SOUTHEAST": "DIAGONALDESCENDENT"
});

class Selector {
    constructor(name, creator = "@SCD") {
        this.north = [];
        this.south = [];
        this.west = [];
        this.east = [];
        this.size = 0;
        this.changed_by = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"Content was successfully created."
        });
    }

    //Adds to the selector
    addSelectorPoints(content, amount, creator){
    	for(let i = 0; i< amount; i++){
    		let region = RegionName[i%4];

    		switch(region){
    			case "NORTH":
    				this.addSelectorPoint(this.north, Region[region], content, creator);
    			break;
    			case "SOUTH":
    				this.addSelectorPoint(this.south, Region[region], content, creator);
    			break;
    			case "WEST":
    				this.addSelectorPoint(this.west,  Region[region], content, creator);
    			break;
    			case "EAST":
    				this.addSelectorPoint(this.east,  Region[region], content, creator);
    			break;
    		}    	
    	}
	}

    addSelectorPoint(area, region, content, creator){
    	let size = area.length + 1;

    	//Change existing ones
    	for(let i = 1; i <= area.length; i++){
    		let selectPoint = area[i-1];
    		if (region.x == 0.5) selectPoint.x = i / (size + 1);
    		if (region.y == 0.5) selectPoint.y = i / (size + 1);
    	}

    	//Add new one
    	let x = region.x == 0.5 ? size/(size + 1) : region.x;
    	let y = region.y == 0.5 ? size/(size + 1) : region.y; 
    		
    	let selectPoint = new SelectPoint(this.size, x, y, content, Orientation[region], creator);
    	area.push(selectPoint);

    	//Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary: "SelectorPoint "+ this.size + " has been added."
        });

        //Adds to a point to the counter
    	this.size++;
    }
}

module.exports = Selector;
