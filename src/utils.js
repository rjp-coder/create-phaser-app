/** this is used in combination with an "instanceof" check to trick the ts-check in vs code IDE into 
 *  understanding that the typing of *this* inside the function should always be a Phaser.Scene.
 * 
 * example usage:
 * if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
 */
export const THISAINTASCENE = "function called with a this object that is not an instance of a scene";