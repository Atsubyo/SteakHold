import { useEffect } from 'react';

const PheromoneModel = () => {
  useEffect(() => {
    // Dynamic import of external scripts
    const loadScripts = async () => {
      const util = await import('https://code.agentscript.org/src/utils.js');
      const TwoDraw = await import('https://code.agentscript.org/src/TwoDraw.js');
      const ColorMap = await import('https://code.agentscript.org/src/ColorMap.js');
      const Animator = await import('https://code.agentscript.org/src/Animator.js');
      const Model = await import('https://code.agentscript.org/models/PheromoneModel.js');
      
      const colorMap = ColorMap.gradientColorMap(8, [
        'black',
        'purple',
        'yellow',
      ]);

      const model = new Model();
      model.setup();

      const view = new TwoDraw(model, {
        div: 'modelDiv',
        patchSize: 20,
        drawOptions: {
          turtlesSize: 2,
          patchesColor: (p) => colorMap.scaleColor(p.pheromone, 0, 100),
        },
      });

      const anim = new Animator(
        () => {
          model.step();
          view.draw();
        },
        500, // run 500 steps
        30 // 30 fps
      );

      util.toWindow({ util, model, view, anim });
    };

    loadScripts();
  }, []); // Empty dependency array to run once on mount

  return <div id="modelDiv"></div>;
};

export default PheromoneModel;
