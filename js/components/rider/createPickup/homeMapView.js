 {(this.state.visible) ?
                        (<MapView ref={map => { this._map = map; }}
          style={styles.map}
          rotateEnabled={true}
          showsUserLocation={true}
          attributionButtonIsHidden = {false}
          logoIsHidden = {true}
          compassIsHidden = {true}
          accessToken={'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw'}
          initalZoomLevel = {10}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          userTrackingMode = {Mapbox.userTrackingMode.follow}
          
          debugActive={false}
          direction={this.state.direction}
          annotations={this.state.annotations}
          onRegionChange={this.onChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onUpdateUserLocation={this.onUpdateUserLocation}/>)
                        
var encrypt = function (str){
  var output = [];
  for (var i = 0; i < 100;i++){
     output[i] = [];
  }

  var counter = 1;
  var index = 0;
  var block = [];
  block.push(str[index]);
  index++;

  while (index != str.length-1){
     if (str[index] != str[index-1]){
          block.push(counter);
          output.push(block);
          block = [];
          counter = 1;
          block.push(str[index]);
          index++;

     }

     else{
          counter++;
          index++;
     }
  }

  block.push(counter);
  output.push(block);

  return output;
  
}