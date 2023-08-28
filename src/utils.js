/** this is used in combination with an "instanceof" check to trick the ts-check in vs code IDE into 
 *  understanding that the typing of *this* inside the function should always be a Phaser.Scene.
 * 
 * example usage:
 * if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
 */
export const THISAINTASCENE = "function called with a this object that is not an instance of a scene";

/** gets useful properties of the current scene */
export const getBounds = function (sceneObj){
    const width = sceneObj.cameras.main.width;
    const height = sceneObj.cameras.main.height;
    const cx = sceneObj.cameras.main.worldView.x + width / 2;
    const cy = sceneObj.cameras.main.worldView.y + height / 2;
    return {cx,cy,width,height}
}

export const stretchImage = function (image,scene){
    //TODO get ratio of image size to game size/ 
    //then get ratio of image size to scene size. 
    //then divide by game size and multiply by scene size
    //or just doing the last step alone should be enough?
    let scaleX = scene.cameras.main.width / image.width
    let scaleY = scene.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)
}

export const stretchImageToGame = function (image){
    let scaleX = gameWidth / image.width
    let scaleY = gameHeight / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0);
}

export const gameWidth = 320;
export const gameHeight = 568;