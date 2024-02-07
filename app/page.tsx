import { Button } from '@radix-ui/themes';
import IssuesPage from './issues/page';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-between p-24'>
      <p>Home PAGE!</p>
      <IssuesPage />
    </div>
  );
}
