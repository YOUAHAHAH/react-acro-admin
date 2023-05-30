type RFSMethodName =
  | "webkitRequestFullScreen"
  | "requestFullscreen"
  | "msRequestFullscreen"
  | "mozRequestFullScreen";
type EFSMethodName =
  | "webkitExitFullscreen"
  | "msExitFullscreen"
  | "mozCancelFullScreen"
  | "exitFullscreen";
type FSEPropName =
  | "webkitFullscreenElement"
  | "msFullscreenElement"
  | "mozFullScreenElement"
  | "fullscreenElement";
type ONFSCPropName =
  | "onfullscreenchange"
  | "onwebkitfullscreenchange"
  | "onmozfullscreenchange"
  | "MSFullscreenChange";

const DOC_EL: HTMLElement = document.documentElement;
let TYPE_REQUEST_FULL_SCREEN: RFSMethodName = "requestFullscreen";
let TYPE_EXIT_FULL_SCREEN: EFSMethodName = "exitFullscreen";
let TYPE_FULL_SCREEN_ELEMENT: FSEPropName = "fullscreenElement";
let TYPE_ON_FULL_SCREEN_CHANGE: ONFSCPropName = "onfullscreenchange";

function getCurrentElement(el?: HTMLElement) {
  return el instanceof HTMLElement ? el : DOC_EL;
}

if (`webkitRequestFullScreen` in DOC_EL) {
  TYPE_REQUEST_FULL_SCREEN = "webkitRequestFullScreen";
  TYPE_EXIT_FULL_SCREEN = "webkitExitFullscreen";
  TYPE_FULL_SCREEN_ELEMENT = "webkitFullscreenElement";
  TYPE_ON_FULL_SCREEN_CHANGE = "onwebkitfullscreenchange";
} else if (`msRequestFullscreen` in DOC_EL) {
  TYPE_REQUEST_FULL_SCREEN = "msRequestFullscreen";
  TYPE_EXIT_FULL_SCREEN = "msExitFullscreen";
  TYPE_FULL_SCREEN_ELEMENT = "msFullscreenElement";
  TYPE_ON_FULL_SCREEN_CHANGE = "MSFullscreenChange";
} else if (`mozRequestFullScreen` in DOC_EL) {
  TYPE_REQUEST_FULL_SCREEN = "mozRequestFullScreen";
  TYPE_EXIT_FULL_SCREEN = "mozCancelFullScreen";
  TYPE_FULL_SCREEN_ELEMENT = "mozFullScreenElement";
  TYPE_ON_FULL_SCREEN_CHANGE = "onmozfullscreenchange";
} else if (!(`requestFullscreen` in DOC_EL)) {
  throw `当前浏览器不支持Fullscreen API !`;
}

export function beFull(el?: HTMLElement): Promise<void> {
  return getCurrentElement(el)[TYPE_REQUEST_FULL_SCREEN]();
}

export function exitFull(): Promise<void> {
  return document[TYPE_EXIT_FULL_SCREEN]();
}

export function isFull(el?: HTMLElement): boolean {
  return getCurrentElement(el) === document[TYPE_FULL_SCREEN_ELEMENT];
}

export function toggleFull(el?: HTMLElement): boolean {
  if (isFull(el)) {
    exitFull();
    return false;
  } else {
    beFull(el);
    return true;
  }
}

export const checkFull = () => {
  //  考虑兼容问题
  let isFull: any =
    document.fullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement ||
    null;
  if (isFull === undefined) {
    isFull = false;
  }
  return isFull;
};
