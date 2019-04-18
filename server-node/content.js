/*jshint esversion: 6 */

class Content {
    constructor(name, shape, creator) {
        this.name = name;
        this.shape = shape;
        this.creator = creator;
        this.changedby = [];

        //Adds a log registry 
        this.changedby.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"A content has been created"
        });
    }

    /*A method that delegates moviment to a point*/
    addMovimentConstraint(pointId, movimentType, creator){
        this.shape.points[pointId][movimentType] = true;
        this.shape.points[pointId].affected = [];

        //Adds a log registry 
        this.changedby.push({
            changed_by: creator, 
            changed_at: new Date(), 
            summary:"A moviment restriction has been added to point "+ pointId
        });
    }

    /*A method that delegates moviment reflecting other point moviment */
    addMovimentRelativeConstraint(pointId, referenceId, movimentType, creator, inverse = true,){
        //Adds the Parent reference as well as if its moviment is opposite or not
        this.shape.points[pointId].reference = referenceId;
        this.shape.points[pointId][movimentType] = true;
        this.shape.points[pointId].inverse = inverse;

        //Adds to Parent as a list
        this.shape.points[referenceId].affected.push(pointId);

        //Adds a log registry 
        this.changedby.push({
            name: creator, 
            changed_at: new Date(), 
            summary:"A moviment restriction related to point "+referenceId+" has been added on point "+ pointId
        });
    }
}

module.exports = Content;
