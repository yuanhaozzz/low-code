/**
 * @description 播放动画
 * @param animation
 */
export const playAnimation = (animation, element) => {
  const { duration, timingFunction, delay, count, mode, playState, name } =
    animation;
  element.style.animation = `${duration}s ${timingFunction} ${delay}s ${count} ${mode} ${playState} ${name}`;
};
