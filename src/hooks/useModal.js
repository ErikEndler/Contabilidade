//hook para usar modal
import bus from "../utils/bus";

const EVENT_NAME = "modal";

export default function useModal() {
  function open(payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload });
    console.log(payload)
  }
  function close(payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload });
  }
  function listen(fn) {
    bus.on(EVENT_NAME, fn);
  }
  function off(fn) {
    bus.off(EVENT_NAME, fn);
  }
  return { open, close, listen, off };
}
