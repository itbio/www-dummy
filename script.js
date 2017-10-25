var camera;
var scene;
var renderer;
var mesh;
  
$(document).ready(function(){
    init();
    animate();
});

SIZE = 20;
TILT_RADIANS = 10 * Math.PI / 180 ;  // 10 degrees

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, 1, 18, 1000000 );

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.SphereGeometry(SIZE, 32, 32);
    var material = new THREE.MeshPhongMaterial(
	{
	    color:0xFFFFFF,  // 0x3366ff
	    map: THREE.ImageUtils.loadTexture( 'texture.png')
	});
  
    mesh = new THREE.Mesh(geometry, material );
    mesh.position.z = -40;
    mesh.rotation.z += TILT_RADIANS;
    scene.add( mesh );
  
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0);
    $('.globe').append( renderer.domElement );
  
    window.addEventListener( 'resize', onWindowResize, false );
    resizeCamera();  
    render();
}

function animate(){
    var yaxis = new THREE.Vector3( 0, 1, 0 );
    mesh.rotateOnAxis( yaxis, 0.0003);
    render();
    requestAnimationFrame( animate );
}

function render(){
    renderer.render(scene, camera);
}

function onWindowResize() {
    resizeCamera();
    render();
}

function resizeCamera() {    
    var h = $('.title').height() * 1.5;
    var w = h;
    camera.aspect = w/h;
    renderer.setSize(w, h)
    camera.updateProjectionMatrix();    
}


