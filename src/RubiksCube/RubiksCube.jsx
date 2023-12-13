import {
    useRef,
    useState,
    useEffect
} from "react";
import { useFrame } from "@react-three/fiber";
import { maxKey } from "./hooks";
import { Vector3 } from "three";

import Cube from "../Cube/Cube";
import { randomNum } from "./hooks";
import useHistory from "./useHistory";
import useRotation from "./useRotation";
import useDrag from "./useDrag";

const dimensions = 3;

export default RubiksCube = (props) =>  {
    const [rotateAxis, initialCubeClicked, direction, dispatch] = useRotation();

    const [allCubes, setAllCubes] = useState([]);
    const [movementQueue, setMovementQueue] = useState([]);
    const [controlRotation, setControlRotation] = useState(0)

    const rubikCube = useRef();
    const pivot = useRef();

    useFrame(()=> { 
        if(rotateAxis && !activeDrag){
          if(Math.abs(controlRotation) < Math.PI / 2){
            visualMove(0.125) 
          } else { // If the rotation exceeds PI/2 adjust it, dispatch the end of movement and reset values
            visualMove(-1*(Math.abs(controlRotation)-Math.PI /2))
            if(movementQueue.length !== 0){ //If there are movements stored remove the first one, this is for automated rotations
              setMovementQueue(movementQueue => movementQueue.slice(1, movementQueue.length))
            } else {
              set([initialCubeClicked, rotateAxis, direction])
            }
            dispatch({type:'finish_movement'})
            pivot.current.rotation[rotateAxis] = 0
            setControlRotation(0)
    
          }
        }
      })

    const onStart = (e) => {
        if(!activeDrag && !rotateAxis) {
        //looks for the face coordinate with higher abs value in the intersection point, that is the clicked face, dispatches the start of movement with the clicked face axis, the clicked cube and the face axis side(positive or negative)
        let faceClicked = maxKey(e.intersections[0].point)
        dispatch({
          type: "start_movement_point",
          cubeFaceClicked: faceClicked,
          initialCubeClicked: e.intersections[0].point,
          rubikCubeSide: Math.sign(e.intersections[0].point[faceClicked])
        });
        }
    };

    const onDrag = (e) => {
        //if in movement and if it hasn't rotate already PI/2
        if(activeDrag && Math.abs(controlRotation) < Math.PI / 2){
          dispatch({type: "trace_movement_destination", finalCube: e.intersections[0].point})
          //Dragging rotation will be performed if there is an axis to rotate and the initial and final points don't match
          if(initialCubeClicked !== e.intersections[0].point && rotateAxis){
              visualMove(0.025)
          }
        } 
    }

    const [state, { set, reset, undo, redo, canUndo, canRedo }] = useHistory([]);

    const [activeDrag, bindDrag] = useDrag(onStart, onDrag, null, props.blockRubikCubeRotation)

    //Funcion that performs the visual movement
    function visualMove(rotation){
    pivot.current.rotation[rotateAxis] = direction * rotation
    pivot.current.updateMatrixWorld()
    setControlRotation(controlRotation => controlRotation + (direction * rotation))
    allCubes.forEach((cube,i) => {
      if(Math.round(rubikCube.current.children[i].getWorldPosition(new Vector3())[rotateAxis]) === Math.round(initialCubeClicked[rotateAxis])){
        rubikCube.current.children[i].applyMatrix4(pivot.current.matrixWorld)
      }
    })
    }

    //RUBIK CUBE CREATION
    useEffect(()=> {
    let assistCube = []
    for (let i = 0; i < dimensions; i++) {
      for (let j = 0; j < dimensions; j++) {
        for (let k = 0; k < dimensions; k++) {
          const x = (i - 1) * 1,
          y = (j - 1) * 1,
          z = (k - 1) * 1;
          console.log(x,y,z);
          assistCube.push(
            <Cube
              key={
                assistCube.length
              }
              position={
                {
                  'x': x,
                  'y': y, 
                  'z':z
                }
              }
            />
          )                    
        }
      }
    }
    setAllCubes(assistCube)
  },[])

    props.onShuffle(() => {
        let movements = [[{"x": -1, "y": 0, "z": 1}, "x", -1]];
/*         for (let index = 0; index < randomNum(20,40); index++) {
            let movement = [
                allCubes[randomNum(0, allCubes.length - 1)].props.position,
                ["x", "y", "z"][randomNum(0, 2)],
                Math.round(Math.random()) ? 1 : -1,
            ] 
            movements.push(movement);
            set(movement);
        }
 */        setMovementQueue(movements)
        console.log(movements);
        console.log(allCubes);
        console.log(props.position);
    })
    //Undo movement
    props.onUndo(()=>{
    if(canUndo){
      //Is necessary to reverse the direction
      setMovementQueue([[state.present[0], state.present[1], state.present[2]*-1 ]])
      undo()
    }
  })
  //Redo movement
  props.onRedo(()=>{
    if(canRedo){
      setMovementQueue([state.future[0]])
      redo()
    }
   })
  //Solve cube
    props.onSolve(()=>{
    if(canUndo){
      let past = state.past.map(movement => { //Change all directions
        return movement.map((val,i) => {
          return i === 2 ? val*=-1 : val
        })
      })
      let present = [state.present[0], state.present[1], state.present[2]*-1 ] //Change present direction
      setMovementQueue([present].concat(past.reverse().slice(0, past.length - 1))) //Concatenate the present with the reversed past minus last index, that one is always empty because of history hook
      reset([])
    }
  })

    useEffect(()=> {
        console.log(movementQueue.length);
        if(movementQueue.length !== 0){
          let movement = movementQueue[0]
          dispatch({
            type: "auto_rotate",
            initialCubeClicked: movement[0],
            rotateAxis: movement[1],
            direction: movement[2],
          });
        }
    },[movementQueue])

    return(
    <>
      <group rotation={[0, 0, 0]} name={"group"} ref={rubikCube} {...bindDrag} >
        {allCubes}
      </group>
      <group ref={pivot} position={[0, 0, 0]} name={"pivot"} />
    </>
    )
}