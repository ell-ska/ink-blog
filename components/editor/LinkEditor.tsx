type linkEditorType = {
    link: string,
    onLinkChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    saveLink: () => void,
    deleteLink: () => void
}

const LinkEditor = ({ link, onLinkChange, saveLink, deleteLink } : linkEditorType ) => {
    return (
        <div className="flex flex-col gap-2 ">
            <input
                autoFocus
                value={link}
                placeholder="paste link"
                className="border-1 border-dark-900 outline-none py-2 px-4"
                type="url"
                onChange={e => onLinkChange(e)}    
            />
            <div className="flex gap-2">
                <button className="button-small flex-grow" onClick={saveLink}>save</button>
                <button className="button-small flex-grow bg-light" onClick={deleteLink}>delete</button>
            </div>
        </div>
    )
}

export default LinkEditor