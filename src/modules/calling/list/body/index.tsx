import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {resetCallingStates} from 'store/features/calling/list';
import CallingSection from 'modules/calling/list/body/components/section';

const CallingListBody = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(resetCallingStates());
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <CallingSection callingStatus={'RUN'}/>
            <CallingSection callingStatus={'SCHEDULED'}/>
            <CallingSection callingStatus={'DONE'}/>
        </>
    );
};

export default CallingListBody;
