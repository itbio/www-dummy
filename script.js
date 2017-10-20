var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = Detector.webgl?
    new THREE.WebGLRenderer( { antialias: true, alpha: true } ):
    new THREE.CanvasRenderer();

var blue = 0x627df0;
var yellow = 0xfff064;
var red = 0xF2462e;
var green = 0x43F22e;
var purple = 0x82466e;
var dkGray = 0x555555;
var ltGray = 0xAAAAAA;

$(document).ready(function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    var canvas = renderer.domElement;
    $('body').append(canvas);
});

camera.position.z = 30;

var tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
var ballGeometry = new THREE.SphereGeometry(0.8,32,32);

var blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
var yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
var redMaterial = new THREE.MeshBasicMaterial( { color: red } );
var greenMaterial = new THREE.MeshBasicMaterial( { color: green } );
var purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );
var dkGrayMaterial = new THREE.MeshBasicMaterial( { color: dkGray } );
var ltGrayMaterial = new THREE.MeshBasicMaterial( { color: ltGray } );

function make_dna(){
    var dna = new THREE.Object3D();

    for (var i = 0; i <= 40; i++) {
	// ATGC
	var letters = 'ATGC';
	var materials = [blueMaterial, yellowMaterial, greenMaterial, redMaterial];
	var choice = Math.floor(Math.random()*4);
	var letter = letters[choice];
	var material = materials[choice];
	var letterTube = new THREE.Mesh(tubeGeometry, material);
	letterTube.rotation.z = 90 * Math.PI/180; 
	letterTube.position.x = -3;

	var ballLeft = new THREE.Mesh( ballGeometry, material );
	ballLeft.position.x = -6;

	// 01
	var digits = "01"
	var dMaterials = [dkGrayMaterial, ltGrayMaterial];
	var flip = Math.floor(Math.random()*2);
	var dMaterial = dMaterials[flip];
	var digitTube = new THREE.Mesh(tubeGeometry, dMaterial );
	digitTube.rotation.z = 90 * Math.PI/180;
	digitTube.position.x = 3;

	var ballRight = new THREE.Mesh( ballGeometry, dMaterial );
	ballRight.position.x = 6;


	var row = new THREE.Object3D();
	row.add(letterTube);
	row.add(digitTube);
	row.add(ballRight);
	row.add(ballLeft);

	row.position.y = i*2;
	row.rotation.y = 30*i * Math.PI/180;

	dna.add(row);

    };


    dna.position.y = -40;
    return dna;
}


var render = function () {
    requestAnimationFrame(render);
    dna.rotation.y += 0.001;
    renderer.render(scene, camera);
}


var dna = make_dna();
scene.add(dna);
render();
