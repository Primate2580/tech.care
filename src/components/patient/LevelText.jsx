import arrowUp from '../../assets/icons/arrow-up.png';
import arrowDown from '../../assets/icons/arrow-down.png';

const ARROWS = { 'Higher than Average': arrowUp, 'Lower than Average': arrowDown };

/** Level text ("Normal", "Lower than Average"...) with the matching arrow when there is one. */
export default function LevelText({ level }) {
  const arrow = ARROWS[level];
  return (
    <>
      {arrow && <img src={arrow} alt="" width="10" height="6" />}
      <span>{level}</span>
    </>
  );
}
