import { useRef, useState } from "react";
import LocationSelect from "../components/locationSelect";
import CHAINS from "../constants/constants";
import { CSSTransition } from "react-transition-group";
const NewList = () => {
  const [chain, setChain] = useState(null);
  const nodeRef = useRef(null);
  return (
    <>
      <h1>New List</h1>
      <CSSTransition
        in={chain === null}
        timeout={0}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef}>
          <h2>select chain</h2>
          <button onClick={() => setChain(CHAINS.KROGER)}>Kroger</button>
          <button onClick={() => setChain(CHAINS.MARIANOS)}>
            Mariano&apos;s
          </button>
          <button onClick={() => setChain(CHAINS.FRYS)}>Fry&apos;s</button>
        </div>
      </CSSTransition>
      <CSSTransition
        in={chain !== null}
        timeout={0}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef}>
          <LocationSelect />
        </div>
      </CSSTransition>
    </>
  );
};

export default NewList;
