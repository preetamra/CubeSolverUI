import React, {forwardRef, useEffect, useRef, useState} from 'react'
import { useLoader } from '@react-three/fiber'
import { 
  BoxGeometry, 
  Color, 
  Mesh,
  MeshBasicMaterial
 } from 'three'

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

const mater = {
  "blue":new MeshBasicMaterial({ 
    color: 0x00FF
   }),
  "green":new MeshBasicMaterial({ 
    color: 0x00FF00 
  }),
  "yellow":new MeshBasicMaterial({ 
    color: 0xFFFF00 
  }),
  "red":new MeshBasicMaterial({
    color:0xFF0000
  }),
  "white":new MeshBasicMaterial({
    color:0xFFFfff
  }),
  "orange":new MeshBasicMaterial({
    color:0xFFA500
  }),
  "gray":new MeshBasicMaterial({
    color:0x808080
  })
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
        <group ref={ref} position={Object.values(position)} >
          {cube.map(ele => {
      return(
        <primitive
        object={ele}
        ></primitive>
      )
     })}
        </group>
      );
})

export default Cube