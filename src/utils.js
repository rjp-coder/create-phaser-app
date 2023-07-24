/** this is used in combination with an "instanceof" check to trick the ts-check in vs code IDE into 
 *  understanding that the typing of *this* inside the function should always be a Phaser.Scene.
 * 
 * example usage:
 * if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
 */
export const THISAINTASCENE = "function called with a this object that is not an instance of a scene";

export const getCentre = function (sceneObj){
    const x = sceneObj.cameras.main.worldView.x + sceneObj.cameras.main.width / 2;
    const y = sceneObj.cameras.main.worldView.y + sceneObj.cameras.main.height / 2;
    return {x,y}
}