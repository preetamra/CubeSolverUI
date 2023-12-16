import React, {forwardRef, useEffect, useRef, useState} from 'react'
import { 
  useLoader,
  extend
 } from '@react-three/fiber'
import { 
  BoxGeometry, 
  Color, 
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  Vector2,
 } from 'three'
import { Pressable } from 'react-native'; 

extend({Pressable})

const colorConditions = [
  [
    "x", 
    1, 
    "white"
  ],
  [
    "x", 
    -1, 
    "yellow"
  ],
  [
    "y", 
    1, 
    "red"
  ],
  [
    "y",
    -1, 
    "orange"
  ],
  [
    "z", 
    1, 
    "blue"
  ],
  [
    "z", 
    -1, 
    "green"
  ]
];

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShaderFn = (color) => {
  return `varying vec2 vUv;
  uniform vec3 faceColor;
  
  void main() {
    vec3 border = vec3(0.533);
    float bl = smoothstep(0.0, 0.03, vUv.x);
    float br = smoothstep(1.0, 0.97, vUv.x);
    float bt = smoothstep(0.0, 0.03, vUv.y);
    float bb = smoothstep(1.0, 0.97, vUv.y);
    vec3 blueColor = ${color}; // Set the color to blue
    vec3 c = mix(border, blueColor, bt*br*bb*bl);
    gl_FragColor = vec4(c, 1.0);
  }
`
}

const mater = {
  "blue":new ShaderMaterial({ 
    vertexShader: vertexShader,
    fragmentShader: fragmentShaderFn("vec3(0.0, 0.0, 1.0)"),
    uniforms:{
      time: { value: 1.0 },
      resolution: { value: new Vector2() }
    }
   }),
  "green":new ShaderMaterial({ 
    vertexShader: vertexShader,
    fragmentShader: fragmentShaderFn("vec3(0.0, 1.0, 0.0)"),
    uniforms:{
      time: { value: 1.0 },
      resolution: { value: new Vector2() }
    } 
  }),
  "yellow":new ShaderMaterial({ 
    vertexShader: vertexShader,
    fragmentShader: fragmentShaderFn("vec3(1.0, 1.0, 0.0)"),
    uniforms:{
      time: { value: 1.0 },
      resolution: { value: new Vector2() }
    } 
  }),
  "red":new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShaderFn("vec3(1.0, 0.0, 0.0)"),
    uniforms:{
      time: { value: 1.0 },
      resolution: { value: new Vector2() }
    } 
  }),
  "white":new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShaderFn("vec3(1.0, 1.0, 1.0)"),
    uniforms:{
      time: { value: 1.0 },
      resolution: { value: new Vector2() }
    } 
  }),
  "orange":new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShaderFn("vec3(1.0, 0.6, 0.0)"),
    uniforms:{
      time: { value: 1.0 },
      resolution: { value: new Vector2() }
    }
  }),
  "gray":new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShaderFn("vec3(0.2, 0.5, 0.0)"),
    uniforms:{
      time: { value: 1.0 },
      resolution: { value: new Vector2() }
    }
  })
}

const pressable = ({onPress}) => {
  return(
    <pressable onPress={onPress}></pressable>
  )
}

const Cube = forwardRef(({position},ref) => {

    const mesh = useRef();
    const cube = [];

    const geo = new BoxGeometry();

/*  const materials = []
    const [faces] = useState([
        position.x === 1 ? Color.NAMES.blue : null, 
        position.x === -1 ? Color.NAMES.green : null, 
        position.y === 1 ? Color.NAMES.yellow : null, 
        position.y === -1 ? Color.NAMES.beige : null, 
        position.z === 1 ? Color.NAMES.aqua : null, 
        position.z === -1 ? Color.NAMES.brown : null
    ])

    const colors = [
      0x00FF,
      0x0FF,
      0xFF0,
      0x0F0,
      0x00FFF0,
      0xFF0
    ]

    materials.push(faces.map((f, i)=> {
        console.log(f,i);
        return (
          <meshBasicMaterial
            color={f}
            metalness={0}
            roughness={0}
            clearcoat={1}
            reflectivity={1}
          />
        );
      }))
      
      const geo = new BoxGeometry(1,1,1);

      const obj = new Mesh(geo);
      obj.position.set(1,1,1);

      console.log(materials.length,materials); */
     let tempmat =[];
     for(let i = 0;i<6;i++)
     {
      console.log("position :- ",position);
      console.log("i",i);
      let cnd = colorConditions[i];
      console.log("cnd",cnd);
      if(position[cnd[0]] == cnd[1])
      {
        console.log("push color to face ",position[cnd[0]],cnd[2]);
        //console.log("color Condition :- ",colorConditions[i])
        tempmat.push(mater[cnd[2]]);
      }else{
        console.log("push color to face ",position[cnd[0]],"gray");
        //console.log("color Condition :- ",colorConditions[i])
        tempmat.push(mater["gray"]);
      }
      let tempCube = new Mesh(geo,tempmat);
      //tempCube.position.set(position.x,position.y,position.z);
      cube.push(tempCube);
     }

    return (
        <group 
        onClick={() => {
          console.log("Pressed on Cube",position);
        }}
        ref={ref} 
        position={Object.values(position)} >
          {cube.map(ele => {
      return(
        <primitive
        object={ele}
        >
        </primitive>
      )
     })}
        </group>
      );
})

export default Cube