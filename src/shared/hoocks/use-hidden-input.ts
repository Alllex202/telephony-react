import {useState} from 'react'

export const useHiddenInput = (initState: string) => {
    const [text, setText] = useState<string>(initState)
    const [lastText, setLastText] = useState<string>(text)

    return {text, setText, lastText, setLastText}
}
