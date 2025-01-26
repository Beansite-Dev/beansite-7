export const generateId=(length)=>{
  let result='';
  const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter=0;
  while (counter<length) {
    result+=characters.charAt(Math.floor(Math.random() * charactersLength));
    counter+=1;
  }
  return btoa(result).replaceAll("=","");
}
export const timeout=(ms)=>{
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}
export const queryParams=getQueryParams(window.location.search);
// const outsideClickListener=event=>{
//   const deltaX=event.offsetX-lastMouseDownX;
//   const deltaY=event.offsetY-lastMouseDownY;
//   const distSq=(deltaX*deltaX)+(deltaY*deltaY);
//   const isDrag=distSq>3;
//   const isDragException=isDrag&&!lastMouseDownWasOutside;
//   if(!element.contains(event.target)&&isVisible(element)&&!isDragException){
//     element.style.display='none';
//     removeClickListener();
//     document.removeEventListener('mousedown', mouseDownListener);
//   }
// }