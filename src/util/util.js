var utilFunction=function(obj){
  let self=this;
  let map=obj.map;
  let L=obj.L;
  /**
   * param:{latlng：纬经度数组，radius：点半径，color：边界色，fillColor：填充色，fillOpacity：透明度}
   */
  self.drawPoint=function(param){
    L.circle(param.latlng, { radius: param.radius, color:  param.color, fillColor: param.fillColor, fillOpacity: param.fillOpacity }).addTo(map);
  }
}
export {
  utilFunction
}
