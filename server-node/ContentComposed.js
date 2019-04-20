/*jshint esversion: 6 */

class ContentComposed {
    constructor(name, parentContent, creator) {
    	this.name = name;
        this.parent = parentContent;
        this.creator = creator;
        this.children = [];
        this.changed_by = [];
        this.size = this.parent.points.length;
    }

    addChildren(content, region){
    	let points = content.points;

    	//Converts to a 1/3 scale
    	for(let i=0; i<points.length; i++){
    		points[i].id = this.size++;
    		points[i].x = points[i].x / 3;
    		points[i].y = points[i].y / 3;
    	}

    	//Position the grid in the curret place 
    	for(let i=0; i<points.length; i++){
    		points[i].x = points[i].x * Math.round(region.x/0.3);
    		points[i].y = points[i].y * Math.round(region.y/0.3);
    	}

    	this.children.push({content: content, region: region});
    }

    /*A method that delegates moviment to a point*/
    /*addMovimentConstraint(pointId, movimentType, creator){
        this.points[pointId][movimentType] = true;
        this.points[pointId].affected = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"A moviment restriction has been added to point "+ pointId
        });
    }*/

    /*A method that delegates moviment reflecting other point moviment */
    /*addMovimentRelativeConstraint(pointId, referenceId, movimentType, creator, inverse = true,){
        //Adds the Parent reference as well as if its moviment is opposite or not
        this.points[pointId].reference = referenceId;
        this.points[pointId][movimentType] = true;
        this.points[pointId].inverse = inverse;

        //Adds to Parent as a list
        this.points[referenceId].affected.push(pointId);

        //Adds a log registry 
        this.changed_by.push({
            name: creator, 
            changed_at: new Date(), 
            summary:"A moviment restriction related to point "+referenceId+" has been added on point "+ pointId
        });
    }*/
}

module.exports = ContentComposed;
