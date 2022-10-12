import {FormEvent, useState} from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

const transitionStyles : any = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

export default function Display_color(x:number, y:number, size:number, color:string) {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    backgroundColor: color,
    height:size,
    width:size,
    borderRadius:size/2,
    top:y,
    left:y,
    position:'absolute'
  };
  const [inProp, setInProp] = useState(true);
  return (
    <div>
      <button onClick={() => setInProp(!inProp)}>Click to Show</button>
      <Transition in={inProp} timeout={300}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
          </div>
        )}
      </Transition>
    </div>
  );
}
