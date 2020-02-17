/**
 * https://css-tricks.com/run-useeffect-only-once/
 */
import React, { useState, useEffect } from 'react';

import Commit from "./Commit";

function CommitList(props) {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    if (props.commits) {
      setCommits(props.commits);
    }
  }, [props.commits]);

  return (
    <div className={"commits"}>
      <ul>
        {commits.map(c => (
          <Commit commit={c} key={c}/>
        ))}
      </ul>
    </div>
  );
}

export default CommitList;
