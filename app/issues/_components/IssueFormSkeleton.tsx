import { Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/component';
const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='2rem' />
      <Skeleton height='24rem' />
    </Box>
  );
};

export default IssueFormSkeleton;
