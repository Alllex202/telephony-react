import React from 'react'
import ScenarioView from 'modules/scenario/view'
import EditorLayout from 'modules/editor-layout'

const ScenarioEditorPage = () => {
    return <EditorLayout children={<ScenarioView />} />
}

export default ScenarioEditorPage
