import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetailsPage from './IssueDetailsPage';
import DeleteIssueButton from './DeleteIssueButton';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/authOptions';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  const session = await getServerSession(authOptions);

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetailsPage issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction='column' gap='4'>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
