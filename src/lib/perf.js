/**
 * -------------------------------
 * 用户体验收集
 * -------------------------------
 */
const config = {
  click: true,
  move: true,
  mousewheel: true,
  resize: true
};

export default function plugin(Vue, options) {
  if (plugin.installed) return;
  plugin.installed = true;

  if(options !== true){
    Object.assign(config, options);
  }

  if(config){
    if(config.click){
      window.onclick = event => {
        const { type, screenX, screenY, clientX, clientY, target } = event;

        save({
          event: {
             type: type,
             screenX: screenX,
             screenY: screenY,
             clientX: clientX,
             clientY: clientY,
             target: target.innerHTML,
             className: target.className
          }
        });
      };
    }
    if(config.move){
      window.onmousemove = event => {
        const { type, screenX, screenY, clientX, clientY, target } = event;

        save({
          event: {
             type: type,
             screenX: screenX,
             screenY: screenY,
             clientX: clientX,
             clientY: clientY,
             target: target.innerHTML,
             className: target.className
          }
        });
      };
    }
    if(config.mousewheel){
      window.onmousewheel = event => {
        const { type, screenX, screenY, clientX, clientY, target, wheelDelta, wheelDeltaX, wheelDeltaY } = event;

        save({
          event: {
             type: type,
             screenX: screenX,
             screenY: screenY,
             clientX: clientX,
             clientY: clientY,
             wheelDelta: wheelDelta,
             wheelDeltaX: wheelDeltaX,
             wheelDeltaY: wheelDeltaY,
             target: target.innerHTML,
             className: target.className
          }
        });
      };
    }
    if(config.resize){
      window.onresize = () => {
        const { clientWidth, clientHeight } = document.documentElement

        save({
          event: {
            type: 'resize',
            clientWidth: clientWidth,
            clientHeight: clientHeight
          }
        });
      }
    }
  }

  function save(e) {
    Vue.Log(e);
  }
  Vue.Perf = save;
  Object.defineProperties(Vue.prototype, {
    $perf: {
      get() {
        return Vue.Perf;
      },
    },
  });
}
