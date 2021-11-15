import React, {ReactNode, useState} from 'react';
import styles from './styles.module.scss';
import Logo from "./components/logo";
import BtnToggle from "../../../../components/ui-kit/btn-toggle";

type Props = {
    children: ReactNode,
}

const Bar = ({children}: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    function toggleProfile() {
        setOpen(!isOpen);
    }

    return (
        <div className={styles.bar}>
            <Logo/>
            <div className={styles.actions}>
                {children}
            </div>
            <BtnToggle className={styles.profile} isActive={isOpen} onClick={toggleProfile} iconName={'account_circle'}
                       iconType={'round'}/>
        </div>
    );
};

export default Bar;
