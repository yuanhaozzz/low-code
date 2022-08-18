import React, { useEffect, useState, useContext, useRef } from "react";
import { GlobalContext } from "src/global/globalCommon";
import { playAnimation } from "src/utils/function";

interface Props {
  componentKey: number;
  index: number;
}

const inputEl = null;
let animationIndex = 0;
let playAnimationEntry = "";
function Text(props: Props) {
  const global = useContext(GlobalContext);
  const { componentKey, index } = props;
  const data = global.find(componentKey);

  const { style, key } = data;

  const [, update] = useState(0);
  const textRef = useRef(null);

  // 添加组件元素，方便操作元素
  useEffect(() => {
    global.modifySelectComponent({ element: textRef.current });
  }, []);

  // 监听动画结束
  useEffect(() => {
    textRef.current.addEventListener("animationend", animationend);
    return () => {
      textRef.current.removeEventListener("animationend", animationend);
    };
  }, []);

  // 监听动画开始
  useEffect(() => {
    textRef.current.addEventListener("animationstart", animationstart);
    return () => {
      textRef.current.removeEventListener("animationstart", animationstart);
    };
  }, []);

  // 播放当前组件全部动画
  useEffect(() => {
    play();
    global.subscribe(`previewAnimation${key}`, () => {
      play();
    });
  }, []);

  // 订阅后，当数据修改，强制刷新本组件
  useEffect(() => {
    const unsubscribe = global.subscribe(data.key + "", () => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const play = () => {
    const { animation } = global.getSelectComponent();
    if (animation.length > 0) {
      playAnimationEntry = "all";
      playAnimation(animation[animationIndex], textRef.current);
    }
  };

  const animationstart = () => {
    if (playAnimationEntry === "all") {
      const { animation } = global.getSelectComponent();
      // 播放动画名字
      const { animationName } = window.getComputedStyle(textRef.current);
      // 预览动画名字
      const currentName = animation[animationIndex].name;
      // 停止连续播放
      if (animationName !== currentName) {
        animationIndex = 1000;
      }
    }
  };

  const animationend = () => {
    const { animation } = global.getSelectComponent();
    textRef.current.style.animation = "";
    // 播放全部
    if (playAnimationEntry === "all") {
      if (animationIndex < animation.length - 1) {
        animationIndex += 1;
        playAnimation(animation[animationIndex], textRef.current);
      } else {
        animationIndex = 0;
        playAnimationEntry = "";
      }
    }
  };

  const forceUpdate = () => {
    update((prev) => prev + 1);
  };

  /**
   * @description 双击将div转为输入框，并默认选中所有文本节点
   * @param e
   */
  const doubleClick = (e) => {
    const el = e.target;
    el.setAttribute("contenteditable", "true");
    global.addDoubleClickEl(el);
    const range = document.createRange();
    range.selectNodeContents(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  };

  /**
   * @description 离开焦点时，更新描述对象text，删除contenteditable属性
   */
  const blur = (e) => {
    const select = global.getSelectComponent();
    const targetElement = e.target;
    select.text = targetElement.firstChild.nodeValue;
    targetElement.removeAttribute("contenteditable");
    // 更新描述对象
    global.modify(select);
  };

  return (
    <div
      className={`common-component common-text-wrapper common-component-hover`}
      style={style}
      data-component-key={key}
      onDoubleClick={doubleClick}
      onBlur={blur}
      ref={textRef}
    >
      双击编辑文本...
    </div>
  );
}
Text.type = "1";
export default Text;
