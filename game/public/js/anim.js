export function createAnim(frames,framelength){
    return function resolveFrame(distance){
        const frameIndex = Math.floor(distance/framelength) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    };
}
