import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import { useInterval } from 'ahooks';
import Logo from '@/assets/svgr/logo.svg';
import styles from './index.module.less';

interface BearingProps {
  showBearing?: boolean;
}

const Bearing: React.FC<BearingProps> = (props) => {
  const { showBearing = false } = props;
  const [count, setCount] = useState(0);
  const start = !showBearing && count < 100;

  const clearInterval = useInterval(
    () => {
      setCount(count + 10);
    },
    start ? 300 : undefined,
  );

  useEffect(() => {
    return clearInterval;
  }, []);

  return (
    <div className={styles.bearingContainer}>
      <div className={styles.bearingProgress}>
        <Logo />
        <Progress percent={count} showInfo={false} status="active" />
      </div>
    </div>
  );
};
export default Bearing;
