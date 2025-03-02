import React, { useEffect } from "react";

import { TwoDraw } from "ts-agent";
import Animator from "./Animator";
// import { Animator, TwoDraw } from "ts-agent";

const Agentscript = ({ view, animation, model, setAnim, reset, anim }) => {
  useEffect(() => {
    const agentSetup = async () => {
      if (model) {
        document.querySelector("#modelDiv").innerHTML = "";
        if (anim) anim.stop();
        setAnim(undefined);
        await model.startup();
        await model.setup();

        const { width, drawOptions } = view;
        const twoDraw = new TwoDraw(model, {
          div: "modelDiv",
          width: width,
          drawOptions,
        });

        const { step, fps } = animation;
        const newAnim = new Animator(model, twoDraw, step, fps);
        setAnim(newAnim);
      }
    };
    agentSetup();
  }, [animation.step, animation.fps, reset]);

  return <div id="modelDiv"></div>;
};

export default Agentscript;
