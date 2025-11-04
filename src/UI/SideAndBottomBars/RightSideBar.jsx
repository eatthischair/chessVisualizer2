import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Switch } from '../../components/ui/switch';
import { GhostButton } from '../../components/ui/GhostButton';
import { Label } from '../../components/ui/Label';
import { SwitchDemo } from '../../components/ui/SwitchDemo';
import { useEffect } from 'react';
const RightSideBar = ({
  setWhiteCtrlOn,
  whiteCtrlOn,
  setBlackCtrlOn,
  blackCtrlOn,
  setBoardIsFlipped,
  boardIsFlipped,
}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '];
      if (keys.includes(e.key)) e.preventDefault();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className=" w-64 h-[400px] border-1 shadow-md">
      <ul className="">
        <GhostButton className="flex !items-center !space-x-2">
          <SwitchDemo text={'White Squares'} />
        </GhostButton>
        <GhostButton className="flex !items-center !space-x-2">
          <SwitchDemo text={'Black Squares'} />
        </GhostButton>
        <GhostButton className="flex !items-center !space-x-2">
          <SwitchDemo text={'Flip Board'} />
        </GhostButton>
      </ul>
    </div>
  );
};

export default RightSideBar;
