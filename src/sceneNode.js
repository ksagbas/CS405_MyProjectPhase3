/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        
        const localTransform = this.trs.getTransformationMatrix();
    
        
        const combinedModelMatrix = MatrixMult(modelMatrix, localTransform);
        const combinedModelViewMatrix = MatrixMult(modelView, localTransform);
        const combinedMvpMatrix = MatrixMult(mvp, localTransform);
        const combinedNormalMatrix = getNormalMatrix(combinedModelViewMatrix);
    
        
        if (this.meshDrawer) {
            this.meshDrawer.draw(combinedMvpMatrix, combinedModelViewMatrix, combinedNormalMatrix, combinedModelMatrix);
        }
    
        
        this.children.forEach(childNode => {
            childNode.draw(combinedMvpMatrix, combinedModelViewMatrix, combinedNormalMatrix, combinedModelMatrix);
        });
    }
    
    
    
}