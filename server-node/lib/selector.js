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
    	this.name = name;
    	this.corners = [];
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
            summary:"representation was successfully created."
        });
    }

    //Adds to the selector
    addPointsAmount(representation, creator, amount = 0){
    	for(let i = 0; i< amount; i++){
    		let region = RegionName[i%4];

            //Adds Point by region
    		this.addPointOnRegion(representation, creator, region);
    	}
	}

    //Adds 4 points in each corner in case corners dont have points
    addPointsOnCorners(representation, creator){
        if (this.corners.length<=0) {
            this.addSelectorPoint(this.corners, "NORTHWEST", representation, creator);
            this.addSelectorPoint(this.corners, "NORTHEAST", representation, creator);
            this.addSelectorPoint(this.corners, "SOUTHWEST", representation, creator);
            this.addSelectorPoint(this.corners, "SOUTHEAST", representation, creator);
        }
    }

    addPointsConstruction(representation, creator, construction){
        switch (construction){
            case "CORNERS":
               this.addPointsOnCorners(representation, creator); 
            break;               
            case "DEFAULT":
                this.addPointsAmount(representation, creator, 4);
            break;
            //It's a specific region then
            default: this.addPointOnRegion(representation, creator, construction);
        }
    }

    addPointOnRegion(representation, creator, region){

        switch(region){
            case "NORTH":
                this.addSelectorPoint(this.north, region, representation, creator);
            break;
            case "SOUTH":
                this.addSelectorPoint(this.south, region, representation, creator);
            break;
            case "WEST":
                this.addSelectorPoint(this.west,  region, representation, creator);
            break;
            case "EAST":
                this.addSelectorPoint(this.east,  region, representation, creator);
            break;
        }    
    }

    

    addSelectorPoint(area, region, representation, creator){
    	let size = area.length + 1;
    	let regionPoint = Region[region];

    	//Change existing ones
    	for(let i = 1; i <= area.length; i++){
    		let selectPoint = area[i-1];
    		if (regionPoint.x == 0.5) selectPoint.x = i / (size + 1);
    		if (regionPoint.y == 0.5) selectPoint.y = i / (size + 1);
    	}

    	//Add new one
    	let x = regionPoint.x == 0.5 ? size/(size + 1) : regionPoint.x;
    	let y = regionPoint.y == 0.5 ? size/(size + 1) : regionPoint.y; 
    		
    	let selectPoint = new SelectPoint(this.size, x, y, representation, Orientation[region], creator);
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

    getSelectorPoint(id){
    	let selectorPoint = null;

        //Retrieve SelectorPoint on Corners
		this.corners.forEach((element) => {
		    if (element.id == id) selectorPoint = element;
		});

    	//Retrieve SelectorPoint on North
		this.north.forEach((element) => {
		    if (element.id == id) selectorPoint = element;
		});

    	//Retrieve SelectorPoint on South
		this.south.forEach((element) => {
		    if (element.id == id) selectorPoint = element;
		});

		//Retrieve SelectorPoint on West
		this.west.forEach((element) => {
		    if (element.id == id) selectorPoint = element;
		});

		//Retrieve SelectorPoint on East
		this.east.forEach((element) => {
		    if (element.id == id) selectorPoint = element;
		});

		return selectorPoint;
    }
}

module.exports = Selector;
