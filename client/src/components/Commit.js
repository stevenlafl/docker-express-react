/**
 * https://css-tricks.com/run-useeffect-only-once/
 */
import React, { useState, useEffect } from 'react';

function Commit(props) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  useEffect(() => {
    console.log("Effect 2...." + props.a);
    if (props.a) {
      setA(props.a);
    }
  }, [props.a]);

  useEffect(() => {
    console.log("Effect 3...." + props.b);
    if (props.b) {
      setB(props.b);
    }
  }, [props.b]);

  return (
    <div className={"commit"}>
      Commit
    </div>
  );
}

export default Commit;
