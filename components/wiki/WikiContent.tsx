import dynamic from 'next/dynamic';
import ProfileType from '@/types/types';
import styles from './WikiContent.module.scss';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../wikiList/SPinner';

interface WikiContentProps {
  profile: ProfileType;
  onOpenModalButtonClick: () => void;
}
interface EmptyContentProps {
  onOpenModalButtonClick: () => void;
}

const ReactQuillReadComponent = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const Quill = ({ ...props }) => <QuillComponent {...props} />;
    return Quill;
  },
  {
    loading: () => (
      <div>
        <Spinner />
      </div>
    ),
    ssr: false,
  },
);

function EmptyContent({ onOpenModalButtonClick }: EmptyContentProps) {
  return (
    <div className={styles.emptyContent}>
      <p>
        아직 작성한 내용이 없네요.
        <br />
        위키에 참여해 보세요!
      </p>
      <button onClick={onOpenModalButtonClick}>시작하기</button>
    </div>
  );
}

export default function WikiContent({ profile, onOpenModalButtonClick }: WikiContentProps) {
  if (!profile.content) {
    return <EmptyContent onOpenModalButtonClick={onOpenModalButtonClick} />;
  }
  return (
    <>
      <ReactQuillReadComponent
        className="custom view"
        readOnly={true}
        theme="snow"
        value={profile.content}
        modules={{ toolbar: false }}
      />
    </>
  );
}
