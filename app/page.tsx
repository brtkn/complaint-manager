import { Button } from '@radix-ui/themes';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-between p-24'>
      <p>Home PAGE!</p>
      <Button variant='surface'>New Issue</Button>
    </div>
  );
}
