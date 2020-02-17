/**
 * https://css-tricks.com/run-useeffect-only-once/
 */
import React, { useState, useEffect } from 'react';

function Commit(props) {
  const [commit, setCommit] = useState([]);

  useEffect(() => {
    console.log("Effect 2...." + props.commit);
    if (props.commit) {
      setCommit(props.commit);
    }
  }, [props.commit]);

  return (
    <li className={"commit"}>
      Commit: {commit}
    </li>
  );
}

export default Commit;
