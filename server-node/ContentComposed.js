/*jshint esversion: 6 */

const ORIGIN = {x:0.5, y:0.5}

class ContentComposed {
    constructor(parentContent, ...childContents) {
        this.name = name;
        this.points = points;
        this.creator = creator;
        this.changed_by = [];

      
    }

    /*A method that delegates moviment to a point*/
    addMovimentConstraint(pointId, movimentType, creator){
        this.points[pointId][movimentType] = true;
        this.points[pointId].affected = [];

        //Adds a log registry 
        this.changed_by.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"A moviment restriction has been added to point "+ pointId
        });
    }

    /*A method that delegates moviment reflecting other point moviment */
    addMovimentRelativeConstraint(pointId, referenceId, movimentType, creator, inverse = true,){
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
    }
}

module.exports = Content;
