var camera;
var scene;
var renderer;
var mesh;
  
$(document).ready(function(){
    init();
    animate();
});

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70,
					  window.innerWidth / window.innerHeight,
					  1, 1000 );

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.SphereGeometry(20, 32, 32);
    var material = new THREE.MeshPhongMaterial(
	{
	    color:0xFFFFFF,  // 0x3366ff
	    map: THREE.ImageUtils.loadTexture( 'texture.png')
	});
  
    mesh = new THREE.Mesh(geometry, material );
    mesh.position.z = -100;
    mesh.position.y = -6;
    //mesh.rotation.z += 0.35;
    scene.add( mesh );
  
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0);
    document.body.appendChild( renderer.domElement );
  
    window.addEventListener( 'resize', onWindowResize, false );
  
    render();
}

function animate(){
    //mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.0003;
    render();
    requestAnimationFrame( animate );
}

function render(){
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}


