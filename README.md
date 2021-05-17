Task description.

We prepared a small coding challenge which is divided into 3 parts. You can use any libs and/or frameworks.

Please take two to three hours to work your way through the exercises and complete them as good as you can – we don’t expect you to finish it. However we would like to see your ideas about the different approaches through comments or email.

You have HTML markup
"<div contenteditable="true"><del>deleted</del> accepted <ins>inserted</ins></div>"

Part 0 CSS styles
a. add css styles to make "deleted" text red and "inserted" green

Part 1 Hide / Unhide <del> tags when editing
a. When clicking inside the ContentEditable, words which are inside <del> tags are hidden
b. When clicking back out of the ContentEditable redisplay the words inside the <del> tags

Part 2 Newly added words receive an <ins> tag
a. When adding new words inside the ContentEditable, each new word should receive an <ins> tag. E.g. the input text "some new text" will convert to <ins>some</ins> <ins>new</ins> <ins>text</ins>

Part 3 A tag can only contain a single word (no whitespace allowed)
a. When whitespace is introduced inside an <ins> tag, split the tag into two distinct <ins> tags. E.g <ins>test</ins> will become <ins>te st</ins> on edit and has to be converted to <ins>te</ins> <ins>st</ins>
b. When adding a word in front of an <ins> tag, combine them as long there is no whitespace between them. E.g new<ins>test</ins> will become <ins>newtest</ins>
c. When adding a word behind an <ins> tag, combine them as long there is no whitespace between them. E.g <ins>test</ins>new will become <ins>testnew</ins>

Решения и мои мысли=)

Пункт 0.

Это сделайть все через стили CSS, как я и сделал

Задать тегам стили:
del {
color: red;
}
Теперь текст в тэге <del> будет красный
ins {
color: green;
}
Теперь текст в тэге <ins> будет зеленый

Пункт 1.

1. При фокусе задаем <del> свойство:
.contentEditableDiv:focus del {
display: none;
}
Терерь <del> будет исчезать.

2. Еще можно наипсать функцию переключатель и передавать ей true, false с помощью локального состояние React.useState() и события onClick. Как пример вот єта функция:

const [toggle, setToggle] = useState(false)

const showAndHideDel = (bool)=>{
setToggle(bool)
}

и с помощью логического оператора И показывать или не показывать тэг <del>

{toggle && <del>delete</del>}

Пункт 2-3.

Это уже сложнее и интереснее, какие у меня были мысли, первая мысль у меня сделать с помощью регулярных выражений, например найти строку у которой будут с двух сторон пробелы и заменить их с помощью метода replace на <ins> sometext</ins>,
еще можно строку разбить на массив и каждый элемент массива завернуть в ins и сформировать строку и вывести ее, еще можно было каждый элемент завернуть в реактовский компонент и внутри компонента отслеживать пробел внутри строки, если есть пробел разделять компонент на несколько тэгов <ins>. Но у меня повились проблемы с перемещение курсора.
Но мою голову не покидала мысль что тут должно быть все легче и проще, и я подумал что наверно, есть способ как-то отследить вводимые символы в поле и зависимо от них добалять или не добалять к ним тэг ins.
И начал гуглить и нашел статью про window.getSelector() и решил попробовать управлять кареткой и добавлять узлы ноды при определенном веденном символе и вот что получилось)

Задание интересное узнал много нового)