import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useWarnPageUnLoad = (targetPath: string) => {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState<string>('');
  const [nowRoute, setNowRoute] = useState<string>('');
  const [isBlocking, setIsBlocking] = useState(false);

  const handlePageChange = () => {
    router.push(nextRoute);
    setIsBlocking(false);
  };

  const handlePageChangeCancle = () => {
    setIsBlocking(false);
    router.push(nowRoute);
  };

  useEffect(() => {
    setNextRoute(`/wiki/${router.query.code}`);
    if (router.asPath !== targetPath) return; // 특정 페이지에서만 작동

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = true; // 브라우저 기본 메시지 표시s
    };

    setNowRoute(router.asPath);

    const handlePopState = () => {
      if (isBlocking) return; // 모달이 이미 열려 있으면 실행하지 않음
      router.push(nowRoute);
      setIsBlocking(true); // 차단 활성화
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState); // popstate로 뒤로가기 감지

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState); // 이벤트 제거
    };
  }, [router, isBlocking, nowRoute, nextRoute, targetPath]);

  return {
    isBlocking,
    nextRoute,
    handlePageChange,
    handlePageChangeCancle,
  };
};
