import { CHAINS } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const ChainSelect = () => {
  const navigate = useNavigate();

  const handleSelectChain = (chain) => {
    navigate(`/lists/new/chain/${chain}`);
  };

  return (
    <>
      <div>
        <h2>select chain</h2>

        <button onClick={() => handleSelectChain(CHAINS.KROGER)}>Kroger</button>
        <button onClick={() => handleSelectChain(CHAINS.MARIANOS)}>
          Mariano&apos;s
        </button>
        <button onClick={() => handleSelectChain(CHAINS.FRYS)}>
          Fry&apos;s
        </button>
      </div>
    </>
  );
};

export default ChainSelect;
