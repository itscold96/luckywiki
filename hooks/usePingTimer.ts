import dayjs from 'dayjs';
import { useEffect } from 'react';
import { getServerTime } from '@/apis/getServerTime';

export const usePingTimer = (
  register: string | null,
  isReady: boolean,
  savePing: () => void,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const setTime = async () => {
      if (!isReady) return;

      const serverTime = await getServerTime();
      const lastPingTime = register; // api 호출 시 엔드포인트에서 받아온 시간
      const nowTime = localStorage.getItem('nowTime');
      const newTime = Number(nowTime);

      if (lastPingTime) {
        const elapsedTime = parseInt(lastPingTime) + 5 * 60 * 1000; // 엔드포인트에서 5분 후
        const remainingTime = elapsedTime - newTime;

        if (remainingTime > 0) {
          timer = setTimeout(() => {
            savePing();
            localStorage.removeItem('lastPingTime');
          }, remainingTime);
          // 5분뒤 실행
        } else {
          // remainingTime이 0보다 작으면 즉시 실행 후 lastPingTime제거
          savePing();
          localStorage.removeItem('lastPingTime');
        }
      } else {
        // lastPingTime이 없으면 즉시 핑을 저장
        savePing();
      }
    };

    setTime();

    return () => {
      clearTimeout(timer);
    };
  }, [isReady, register, ...dependencies]);
};
