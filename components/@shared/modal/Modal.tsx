import React, { ReactNode, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import { postPing } from '@/apis/auth/updatePing';
import Image from 'next/image';
import styles from './Modal.module.scss';

export default function ModalComponent({
  title = '',
  message = '',
  subMessage = '',
  children,
  isOpen = false,
  isRoute = false,
  onClose,
  onCancle,
  isEdit = false,
  userCode,
  isAnswer = false,
  timelimit = false,
}: {
  title?: string;
  message?: string;
  subMessage?: string;
  children?: ReactNode;
  isOpen?: boolean;
  isRoute?: boolean;
  onClose?: () => void;
  onCancle?: () => void;
  isEdit?: boolean;
  userCode?: string;
  isAnswer?: boolean;
  timelimit?: boolean;
}) {
  const [answer, setAnswer] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const fetchPostPing = async () => {
    const response = await postPing(userCode as string, answer);
    if (response) {
      router.push(`/wiki/${userCode}/edit`);
    } else if (response === undefined) {
      setIsError(true);
      setErrorMessage('정답이 아닙니다. 다시 시도해 주세요.');
    }
  };

  const handleOverTimeLimit = () => {
    setIsModalOpen(false);
    router.push(`/wiki/${userCode}`);
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const answerValue = e.target.value;
    setAnswer(answerValue);
  };

  const handleSubmitAnswer = async (e: FormEvent) => {
    e.preventDefault();
    await fetchPostPing();
  };

  const handleFinishEdit = async () => {
    router.push(`/wiki/${userCode}`);
  };

  const modalStyle = { maxWidth: '395px', minWidth: '335px', width: '335px', fontFamily: 'Pretendard Variable' };
  const modalConfig = { width: 'calc(100% - 100px)', destroyOnClose: true, centered: true };

  if (isAnswer) {
    return (
      <Modal
        style={modalStyle}
        {...modalConfig}
        open={isOpen}
        onCancel={onClose}
        footer={[
          <div key="footer-container" style={{ textAlign: 'center' }}>
            <Button
              className={`${styles.modalButton}  ${styles.buttonColor}`}
              key="ok"
              type="primary"
              onClick={handleSubmitAnswer}
            >
              확인
            </Button>
            <div className={styles.footerMessage}>
              <span>
                럭키위키는 지인들과 함께하는 즐거운 공간입니다.
                <br />
                지인에게 상처를 주지 않도록 작성해 주세요.
              </span>
            </div>
          </div>,
        ]}
        transitionName=""
      >
        <div>
          <div className={styles.modalImageContainer}>
            <div className={styles.lockImage}>
              <Image width={20} height={20} src="/icon/icon-lock.png" alt="자물쇠 이미지" />
            </div>
            <span>
              다음 퀴즈를 맞추고
              <br /> 위키를 작성해 보세요.
            </span>
          </div>
          <form onSubmit={handleSubmitAnswer}>
            <div className={styles.modalFormContainer}>
              <label htmlFor="securityAnswer" className={'text-md'}>
                {title}
              </label>
              <input
                id="securityAnswer"
                type="text"
                className={classNames('input', { [styles.errorInput]: isError })}
                placeholder="답안을 입력해주세요."
                onChange={handleAnswerChange}
              />
              <p className={styles.errorMessage}>{isError && errorMessage}</p>
            </div>
          </form>
        </div>
      </Modal>
    );
  }

  if (timelimit) {
    return (
      <Modal
        style={modalStyle}
        {...modalConfig}
        title={title}
        open={isModalOpen}
        onCancel={handleOverTimeLimit}
        footer={[
          <Button className={styles.buttonColor} key="ok" type="primary" onClick={handleOverTimeLimit}>
            확인
          </Button>,
        ]}
      >
        <div className={styles.messageContainer}>
          <p className={styles.message}>{message}</p>
          <p className={styles.subMessage}>{subMessage}</p>
        </div>
      </Modal>
    );
  }

  if (isEdit) {
    return (
      <Modal
        style={modalStyle}
        {...modalConfig}
        title={title}
        open={isOpen}
        onCancel={onClose}
        transitionName=""
        footer={[
          <Button className={styles.buttonColor} key="ok" type="primary" onClick={handleFinishEdit}>
            수정 완료
          </Button>,
        ]}
      >
        <p className={styles.message}>{children}</p>
      </Modal>
    );
  }

  if (isRoute) {
    return (
      <Modal
        style={modalStyle}
        {...modalConfig}
        title={title}
        open={isOpen}
        onCancel={onCancle}
        transitionName=""
        footer={[
          <div className={styles.buttonContainer} key="footer-container">
            <Button className={styles.warning} key="ok" type="primary" onClick={onClose}>
              페이지 나가기
            </Button>
          </div>,
        ]}
      >
        <div>
          <p className={styles.message}>저장하지 않고 나가시겠어요?</p>
          <p className={styles.subMessage}>작성하신 모든 내용이 사라집니다.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      style={modalStyle}
      {...modalConfig}
      title={title}
      open={isOpen}
      onCancel={onClose}
      transitionName=""
      footer={[
        <Button className={styles.buttonColor} key="ok" type="primary" onClick={onClose}>
          확인
        </Button>,
      ]}
    >
      <p>{children}</p>
    </Modal>
  );
}
