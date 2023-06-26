'use client'
import { useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { Link2, ChevronsLeftRight } from 'lucide-react'
import LinkEditor from './LinkEditor'  

const ContentEditor = ({ body, handleBodyChange } : { body: string, handleBodyChange: (content: string) => void }) => {

	const editor = useEditor({
		extensions: [
		StarterKit,
		Underline,
		Link,
		Placeholder.configure({
			placeholder: 'start writing...'
		})
		],
		editorProps: {
			attributes: {
				class: 'prose focus:outline-none'
			}
		},
		content: body,
		onUpdate: ({ editor }) => {
			handleBodyChange(editor.getHTML())
		}
	})

	const [linkEditorOpen, setLinkEditorOpen] = useState(false)
	const [link, setLink] = useState('')

	const toggleLinkEditor = () => {
		const href = editor?.getAttributes('link').href
		console.log(href)
		href ? setLink(href) : setLink('')
		setLinkEditorOpen(prev => !prev)
	}

	const saveLink = () => {
		if (link) {
			editor?.chain().focus().extendMarkRange('link').setLink({ href: link }).run()
		} else {
			editor?.chain().focus().extendMarkRange('link').unsetLink().run()
		}
		toggleLinkEditor()
	}

	const deleteLink = () => {
		editor?.chain().focus().extendMarkRange('link').unsetLink().run()
		toggleLinkEditor()
	}

	if (!editor) return null
  
	return (
		<>
			{editor && <BubbleMenu
				editor={editor}
				pluginKey={'main'}
				className='bg-light flex gap-6 border-1 border-dark-900 py-4 px-6'
			>
				{linkEditorOpen && !editor.isFocused ? (
					<LinkEditor
						link={link}
						onLinkChange={event => setLink(event.target.value)}
						saveLink={saveLink}
						deleteLink={deleteLink}
					/>
				) : (
				<>
					<button
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive('bold') ? 'text-lg font-bold text-accent' : 'text-lg font-bold'}
					>B</button>
					<button
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive('italic') ? 'text-lg italic text-accent' : 'text-lg italic'}
					>i</button>
					<button
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className={editor.isActive('underline') ? 'text-lg underline text-accent' : 'text-lg underline'}
					>U</button>
					<button
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={editor.isActive('strike') ? 'text-lg line-through text-accent' : 'text-lg line-through'}
					>S</button>
					<button
						onClick={() => editor.chain().focus().toggleCode().run()}
						className={editor.isActive('code') ? 'text-lg text-accent' : 'text-lg '}
					><ChevronsLeftRight /></button>
					<button
						onClick={toggleLinkEditor}
						className={editor.isActive('link') ? 'text-lg underline text-accent' : 'text-lg underline'}
					><Link2 /></button>
				</>
				)}
			</BubbleMenu>}
			<EditorContent editor={editor} />
		</>
	)
}

export default ContentEditor