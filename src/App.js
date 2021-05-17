import React, { useRef } from "react";
import "./App.css";

function App() {
  const refDiv = useRef(null);

  //функция создания текстовой ноды
  const newTextNode = (text) => document.createTextNode(text);

  //функция создания пробела
  const newSpaceNode = () => newTextNode("\u00A0");

  //создаем новый элемент Ins
  const newInsNode = (text) => {
    const insNode = document.createElement("ins");
    insNode.appendChild(newTextNode(text));
    return insNode;
  };

  const getTopLevel = (node) => {
    let current = node;

    if (current.parentNode !== refDiv.current) {
      current = current.parentNode;
    }

    return current;
  };

  const onInput = (e) => {
    // debugger;
    // выбираем элемент на котором произошло событие
    const element = e.target;
    // создаем объект selection, он нам нужен будет для управления кареткой.
    const selection = window.getSelection();
    /**
     * тут мы достаем два свойства:
     * anchorNode - это тот элемент на котором у нас была установлена каретка
     * anchorOffset - это конечная граница этого элемента
     */
    const { anchorNode, anchorOffset } = selection;
    // тут мы проверяем где находится курсор, на верхнем элементе или на ins
    const isTopLevel = anchorNode.parentElement === element;
    // ищет ноду которая непосредственно является ребенком едитора
    const topNode = getTopLevel(anchorNode);
    // если был веден пробел
    if (e.data === " ") {
      if (isTopLevel) {
        // оставляем стандартное поведение, если вводим пробел в div
        return;
      }

      switch (anchorOffset) {
        //добавляем пробел если он был поставлен перед ins
        case 0:
          topNode.before(newSpaceNode());
          break;

        // добавляем пробел если он был поставлен после ins
        case anchorNode.length:
          const newNode = newSpaceNode();
          topNode.after(newNode);
          selection.collapse(newNode, e.data.length);
          break;

        // разделяем ноду если пробел был поставлен в самой ноде ins
        default:
          const currentValue = anchorNode.nodeValue;
          anchorNode.nodeValue = currentValue.substr(0, anchorOffset);
          const spaceNode = newSpaceNode();
          topNode.after(spaceNode);
          const insNode = newInsNode(currentValue.substr(anchorOffset));
          spaceNode.after(insNode);
          selection.collapse(insNode.firstChild, 0);
          break;
      }

      e.preventDefault();
      return;
    }

    // создаем ins элемент с веденным символом
    if (isTopLevel) {
      debugger;
      const currentValue = anchorNode.nodeValue;

      const nextNode = anchorNode.nextSibling;

      // если nextnode это ins, мы пишем в нее символы
      if (
        nextNode &&
        nextNode instanceof Element &&
        nextNode.tagName === "INS"
      ) {
        const textNode = nextNode.firstChild;
        textNode.nodeValue = `${e.data}${textNode.nodeValue}`;
        selection.collapse(textNode, e.data.length);
        e.preventDefault();
        return;
      }
      //а если nextnode это текстовая нода, создаем новую ноду ins и добавляем туда текст
      const insNode = newInsNode(e.data);
      topNode.after(insNode);
      const textNode = newTextNode(currentValue.substr(anchorOffset));
      insNode.after(textNode);
      selection.collapse(insNode.firstChild, e.data.length);
      e.preventDefault();
      return;
    }
  };

  return (
    <div
      id="content"
      ref={refDiv}
      contentEditable={true}
      suppressContentEditableWarning={true}
      className="contentEditableDiv"
      onBeforeInput={onInput}
    >
      <del>deleted</del> text <ins>inserted</ins>
    </div>
  );
}

export default App;
