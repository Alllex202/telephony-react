import React from 'react';
import {Controls, useStoreState, useZoomPanHelper} from 'react-flow-renderer';
import styles from './styles.module.scss';
import BtnCircle from 'components/ui-kit/btn-circle';

const ScenarioEditorControls = () => {
    const {zoomIn, zoomOut, fitView} = useZoomPanHelper();
    const {transform} = useStoreState(state => state);
    const currentZoom = transform[2];

    const onZoomIn = () => {
        zoomIn(200);
    };

    const onZoomOut = () => {
        zoomOut(200);
    };

    const onFitView = () => {
        fitView({duration: 200, padding: 0.35}, 200);
    };

    return (
        <Controls className={styles.controls} showFitView={false} showInteractive={false} showZoom={false}>
            <div className={styles.percent}>{(currentZoom * 100).toFixed(0)}%</div>
            <div className={styles.buttons}>
                <BtnCircle iconName={'remove'} iconType={'round'} className={styles.btn} onClick={onZoomOut}/>
                <BtnCircle iconName={'add'} iconType={'round'} className={styles.btn} onClick={onZoomIn}/>
                <BtnCircle iconName={'crop_free'} iconType={'round'} className={styles.btn} onClick={onFitView}/>
            </div>
        </Controls>
    );
};

export default ScenarioEditorControls;
