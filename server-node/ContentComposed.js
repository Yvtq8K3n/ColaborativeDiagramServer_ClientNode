/*jshint esversion: 6 */

class ContentComposed {
    constructor(name, parentContent, creator) {
    	this.name = name;
        this.type = "composed";
        this.parent = parentContent;
        this.creator = creator;
        this.children = [];
        this.changed_by = [];
        this.size = this.parent.points.length;

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"Content was successfully created."
        });
    }

    //Normal percentage varies betwen 0-1
    addChildren(content, region, percentage, creator){
        console.log(JSON.stringify(content, null, 4));
        //Moves the points to the desired position
        this.shiftPosition(content, region, percentage);

        //Add children
    	this.children.push({id: this.children.length, content: content, region: region});

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary: content.name + " has been added has child."
        });

        return this.children.length-1;
    }

    //!!VER MELHOR
    //An method that reajust the position of the points
    //based in the region and the percentage
    shiftPosition(content, region, percentage){
        if (content.type=="composed"){
            this.shiftPosition(content.parent, region, percentage);
            content.children.forEach((element) => {
                this.shiftPosition(element.content, region, percentage);
            });
            return;
        }

        console.log(content.name);
        let points = content.points;
        //Converts to the given percentage
        for(let i=0; i< points.length; i++){
            points[i].id = this.size++;
            points[i].x = points[i].x * percentage;
            points[i].y = points[i].y * percentage;
        }

        //Moves based on region
        for(let i=0; i<points.length; i++){
            //Re-positinate based on Region
            if (region.x == 0.5) points[i].x = points[i].x + (1 - percentage)/2;
            if (region.y == 0.5) points[i].y = points[i].y + (1 - percentage)/2;

            //Moves points into the correct region
            if (region.x == 1) points[i].x = 1 - points[i].x;
            if (region.y == 1) points[i].y = 1 - points[i].y;
        }
    }

    //GridLayout
    /*addChildren(content, region){
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
