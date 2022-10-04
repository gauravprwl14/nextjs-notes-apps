// @ts-nocheck - may need to be at the start of file

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
    BaseEditor,
} from 'slate'
import { withHistory } from 'slate-history'

import { BiPencil } from 'react-icons/bi';
import { FaBold, FaItalic, FaUnderline, FaCode, FaAlignCenter, FaAlignLeft, FaAlignRight } from 'react-icons/fa';
import { MdOutlineFormatListNumbered, } from 'react-icons/md';


import { Button } from '../../../Button'


import { EditorButton, Icon, Toolbar } from './components/index'




const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const RichTextExample = ({ note, handleChange, handleAddNote }) => {
    const [noteValue, setNoteValues] = useState(note)
    const editorRef = useRef()
    if (!editorRef.current) editorRef.current = withReact(createEditor())
    const editor = editorRef.current

    useEffect(() => {
        setNoteValues(note)

        editorRef.current.children = note

        // return () => {
        //     setNoteValues(null)
        // }
    }, [note])




    const renderElement = useCallback((props: JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => <Leaf {...props} />, [])

    const handleStateChange = (newEditorState) => {
        setNoteValues(newEditorState)
    }

    const handleBtnClick = (e: React.FormEvent<MouseEvent>) => {
        handleAddNote(noteValue)
    }



    console.log('%c notes array inside the editor ', 'background: lime; color: black', { note });

    return (
        <Slate editor={editor} value={noteValue} onChange={handleStateChange}>
            <div className='flex flex-1'>
                <div className='flex-1'>
                    <Toolbar>
                        <MarkButton format="bold" icon={<FaBold />} />
                        <MarkButton format="italic" icon={<FaItalic />} />
                        <MarkButton format="underline" icon={<FaUnderline />} />
                        <MarkButton format="code" icon={<FaCode />} />
                        <BlockButton format="left" icon={<FaAlignLeft />} />
                        <BlockButton format="center" icon={<FaAlignCenter />} />
                        <BlockButton format="right" icon={<FaAlignRight />} />
                        {/* <BlockButton format="heading-one" icon="looks_one" />
                <BlockButton format="heading-two" icon="looks_two" />
                <BlockButton format="block-quote" icon="format_quote" />
                <BlockButton format="numbered-list" icon="format_list_numbered" />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                <BlockButton format="left" icon="format_align_left" />
                <BlockButton format="center" icon="format_align_center" />
                <BlockButton format="right" icon="format_align_right" />
                <BlockButton format="justify" icon="format_align_justify" /> */}
                    </Toolbar>
                </div>
                <Button layoutClass="!flex-none justify-center align-middle" onClick={handleBtnClick}> Add </Button>
            </div>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                style={{
                    minHeight: 200
                }}
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}

const toggleBlock = (editor: BaseEditor, format: string) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor: BaseEditor, format: string) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor: BaseEditor, format: any, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format,
        })
    )

    return !!match
}

const isMarkActive = (editor: BaseEditor, format: string | number) => {
    console.log('%c Editor ', 'background: lime; color: black', { Editor });

    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <EditorButton
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onMouseDown={(event: { preventDefault: () => void }) => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </EditorButton>
    )
}

const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <EditorButton
            active={isMarkActive(editor, format)}
            onMouseDown={(event: { preventDefault: () => void }) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </EditorButton>
    )
}

// const initialValue: Descendant[] = [
//     {
//         type: 'paragraph',
//         children: [
//             { text: 'This is editable ' },
//             { text: 'rich', bold: true },
//             { text: ' text, ' },
//             { text: 'much', italic: true },
//             { text: ' better than a ' },
//             { text: '<textarea>', code: true },
//             { text: '!' },
//         ],
//     },
//     {
//         type: 'paragraph',
//         children: [
//             {
//                 text:
//                     "Since it's rich text, you can do things like turn a selection of text ",
//             },
//             { text: 'bold', bold: true },
//             {
//                 text:
//                     ', or add a semantically rendered block quote in the middle of the page, like this:',
//             },
//         ],
//     },
//     {
//         type: 'block-quote',
//         children: [{ text: 'A wise quote.' }],
//     },
// ]

export default RichTextExample